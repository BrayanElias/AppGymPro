from pydantic import BaseModel, EmailStr, Field

# 🧠 Solicitud para recuperar contraseña
class ForgotPasswordRequest(BaseModel):
    email: EmailStr

# 🔁 Restablecer contraseña con token
class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str = Field(min_length=6)
