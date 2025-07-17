# backend/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# 📁 Importaciones de rutas (routers)
from app.routers import roles
from app.routers import auth  # auth: login/registro, roles: rutas protegidas por rol (admin, trainer, client)
from app.routers.admin import trainers  # 🔧 Rutas específicas del admin para gestión de entrenadores

# 🚀 Crea una instancia de la aplicación FastAPI
app = FastAPI(
    title="GymAppPro API",
    description="API para gestión de gimnasio: usuarios, entrenadores, planes, etc.",
    version="1.0.0"
)

# 🔐 Middleware CORS: permite que el frontend (React/Vite) pueda comunicarse con el backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ⚠️ Para producción, cambiar a ruta de frontend 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 📌 Rutas públicas: login, registro y recuperación de contraseña
app.include_router(auth.router)

# 🔒 Rutas protegidas por roles: admin, trainer, client
app.include_router(roles.router)

# 🛠️ Rutas del administrador: gestión de entrenadores (CRUD)
app.include_router(trainers.router)
