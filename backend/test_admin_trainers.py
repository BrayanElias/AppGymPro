import requests

BASE_URL = "http://127.0.0.1:8000"

# 👤 Usuario admin existente en la base de datos
ADMIN_EMAIL = "admin@example.com"
ADMIN_PASSWORD = "123456"

# ➕ Datos para nuevo entrenador
NEW_TRAINER = {
    "email": "nuevoentrenador@example.com",
    "password": "123456"
}

# ✏️ Datos modificados del entrenador
UPDATED_TRAINER = {
    "email": "entrenador_modificado@example.com",
    "password": "654321"
}

def login_admin():
    print("🔐 Logueando como admin...")
    resp = requests.post(f"{BASE_URL}/login", json={
        "email": ADMIN_EMAIL,
        "password": ADMIN_PASSWORD
    })
    if resp.status_code == 200:
        print("✅ Login exitoso.\n")
        return resp.json()["access_token"]
    else:
        print(f"❌ Error de login: {resp.text}")
        return None

def create_trainer(token):
    print("➕ Creando nuevo entrenador...")
    resp = requests.post(
        f"{BASE_URL}/admin/trainers",
        json=NEW_TRAINER,
        headers={"Authorization": f"Bearer {token}"}
    )
    if resp.status_code == 200:
        print("✅ Entrenador creado exitosamente.\n")
        return resp.json()["id"]
    else:
        print(f"❌ Error al crear entrenador: {resp.text}")
        return None

def list_trainers(token):
    print("📋 Listando entrenadores...")
    resp = requests.get(
        f"{BASE_URL}/admin/trainers",
        headers={"Authorization": f"Bearer {token}"}
    )
    if resp.status_code == 200:
        data = resp.json()
        print(f"✅ Se encontraron {len(data)} entrenadores.\n")
        return data
    else:
        print(f"❌ Error al listar: {resp.text}")
        return []

def update_trainer(trainer_id, token):
    print("✏️ Actualizando entrenador...")
    resp = requests.put(
        f"{BASE_URL}/admin/trainers/{trainer_id}",
        json=UPDATED_TRAINER,
        headers={"Authorization": f"Bearer {token}"}
    )
    if resp.status_code == 200:
        print("✅ Entrenador actualizado.\n")
    else:
        print(f"❌ Error al actualizar: {resp.text}")

def delete_trainer(trainer_id, token):
    print("🗑 Eliminando entrenador...")
    resp = requests.delete(
        f"{BASE_URL}/admin/trainers/{trainer_id}",
        headers={"Authorization": f"Bearer {token}"}
    )
    if resp.status_code == 204:
        print("✅ Entrenador eliminado.\n")
    else:
        print(f"❌ Error al eliminar: {resp.text}")

# =============================
# 🚀 EJECUCIÓN AUTOMATIZADA
# =============================

token = login_admin()
if token:
    trainer_id = create_trainer(token)
    if trainer_id:
        list_trainers(token)
        update_trainer(trainer_id, token)
        list_trainers(token)
        delete_trainer(trainer_id, token)
        list_trainers(token)
