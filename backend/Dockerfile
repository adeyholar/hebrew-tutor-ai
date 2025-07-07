# backend/Dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install postgres client for psql and build-essential for other potential dependencies
RUN apt-get update && apt-get install -y postgresql-client build-essential && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy and make executable the migration script
COPY ./run_migrations.sh /app/run_migrations.sh
RUN chmod +x /app/run_migrations.sh

# Explicitly copy your application's source code and necessary files/folders
COPY ./main.py ./
COPY ./database.py ./
COPY ./routers ./routers/
COPY ./models ./models/
COPY ./migrations ./migrations/

EXPOSE 8000

# Run migrations and then start the server using shell form
CMD ["/bin/sh", "-c", "/app/run_migrations.sh && uvicorn main:app --host 0.0.0.0 --port 8000"]