from fastapi import FastAPI
from routers import auth

app = FastAPI(title="Hebrew Tutor AI")

app.include_router(auth.router, prefix="/auth")

@app.get("/")
async def root():
    return {"message": "Hebrew Tutor AI API"}