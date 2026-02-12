import shap
import pandas as pd

def compute_feature_importance(model, X: pd.DataFrame):
    explainer = shap.Explainer(model, X)
    shap_values = explainer(X)

    # Mean absolute SHAP value per feature
    importances = abs(shap_values.values).mean(axis=0)

    results = []
    for feature, importance in zip(X.columns, importances):
        results.append({
            "feature": feature,
            "importance": float(importance)
        })

    # Sort by importance (descending)
    results.sort(key=lambda x: x["importance"], reverse=True)
    return results

def explain_single_prediction(model, X: pd.DataFrame, row_index: int):
    """
    Explains a single prediction using SHAP
    """
    explainer = shap.Explainer(model, X)
    shap_values = explainer(X)

    if row_index >= len(X):
        raise ValueError("Row index out of range")

    row_shap = shap_values[row_index]

    explanation = {}
    for feature, value in zip(X.columns, row_shap.values):
        explanation[feature] = float(value)

    prediction = float(model.predict([X.iloc[row_index]])[0])

    return {
        "prediction": prediction,
        "explanation": explanation
    }

def analyze_bias(model, df: pd.DataFrame, target_column: str, protected_column: str):
    if protected_column not in df.columns:
        raise ValueError(f"Protected column '{protected_column}' not found")

    if target_column not in df.columns:
        raise ValueError(f"Target column '{target_column}' not found")

    X = df.drop(columns=[target_column])
    y = df[target_column]

    predictions = model.predict(X)

    df_copy = df.copy()
    df_copy["prediction"] = predictions
    df_copy["residual"] = df_copy["prediction"] - y

    group_results = []

    for group_value, group_df in df_copy.groupby(protected_column):
        group_results.append({
            "group": str(group_value),
            "count": int(len(group_df)),
            "avg_prediction": float(group_df["prediction"].mean()),
            "avg_actual": float(group_df[target_column].mean()),
            "avg_residual": float(group_df["residual"].mean())
        })

    if group_results:
        preds = [g["avg_prediction"] for g in group_results]
        disparity = max(preds) - min(preds)
    else:
        disparity = 0.0

    return {
        "group_analysis": group_results,
        "prediction_disparity": float(disparity)
    }
