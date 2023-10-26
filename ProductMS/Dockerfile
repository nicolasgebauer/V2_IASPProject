# Usar una imagen base ligera de Python
FROM python:3.9-slim

# Establecer el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Install netcat-openbsd
RUN apt-get update && apt-get install -y netcat-openbsd && apt-get clean

# Copiar los requisitos y instalar las dependencias
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entrypoint script
COPY wait-for-postgres.sh /usr/local/bin/

# Copiar el resto del código de la aplicación
COPY api ./api

ENTRYPOINT ["/usr/local/bin/wait-for-postgres.sh"]
CMD ["uvicorn", "api.main:app", "--host", "0.0.0.0", "--port", "8000"]
