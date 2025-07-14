from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import User
from app.schemas import UserCreate, UserOut, Token, LoginInput, ForgotPasswordRequest, ResetPasswordRequest
from app.security import (
    hash_password,
    verify_password,
    create_access_token,
    create_reset_token,
    verify_reset_token,
)
from app.email_utils import send_password_reset_email  # Asegúrate de tener esta función
import os
from logging import getLogger
logger = getLogger(__name__)

router = APIRouter()

# Dependencia para la sesión de base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ==========================
# Registro
# ==========================
@router.post("/register", response_model=UserOut)
def register(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="El correo ya está registrado")

    hashed_pwd = hash_password(user.password)

    new_user = User(
        email=user.email,
        hashed_password=hashed_pwd,
        role="client",  # 🔒 ignoramos user.role, lo forzamos a "client"
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


# ==========================
# Login
# ==========================
@router.post("/login", response_model=Token)
def login(user: LoginInput, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Credenciales inválidas")

    token_data = {"sub": db_user.email, "role": db_user.role}
    token = create_access_token(token_data)

    return {"access_token": token, "token_type": "bearer"}

# ==========================
# Solicitud de restablecimiento
# ==========================
@router.post("/auth/forgot-password")
def forgot_password(data: ForgotPasswordRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="El usuario no existe")

    token = create_reset_token(user.email)

    # Leer FRONTEND_URL desde .env (usa localhost en desarrollo por defecto)
    FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")
    reset_link = f"{FRONTEND_URL}/reset-password?token={token}"
    print(f"[RECUPERACIÓN] Enlace generado para {user.email}: {reset_link}")

    # Envía el correo
    send_password_reset_email(user.email, reset_link)

    return {"msg": "Se ha enviado un enlace para restablecer tu contraseña."}

# ==========================
# Restablecer contraseña
# ==========================
@router.post("/auth/reset-password")
def reset_password(data: ResetPasswordRequest, db: Session = Depends(get_db)):
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
        logger.error(f"[RECUPERACIÓN] Error al restablecer la contraseña: {e}")
        logger.error(traceback.format_exc())
        raise HTTPException(status_code=400, detail="Token inválido o expirado")
    
