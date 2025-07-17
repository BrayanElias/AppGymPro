# app/core/security.py

from datetime import datetime, timedelta, timezone
import os
from dotenv import load_dotenv

from passlib.context import CryptContext
from jose import JWTError, jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from app.db.database import get_db 
from app.db.models.user import User
from app.schemas import TokenData

# ─────────────────────────────
# 🔐 Cargar variables de entorno
# ─────────────────────────────
load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))

# Para token de recuperación de contraseña
RESET_SECRET_KEY = os.getenv("RESET_SECRET_KEY", "clave_secreta_para_reset")
RESET_TOKEN_EXPIRE_MINUTES = int(os.getenv("RESET_TOKEN_EXPIRE_MINUTES", "30"))

# ─────────────────────────────
# 🔑 Hash de contraseñas
# ─────────────────────────────
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    """Hashea una contraseña en texto plano."""
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verifica si la contraseña coincide con su hash."""
    return pwd_context.verify(plain_password, hashed_password)

# ─────────────────────────────
# 🎟 Generación de tokens JWT
# ─────────────────────────────
def create_access_token(data: dict) -> str:
    """Crea un token JWT de acceso con expiración."""
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# ─────────────────────────────
# 🛡 Obtener usuario autenticado desde token
# ─────────────────────────────
oauth2_scheme = HTTPBearer(auto_error=True)

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> User:
    """Extrae el usuario actual desde el token de autorización Bearer."""
    token = credentials.credentials
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="No se pudo validar el token",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = TokenData(email=email)
    except JWTError:
        raise credentials_exception

    user = db.query(User).filter(User.email == token_data.email).first()
    if user is None:
        raise credentials_exception
    return user

# ─────────────────────────────
# 🔐 Verificación de roles
# ─────────────────────────────
def require_role(required_role: str):
    """
    Crea un validador para rutas protegidas por rol.
    Ejemplo: @Depends(require_role("admin"))
    """
    def role_checker(user: User = Depends(get_current_user)):
        if user.role != required_role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Acceso denegado: se requiere rol '{required_role}'"
            )
        return user
    return role_checker

# ─────────────────────────────
# ♻️ Tokens para recuperación de contraseña
# ─────────────────────────────
def create_reset_token(email: str) -> str:
    """Genera un token JWT para restablecer contraseña."""
    expire = datetime.now(timezone.utc) + timedelta(minutes=RESET_TOKEN_EXPIRE_MINUTES)
    payload = {"sub": email, "exp": expire}
    return jwt.encode(payload, RESET_SECRET_KEY, algorithm=ALGORITHM)

def verify_reset_token(token: str) -> str:
    """Verifica un token JWT de recuperación de contraseña."""
    try:
        payload = jwt.decode(token, RESET_SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=400, detail="Token inválido")
        return email
    except JWTError:
        raise HTTPException(status_code=400, detail="Token expirado o inválido")
