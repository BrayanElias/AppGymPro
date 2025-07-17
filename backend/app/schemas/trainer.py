# src/schemas/trainer.py

from pydantic import BaseModel, EmailStr, Field
from typing import Optional


# Esquema para crear un nuevo entrenador desde el panel del admin
class TrainerCreate(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6)
    name: str = Field(..., min_length=2, max_length=100)
    specialty: str = Field(..., min_length=3, max_length=100)
    phone: str = Field(..., min_length=6, max_length=20)


# Esquema para actualizar datos de un entrenador existente
class TrainerUpdate(BaseModel):
    email: Optional[EmailStr] = None
    password: Optional[str] = Field(default=None, min_length=6)
    name: Optional[str] = Field(default=None, min_length=2, max_length=100)
    specialty: Optional[str] = Field(default=None, min_length=3, max_length=100)
    phone: Optional[str] = Field(default=None, min_length=6, max_length=20)

    class Config:
        from_attributes = True  # ✅ Necesario para response_model


# Esquema para mostrar datos del entrenador
class TrainerOut(BaseModel):
    id: int
    email: EmailStr
    role: str
    name: Optional[str] = None
    specialty: Optional[str] = None
    phone: Optional[str] = None

    class Config:
        from_attributes = True
