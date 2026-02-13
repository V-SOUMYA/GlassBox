import pandas as pd


def profile_dataset(df: pd.DataFrame):

    numeric_cols = df.select_dtypes(include=["int64", "float64"]).columns.tolist()
    categorical_cols = df.select_dtypes(include=["object", "category"]).columns.tolist()

    missing_values = df.isnull().sum()
    missing_summary = {
        col: int(count)
        for col, count in missing_values.items()
        if count > 0
    }

    return {
        "rows": int(df.shape[0]),
        "columns": int(df.shape[1]),
        "numeric_features": numeric_cols,
        "categorical_features": categorical_cols,
        "missing_values": missing_summary
    }
