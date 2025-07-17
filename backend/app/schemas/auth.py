from pydantic import BaseModel
from typing import Optional

# 🔐 Login (entrada)
class LoginInput(BaseModel):
    email: str
    password: str

# 🔑 Token (respuesta)
class Token(BaseModel):
    access_token: str
    token_type: str

# 📦 Para extraer datos del token
class TokenData(BaseModel):
    email: Optional[str] = None
