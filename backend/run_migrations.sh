#!/bin/sh
# /app/run_migrations.sh (This will be copied to /app in the container)

echo "Waiting for PostgreSQL to start..."
# This Python script robustly checks DB connection before proceeding
/usr/local/bin/python <<EOF
import os
import psycopg2
import time
import sys

db_url = os.getenv("DATABASE_URL")
print(f"Attempting to connect to database at {db_url}")
max_retries = 20
retries = 0
while retries < max_retries:
    try:
        conn = psycopg2.connect(db_url)
        conn.close()
        print("PostgreSQL is ready and accessible!")
        break
    except psycopg2.OperationalError as e:
        print(f"PostgreSQL not ready, retrying... ({retries + 1}/{max_retries}). Error: {e}")
        time.sleep(3)
        retries += 1
else:
    print("Could not connect to PostgreSQL after multiple retries. Exiting.")
    sys.exit(1)
EOF

echo "Running SQL migrations..."
# Execute your SQL file using the DATABASE_URL environment variable
psql "$DATABASE_URL" -f /app/migrations/001_users.sql

# Check if psql command was successful
if [ $? -eq 0 ]; then
    echo "Migrations complete successfully."
else
    echo "Migrations failed! Check the SQL file and database logs."
    exit 1
fi

# The main Uvicorn command will run after this script, as specified in the entrypoint