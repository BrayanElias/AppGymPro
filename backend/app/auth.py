from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import User
from app.schemas import UserCreate, UserOut, Token, LoginInput
from app.security import hash_password, verify_password, create_access_token
from app.schemas import ForgotPasswordRequest
from app.security import create_reset_token
from app.email_utils import send_password_reset_email  # la función que haremos ahora
from app.schemas import ResetPasswordRequest
from app.security import verify_reset_token, hash_password

# 🛡️ Rutas de autenticación
router = APIRouter()

# Dependencia para la sesión de base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 📝 Registro (solo desde dashboard admin, no visible en frontend)
@router.post("/register", response_model=UserOut)
def register(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="El correo ya está registrado")

    hashed_pwd = hash_password(user.password)
    new_user = User(email=user.email, hashed_password=hashed_pwd, role=user.role)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

# 🔑 Login (solo email y password)
@router.post("/login", response_model=Token)
def login(user: LoginInput, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Credenciales inválidas")

    token_data = {"sub": db_user.email, "role": db_user.role}
    token = create_access_token(token_data)

    return {"access_token": token, "token_type": "bearer"}


# 🛠️ Restablecer contraseña
@router.post("/auth/forgot-password")
def forgot_password(data: ForgotPasswordRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="El usuario no existe")

    token = create_reset_token(user.email)
    send_password_reset_email(user.email, token)

    return {"msg": "Se ha enviado un correo para restablecer tu contraseña."}


# 🔄 Restablecer contraseña con token
@router.post("/auth/reset-password")
def reset_password(data: ResetPasswordRequest, db: Session = Depends(get_db)):
    email = verify_reset_token(data.token)

    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    user.hashed_password = hash_password(data.new_password)
    db.commit()

    return {"msg": "Contraseña actualizada correctamente"}