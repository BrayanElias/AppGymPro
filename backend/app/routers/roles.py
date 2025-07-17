# app/routers/roles.py

from fastapi import APIRouter, Depends
from app.db.models.user import User
from app.core.security import require_role  # Función que verifica si el usuario tiene el rol adecuado

router = APIRouter(
    tags=["Roles"],
    prefix=""
)

# ─────────────────────────────────────────────
# 🛡 Ruta solo para ADMINISTRADORES
# ─────────────────────────────────────────────
@router.get("/admin/dashboard")
def admin_dashboard(current_user: User = Depends(require_role("admin"))):
    """
    Acceso exclusivo para usuarios con rol 'admin'.
    Devuelve un mensaje de bienvenida con su rol.
    """
    return {
        "message": f"Bienvenido administrador: {current_user.email}",
        "rol": current_user.role
    }

# ─────────────────────────────────────────────
# 🛡 Ruta solo para ENTRENADORES
# ─────────────────────────────────────────────
@router.get("/trainer/dashboard")
def trainer_dashboard(current_user: User = Depends(require_role("trainer"))):
    """
    Acceso exclusivo para usuarios con rol 'trainer'.
    """
    return {
        "message": f"Bienvenido entrenador: {current_user.email}",
        "rol": current_user.role
    }

# ─────────────────────────────────────────────
# 🛡 Ruta solo para CLIENTES
# ─────────────────────────────────────────────
@router.get("/client/me")
def client_me(current_user: User = Depends(require_role("client"))):
    """
    Ruta para que el cliente vea su propia información.
    """
    return {
        "message": f"Bienvenido cliente: {current_user.email}",
        "rol": current_user.role
    }
