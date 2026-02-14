def analyze_risks(code_analysis: dict, dataset_profile: dict, df=None):

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

    # --- Class Imbalance Detection ---

    if code_analysis.get("problem_type") == "classification" and df is not None:

        # Assume last column is target
        target_column = df.columns[-1]

        class_distribution = df[target_column].value_counts(normalize=True)

        if len(class_distribution) > 1:
            max_class_ratio = class_distribution.max()

            if max_class_ratio > 0.7:
                risks.append(
                    f"Class imbalance detected in target '{target_column}'. "
                    f"Largest class represents {round(max_class_ratio*100,2)}% of data."
                )

    return risks
