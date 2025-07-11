# app/database.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import dotenv_values

# Cargar variables del .env
env = dotenv_values(".env")


# Obtiene la URL de la base de datos
DATABASE_URL = env.get("DATABASE_URL")
# 👇 Agrega este print justo aquí
print("📦 DB URL cargada:", DATABASE_URL)

# Crea el motor de conexión
engine = create_engine(DATABASE_URL)

# Sesión de base de datos (para consultas)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base común para todos los modelos
Base = declarative_base()
