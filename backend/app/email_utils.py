def send_password_reset_email(to_email: str, token: str):
    reset_link = f"https://appgympro.netlify.app/reset-password?token={token}"
    print(f"[RECUPERACIÓN] Enlace enviado a {to_email}: {reset_link}")
