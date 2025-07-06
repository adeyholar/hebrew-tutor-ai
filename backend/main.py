from fastapi import FastAPI

app = FastAPI(title="Hebrew Tutor AI")

@app.get("/")
async def root():
    return {"message": "Hebrew Tutor AI API"}