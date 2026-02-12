from fastapi import FastAPI
from app.upload import router as upload_router

app = FastAPI(title="GlassBox API")

app.include_router(upload_router)


@app.get("/")
def root():
    return {"message": "GlassBox backend is running"}
