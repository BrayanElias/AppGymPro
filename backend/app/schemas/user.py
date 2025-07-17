from pydantic import BaseModel, EmailStr
from typing import Optional

# Para crear usuario (registro)
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    role: Optional[str] = None  # El frontend no lo envía
    
# Para mostrar datos del usuario
class UserOut(BaseModel):
    id: int
    email: EmailStr
    role: str

    class Config:
        from_attributes = True  # SQLAlchemy → Pydantic
