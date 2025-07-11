from fastapi import FastAPI
from app import auth
from app import auth, roles 
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Frontend en Vite
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Activar las rutas de login y registro
app.include_router(auth.router)

# Rutas protegidas por rol (admin, entrenador, cliente)
app.include_router(roles.router)