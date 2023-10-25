#!/bin/bash

# Ejecutar la función sendDataToAPI
node /ruta/al/archivo/POSTData.js

# Iniciar tu aplicación FastAPI
uvicorn api.main:app --host 0.0.0.0 --port 8000
