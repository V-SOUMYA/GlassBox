from fastapi import FastAPI

app = FastAPI(title="GlassBox API")

@app.get("/")
def root():
    return {"message": "GlassBox backend is running"}
# 