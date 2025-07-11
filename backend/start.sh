#!/bin/bash

# Comando para iniciar el servidor FastAPI con Uvicorn
uvicorn app.main:app --host 0.0.0.0 --port 10000
