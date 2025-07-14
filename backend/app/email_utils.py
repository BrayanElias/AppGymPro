# email_utils.py

import smtplib
from email.message import EmailMessage

def send_password_reset_email(to_email: str, reset_link: str):
    msg = EmailMessage()
    msg["Subject"] = "Restablece tu contraseña"
    msg["From"] = "no-reply@miapp.com"
    msg["To"] = to_email
    msg.set_content(
        f"Hola,\n\nHaz clic en este enlace para restablecer tu contraseña:\n{reset_link}\n\nSi no solicitaste esto, puedes ignorar el mensaje."
    )

    try:
        with smtplib.SMTP("localhost", 1025) as smtp:
            smtp.send_message(msg)
        print(f"[OK] Correo enviado a {to_email}")
    except Exception as e:
        print(f"[ERROR] No se pudo enviar el correo: {e}")
