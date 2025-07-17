# app/services/email_utils.py

import smtplib
from email.message import EmailMessage

# 📧 Envía un correo con el enlace de restablecimiento de contraseña
def send_password_reset_email(to_email: str, reset_link: str):
    # Crear mensaje
    msg = EmailMessage()
    msg["Subject"] = "Restablece tu contraseña"
    msg["From"] = "no-reply@miapp.com"
    msg["To"] = to_email

    # Cuerpo del mensaje
    msg.set_content(
        f"""
Hola,

Haz clic en este enlace para restablecer tu contraseña:

{reset_link}

Si no solicitaste esto, puedes ignorar este mensaje.
        """
    )

    # Envío usando un servidor SMTP local (útil para pruebas con Mailhog, smtp4dev, etc.)
    try:
        with smtplib.SMTP("localhost", 1025) as smtp:
            smtp.send_message(msg)
        print(f"[OK] Correo enviado a {to_email}")
    except Exception as e:
        print(f"[ERROR] No se pudo enviar el correo: {e}")
