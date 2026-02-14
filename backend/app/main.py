from fastapi import FastAPI
from app.upload import router as upload_router

app = FastAPI(title="GlassBox API")

app.include_router(upload_router)


@app.get("/")
def root():
    return {"message": "GlassBox backend is running"}


from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
