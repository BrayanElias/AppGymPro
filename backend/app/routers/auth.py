# app/routers/auth.py

from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app.db.models.user import User
from app.schemas import (
    UserCreate,
    UserOut,
    Token,
    LoginInput,
    ForgotPasswordRequest,
    ResetPasswordRequest,
)
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
    create_reset_token,
    verify_reset_token,
)
from app.services.email_utils import send_password_reset_email
import os
from logging import getLogger

router = APIRouter( 
    tags=["Autenticación"],
    prefix=""
)
logger = getLogger(__name__)

# ─────────────────────────────────────────────
# 🔌 Dependencia para obtener la sesión de DB
# ─────────────────────────────────────────────
def get_db():
    """Devuelve una sesión de base de datos por petición."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ─────────────────────────────────────────────
# 📝 Registro de nuevos usuarios (rol: client)
# ─────────────────────────────────────────────
@router.post("/register", response_model=UserOut)
def register(user: UserCreate, db: Session = Depends(get_db)):
    """
    Registra un nuevo usuario como 'client'.
    Si el correo ya existe, lanza error 400.
    """
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="El correo ya está registrado")

    hashed_pwd = hash_password(user.password)

    new_user = User(
        email=user.email,
        hashed_password=hashed_pwd,
        role="client",  # 🔒 Forzamos el rol 'client' para seguridad
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

# ─────────────────────────────────────────────
# 🔐 Inicio de sesión (Login)
# ─────────────────────────────────────────────
@router.post("/login", response_model=Token)
def login(user: LoginInput, db: Session = Depends(get_db)):
    """
    Valida las credenciales y retorna un token JWT.
    Si son incorrectas, lanza error 401.
    """
    db_user = db.query(User).filter(User.email == user.email).first()

    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Credenciales inválidas")

    token_data = {"sub": db_user.email, "role": db_user.role}
    token = create_access_token(token_data)

    return {"access_token": token, "token_type": "bearer"}

# ─────────────────────────────────────────────
# 🔁 Solicitud de restablecimiento de contraseña
# ─────────────────────────────────────────────
@router.post("/auth/forgot-password")
def forgot_password(data: ForgotPasswordRequest, db: Session = Depends(get_db)):
    """
    Genera y envía un enlace para restablecer la contraseña.
    Si el correo no existe, lanza error 404.
    """
    user = db.query(User).filter(User.email == data.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="El usuario no existe")

    token = create_reset_token(user.email)

    # Leer URL del frontend desde .env (fallback a localhost)
    FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")
    reset_link = f"{FRONTEND_URL}/reset-password?token={token}"

    logger.info(f"[RECUPERACIÓN] Link generado para {user.email}: {reset_link}")

    # Enviar el email con el link
    send_password_reset_email(user.email, reset_link)

    return {"msg": "Se ha enviado un enlace para restablecer tu contraseña."}

# ─────────────────────────────────────────────
# 🔄 Confirmación de nuevo password desde token
# ─────────────────────────────────────────────
@router.post("/auth/reset-password")
def reset_password(data: ResetPasswordRequest, db: Session = Depends(get_db)):
    """
    Restablece la contraseña de un usuario desde un token válido.
    Si falla el token o el usuario no existe, lanza error.
    """
    try:
        email = verify_reset_token(data.token)

        user = db.query(User).filter(User.email == email).first()
        if not user:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")

        user.hashed_password = hash_password(data.new_password)
        db.commit()

        return {"msg": "Contraseña actualizada correctamente"}

    except Exception as e:
        import traceback
        logger.error(f"[ERROR] Restableciendo contraseña: {e}")
        logger.error(traceback.format_exc())
        raise HTTPException(status_code=400, detail="Token inválido o expirado")
