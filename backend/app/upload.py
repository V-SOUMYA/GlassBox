from app.explain import analyze_bias
from fastapi import APIRouter, UploadFile, File, HTTPException
from app.explain import compute_feature_importance, explain_single_prediction

import pandas as pd
import joblib
import tempfile
import os

router = APIRouter()


def load_model_and_data(model_file: UploadFile, dataset_file: UploadFile):
    """
    Shared utility to load model and dataset safely
    """
    if not model_file.filename.endswith((".pkl", ".joblib", ".sav")):
        raise HTTPException(
            status_code=400,
            detail="Model must be .pkl, .joblib, or .sav"
        )

    if not dataset_file.filename.endswith(".csv"):
        raise HTTPException(
            status_code=400,
            detail="Dataset must be a .csv file"
        )

    with tempfile.TemporaryDirectory() as temp_dir:
        model_path = os.path.join(temp_dir, model_file.filename)
        data_path = os.path.join(temp_dir, dataset_file.filename)

        with open(model_path, "wb") as f:
            f.write(model_file.file.read())

        with open(data_path, "wb") as f:
            f.write(dataset_file.file.read())

        try:
            model_obj = joblib.load(model_path)
        except Exception:
            raise HTTPException(
                status_code=400,
                detail="Invalid or unsupported model file. Only sklearn models are supported."
            )

        try:
            df = pd.read_csv(data_path)
        except Exception:
            raise HTTPException(
                status_code=400,
                detail="Invalid CSV file."
            )

    if df.empty:
        raise HTTPException(
            status_code=400,
            detail="Dataset is empty."
        )

    return model_obj, df


# ------------------------
# Upload Endpoint
# ------------------------
@router.post("/upload")
async def upload_files(
    model: UploadFile = File(...),
    dataset: UploadFile = File(...)
):
    model_obj, df = load_model_and_data(model, dataset)

    return {
        "message": "Model and dataset uploaded successfully",
        "rows": df.shape[0],
        "columns": df.shape[1]
    }


# ------------------------
# Global Feature Importance
# ------------------------
@router.post("/explain/feature-importance")
async def feature_importance(
    model: UploadFile = File(...),
    dataset: UploadFile = File(...),
    target_column: str = "score"
):
    model_obj, df = load_model_and_data(model, dataset)

    if target_column not in df.columns:
        raise HTTPException(
            status_code=400,
            detail=f"Target column '{target_column}' not found in dataset"
        )

    X = df.drop(columns=[target_column])

    importance = compute_feature_importance(model_obj, X)

    return {
        "feature_importance": importance
    }


# ------------------------
# Local Explanation
# ------------------------
@router.post("/explain/local")
async def local_explanation(
    model: UploadFile = File(...),
    dataset: UploadFile = File(...),
    target_column: str = "score",
    row_index: int = 0
):
    model_obj, df = load_model_and_data(model, dataset)

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


@router.post("/analyze/bias")
async def bias_analysis(
    model: UploadFile = File(...),
    dataset: UploadFile = File(...),
    target_column: str = "score",
    protected_column: str = "gender"
):
    model_obj, df = load_model_and_data(model, dataset)

    try:
        result = analyze_bias(model_obj, df, target_column, protected_column)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    return result
