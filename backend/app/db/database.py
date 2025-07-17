# app/db/database.py

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import dotenv_values

# ─────────────────────────────────────────────────────
# 📦 Cargar variables desde el archivo .env
# ─────────────────────────────────────────────────────
env = dotenv_values(".env")

# 🔐 Obtener la URL de conexión a la base de datos
DATABASE_URL = env.get("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL no definida en el archivo .env")

# ─────────────────────────────────────────────────────
# ⚙️ Crear el motor de conexión SQLAlchemy
# ─────────────────────────────────────────────────────
engine = create_engine(DATABASE_URL)

# 🧪 Crear sesión local para consultas a la DB
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# 📦 Dependencia para obtener una sesión de base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# 🧱 Base declarativa para modelos SQLAlchemy
Base = declarative_base()
