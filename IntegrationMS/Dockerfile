# Usar una imagen base ligera de Python
FROM python:3.9-slim

# Establecer el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copiar los requisitos y instalar las dependencias
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el resto del código de la aplicación
COPY api ./api

# Establecer el comando para ejecutar la aplicación usando uvicorn
CMD ["uvicorn", "api.main:app", "--host", "0.0.0.0", "--port", "8003"]
