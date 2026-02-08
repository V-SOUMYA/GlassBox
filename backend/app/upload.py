from fastapi import APIRouter, UploadFile, File, HTTPException
import pandas as pd
import joblib
import tempfile
import os

router = APIRouter()

@router.post("/upload")
async def upload_files(
    model: UploadFile = File(...),
    dataset: UploadFile = File(...)
):
    if not model.filename.endswith((".pkl", ".joblib")):
        raise HTTPException(status_code=400, detail="Model must be .pkl or .joblib")

    if not dataset.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="Dataset must be a .csv file")

    with tempfile.TemporaryDirectory() as temp_dir:
        model_path = os.path.join(temp_dir, model.filename)
        data_path = os.path.join(temp_dir, dataset.filename)

        with open(model_path, "wb") as f:
            f.write(await model.read())

        with open(data_path, "wb") as f:
            f.write(await dataset.read())

        joblib.load(model_path)
        df = pd.read_csv(data_path)

    return {
        "message": "Model and dataset uploaded successfully",
        "rows": df.shape[0],
        "columns": df.shape[1]
    }

