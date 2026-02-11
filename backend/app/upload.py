from app.explain import explain_single_prediction
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

from app.explain import compute_feature_importance
@router.post("/explain/feature-importance")
async def feature_importance(
    model: UploadFile = File(...),
    dataset: UploadFile = File(...),
    target_column: str = "score"
):
    import tempfile, os, joblib

    with tempfile.TemporaryDirectory() as temp_dir:
        model_path = os.path.join(temp_dir, model.filename)
        data_path = os.path.join(temp_dir, dataset.filename)

        with open(model_path, "wb") as f:
            f.write(await model.read())

        with open(data_path, "wb") as f:
            f.write(await dataset.read())

        model = joblib.load(model_path)
        df = pd.read_csv(data_path)

    X = df.drop(columns=[target_column])

    importance = compute_feature_importance(model, X)

    return {
        "feature_importance": importance
    }


@router.post("/explain/local")
async def local_explanation(
    model: UploadFile = File(...),
    dataset: UploadFile = File(...),
    target_column: str = "score",
    row_index: int = 0
):
    import tempfile, os, joblib

    with tempfile.TemporaryDirectory() as temp_dir:
        model_path = os.path.join(temp_dir, model.filename)
        data_path = os.path.join(temp_dir, dataset.filename)

        with open(model_path, "wb") as f:
            f.write(await model.read())

        with open(data_path, "wb") as f:
            f.write(await dataset.read())

        model_obj = joblib.load(model_path)
        df = pd.read_csv(data_path)

    if target_column not in df.columns:
        raise HTTPException(
            status_code=400,
            detail=f"Target column '{target_column}' not found"
        )

    X = df.drop(columns=[target_column])

    try:
        result = explain_single_prediction(model_obj, X, row_index)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    return result
