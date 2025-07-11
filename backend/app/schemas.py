from pydantic import BaseModel, EmailStr
from typing import Optional

# Para crear usuario (registro)
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    role: str  # admin / entrenador / cliente

# Para respuesta cuando se crea o consulta un usuario
class UserOut(BaseModel):
    id: int
    email: EmailStr
    role: str

    class Config:
        from_attributes = True  # permite convertir de SQLAlchemy a Pydantic automáticamente

# Para respuesta del login (token)
class Token(BaseModel):
    access_token: str
    token_type: str

# Para extraer datos del token (opcional)
class TokenData(BaseModel):
    email: Optional[str] = None

# Para login (autenticación)
class LoginInput(BaseModel):
    email: str
    password: str