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
