import ast


class MLCodeAnalyzer(ast.NodeVisitor):
    def __init__(self):
        self.imports = []
        self.models_detected = []
        self.fit_detected = False
        self.predict_detected = False
        self.train_test_split_detected = False
        self.metrics_detected = []
        self.cross_validation_detected = False

    def visit_Import(self, node):
        for alias in node.names:
            self.imports.append(alias.name)

    def visit_ImportFrom(self, node):
        module = node.module
        if module:
            self.imports.append(module)

    def visit_Call(self, node):
        # Detect .fit()
        if isinstance(node.func, ast.Attribute):
            if node.func.attr == "fit":
                self.fit_detected = True
            if node.func.attr == "predict":
                self.predict_detected = True

        # Detect train_test_split
        if isinstance(node.func, ast.Name):
            if node.func.id == "train_test_split":
                self.train_test_split_detected = True

        # Detect cross validation
        if isinstance(node.func, ast.Name):
            if node.func.id in ["cross_val_score", "GridSearchCV"]:
                self.cross_validation_detected = True

        self.generic_visit(node)

    def visit_Assign(self, node):
        # Detect model instantiation
        if isinstance(node.value, ast.Call):
            if isinstance(node.value.func, ast.Name):
                class_name = node.value.func.id

                if any(keyword in class_name for keyword in [
                    "Classifier",
                    "Regressor",
                    "Regression",
                    "Forest",
                    "Boost",
                    "SVC",
                    "KNN",
                    "Linear"
                ]):
                    self.models_detected.append(class_name)

        self.generic_visit(node)


def analyze_code(code_string: str):
    try:
        tree = ast.parse(code_string)
    except SyntaxError:
        return {"error": "Invalid Python code"}

    analyzer = MLCodeAnalyzer()
    analyzer.visit(tree)

    # Infer problem type
    problem_type = "unknown"

    if any("Classifier" in model for model in analyzer.models_detected):
        problem_type = "classification"
    elif any("Regressor" in model or "Regression" in model for model in analyzer.models_detected):
        problem_type = "regression"

    return {
        "imports": list(set(analyzer.imports)),
        "models_detected": list(set(analyzer.models_detected)),
        "problem_type": problem_type,
        "fit_detected": analyzer.fit_detected,
        "predict_detected": analyzer.predict_detected,
        "train_test_split_detected": analyzer.train_test_split_detected,
        "cross_validation_detected": analyzer.cross_validation_detected
    }
