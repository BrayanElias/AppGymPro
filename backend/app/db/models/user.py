# app/db/models/user.py

from sqlalchemy import Column, Integer, String
from app.db.database import Base

# 🧍 Modelo de Usuario (admin, trainer, client)
class User(Base):
    """
    Modelo que representa a un usuario del sistema.

    Esta tabla almacena tanto a administradores, entrenadores como clientes.
    """
    __tablename__ = "users"  # Nombre de la tabla en la base de datos

    id = Column(Integer, primary_key=True, index=True)  # ID único
    email = Column(String, unique=True, index=True, nullable=False)  # Email (único y obligatorio)
    hashed_password = Column(String, nullable=False)  # Contraseña hasheada
    role = Column(String, nullable=False)  # Rol del usuario: 'admin', 'trainer' o 'client'

    # Campos adicionales (opcionales, se usan para los entrenadores)
    name = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    specialty = Column(String, nullable=True)