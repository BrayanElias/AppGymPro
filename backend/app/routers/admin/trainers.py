from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.responses import Response

from app.db.database import get_db
from app.db.models.user import User
from app.core.security import hash_password, require_role

from app.schemas.trainer import TrainerCreate, TrainerUpdate, TrainerOut

router = APIRouter(
    prefix="/admin/trainers",
    tags=["Admin - Trainers"]
)

# Middleware para proteger rutas: solo el admin puede acceder
admin_required = require_role("admin")


# ────────────────────────────────────────────────────────
# 🔍 Listar todos los entrenadores
# ────────────────────────────────────────────────────────
@router.get("/", response_model=list[TrainerOut])
def get_trainers(
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):
    trainers = db.query(User).filter(User.role == "trainer").all()
    return trainers

# ────────────────────────────────────────────────────────
# 🔍 Contar todos los entrenadores
# ────────────────────────────────────────────────────────
@router.get("/count")
def get_trainer_count(db: Session = Depends(get_db)):
    return {"count": db.query(User).filter(User.role == "trainer").count()}

# ────────────────────────────────────────────────────────
# ➕ Crear nuevo entrenador
# ────────────────────────────────────────────────────────
@router.post("/", response_model=TrainerOut, status_code=status.HTTP_201_CREATED)
def create_trainer(
    trainer_data: TrainerCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):
    existing = db.query(User).filter(User.email == trainer_data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="El email ya está registrado")

    hashed_pwd = hash_password(trainer_data.password)

    trainer = User(
        email=trainer_data.email,
        hashed_password=hashed_pwd,
        role="trainer",
        name=trainer_data.name,
        specialty=trainer_data.specialty,
        phone=trainer_data.phone
    )

    db.add(trainer)
    db.commit()
    db.refresh(trainer)
    return trainer


# ────────────────────────────────────────────────────────
# ✏️ Actualizar datos de un entrenador
# ────────────────────────────────────────────────────────
@router.put("/{trainer_id}", response_model=TrainerOut)
def update_trainer(
    trainer_id: int,
    trainer_data: TrainerUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):
    trainer = db.query(User).filter(User.id == trainer_id, User.role == "trainer").first()
    if not trainer:
        raise HTTPException(status_code=404, detail="Entrenador no encontrado")

    if trainer_data.email is not None:
        trainer.email = trainer_data.email
    if trainer_data.name is not None:
        trainer.name = trainer_data.name
    if trainer_data.specialty is not None:
        trainer.specialty = trainer_data.specialty
    if trainer_data.phone is not None:
        trainer.phone = trainer_data.phone
    if trainer_data.password is not None:
        trainer.hashed_password = hash_password(trainer_data.password)

    db.commit()
    db.refresh(trainer)
    return trainer


# ────────────────────────────────────────────────────────
# ❌ Eliminar entrenador
# ────────────────────────────────────────────────────────
@router.delete("/{trainer_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_trainer(
    trainer_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):
    trainer = db.query(User).filter(User.id == trainer_id, User.role == "trainer").first()
    if not trainer:
        raise HTTPException(status_code=404, detail="Entrenador no encontrado")

    db.delete(trainer)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
