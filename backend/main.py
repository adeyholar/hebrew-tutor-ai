from fastapi import FastAPI
from routers import auth, user
from middleware.audit import AuditMiddleware

app = FastAPI(title="Hebrew Tutor AI")
app.add_middleware(AuditMiddleware)

app.include_router(auth.router, prefix="/auth")
app.include_router(user.router, prefix="/user")

@app.get("/")
async def root():
    return {"message": "Hebrew Tutor AI API"}