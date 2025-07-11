# app/roles.py
from fastapi import APIRouter, Depends
from app.models import User
from app.security import require_role

router = APIRouter()

# 🛡 Ruta solo para administradores
@router.get("/admin/dashboard")
def admin_dashboard(current_user: User = Depends(require_role("admin"))):
    return {
        "message": f"Bienvenido administrador: {current_user.email}",
        "rol": current_user.role
    }

# 🛡 Ruta solo para entrenadores
@router.get("/trainer/dashboard")
def trainer_dashboard(current_user: User = Depends(require_role("trainer"))):
    return {
        "message": f"Bienvenido entrenador: {current_user.email}",
        "rol": current_user.role
    }

# 🛡 Ruta solo para clientes
@router.get("/client/me")
def client_me(current_user: User = Depends(require_role("client"))):
    return {
        "message": f"Bienvenido cliente: {current_user.email}",
        "rol": current_user.role
    }
