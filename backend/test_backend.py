# test_backend.py
import requests
from time import sleep
from colorama import init, Fore, Style

init(autoreset=True)  # Para colorear terminal (Windows friendly)

BASE_URL = "http://localhost:8000"
REGISTER_URL = f"{BASE_URL}/register"
LOGIN_URL = f"{BASE_URL}/login"
CLIENT_DASH = f"{BASE_URL}/client/me"
ADMIN_DASH = f"{BASE_URL}/admin/dashboard"
FORGOT_PWD = f"{BASE_URL}/auth/forgot-password"
RESET_PWD = f"{BASE_URL}/auth/reset-password"

TEST_EMAIL = "test@example.com"
TEST_PASSWORD = "123456"

def print_status(icon, msg, color=Fore.GREEN):
    print(f"{color}{icon} {msg}")

def test_register():
    print_status("📝", "Intentando registrar usuario...")
    data = {"email": TEST_EMAIL, "password": TEST_PASSWORD}
    r = requests.post(REGISTER_URL, json=data)
    if r.status_code == 200:
        print_status("✅", "Usuario registrado exitosamente.")
    elif r.status_code == 400:
        print_status("ℹ️", "El usuario ya está registrado.")
    else:
        print_status("❌", f"Error en registro: {r.status_code} {r.text}", Fore.RED)

def test_login():
    print_status("🔐", "Intentando iniciar sesión...")
    data = {"email": TEST_EMAIL, "password": TEST_PASSWORD}
    r = requests.post(LOGIN_URL, json=data)
    if r.status_code == 200:
        print_status("✅", "Login exitoso.")
        return r.json()["access_token"]
    else:
        print_status("❌", f"Error de login: {r.status_code} {r.text}", Fore.RED)
        return None

def test_dashboard(token, endpoint, role_name):
    print_status("🔎", f"Verificando acceso al dashboard de {role_name}...")
    headers = {"Authorization": f"Bearer {token}"}
    r = requests.get(endpoint, headers=headers)
    if r.status_code == 200:
        print_status("✅", f"Acceso correcto al dashboard de {role_name}.")
    else:
        print_status("🚫", f"Acceso denegado al dashboard de {role_name}: {r.status_code}", Fore.YELLOW)

def test_password_reset_request():
    print_status("📨", "Solicitando enlace de recuperación de contraseña...")
    r = requests.post(FORGOT_PWD, json={"email": TEST_EMAIL})
    if r.status_code == 200:
        print_status("✅", "Solicitud de recuperación enviada.")
    else:
        print_status("❌", f"Error en solicitud de recuperación: {r.status_code}", Fore.RED)

def test_reset_with_fake_token():
    print_status("🧪", "Intentando reset con token inválido...")
    r = requests.post(RESET_PWD, json={
        "token": "token_falso",
        "new_password": "nuevo123"
    })
    if r.status_code != 200:
        print_status("✅", "Falló como se esperaba: token inválido.")
    else:
        print_status("❌", "No debería permitir reset con token falso", Fore.RED)

# -------------------------------
# 🧪 Ejecutar todas las pruebas
# -------------------------------
if __name__ == "__main__":
    print(Fore.CYAN + "\n=== 🚀 TEST DE FUNCIONALIDADES BACKEND ===\n")

    test_register()
    sleep(1)
    token = test_login()
    if token:
        sleep(1)
        test_dashboard(token, ADMIN_DASH, "admin")     # Debería fallar
        test_dashboard(token, CLIENT_DASH, "cliente")  # Debería funcionar
        sleep(1)
        test_password_reset_request()
        sleep(1)
        test_reset_with_fake_token()

    print(Fore.CYAN + "\n✅ Pruebas completadas.\n")
