def analyze_risks(code_analysis: dict, dataset_profile: dict):

    risks = []

    # --- Code-based Risks ---

    if not code_analysis.get("train_test_split_detected"):
        risks.append("No train-test split detected. Model may be overfitting.")

    if not code_analysis.get("cross_validation_detected"):
        risks.append("No cross-validation detected. Model evaluation may be weak.")

    if not code_analysis.get("fit_detected"):
        risks.append("Model training (.fit) not detected.")

    if not code_analysis.get("predict_detected"):
        risks.append("Prediction step (.predict) not detected.")

    if len(code_analysis.get("models_detected", [])) == 0:
        risks.append("No ML model detected in the code.")

    # --- Dataset-based Risks ---

    rows = dataset_profile.get("rows", 0)
    missing_values = dataset_profile.get("missing_values", {})
    numeric_features = dataset_profile.get("numeric_features", [])
    categorical_features = dataset_profile.get("categorical_features", [])

    if rows < 50:
        risks.append("Small dataset size detected. Model may not generalize well.")

    if len(missing_values) > 0:
        risks.append("Dataset contains missing values. Missing value handling not verified.")

    if len(numeric_features) == 0:
        risks.append("No numeric features detected. Model performance may be limited.")

    if len(categorical_features) > 0:
        risks.append("Categorical features detected. Encoding method not verified.")

    return risks
