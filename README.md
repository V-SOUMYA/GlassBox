# 📦 GlassBox

> Transparent machine learning, explained.

GlassBox is a lightweight ML explainability tool that helps you understand **what your trained machine learning model is doing — and why.**

Upload a trained scikit-learn model and a dataset, and GlassBox provides:

- ✅ Model validation  
- 🔍 Global feature importance (SHAP)  
- 🎯 Local prediction explanations  

---

## 🚀 Features

### 📤 Model & Dataset Upload

Upload:
- A trained scikit-learn model (`.pkl`, `.joblib`, `.sav`)
- A dataset in CSV format

GlassBox verifies:
- File format  
- Model compatibility  
- Dataset integrity  
- Dataset size (rows & columns)  

Example response:

```json
{
  "message": "Model and dataset uploaded successfully",
  "rows": 100,
  "columns": 5
}
```

---

### 🔍 Global Feature Importance

Understand which features influence your model most overall.

GlassBox uses **SHAP (SHapley Additive exPlanations)** to compute:

- Mean absolute feature impact  
- Ranked feature importance  
- Model-level interpretability  

Example output:

```json
{
  "feature_importance": [
    {"feature": "hours_studied", "importance": 0.52},
    {"feature": "attendance", "importance": 0.48}
  ]
}
```

This answers:

> “What features matter most in this model?”

---

### 🎯 Local Prediction Explanation

Explain a single prediction at the row level.

GlassBox returns:

- The model’s predicted value  
- How each feature contributed to that prediction  

Example output:

```json
{
  "prediction": 68.0,
  "explanation": {
    "hours_studied": 5.2,
    "attendance": 3.1
  }
}
```

This answers:

> “Why did THIS specific prediction happen?”

---

## 🧠 Supported Model Formats

GlassBox currently supports trained **scikit-learn models** saved as:

- `.joblib`
- `.pkl`
- `.sav`

If you trained your model in Jupyter or Google Colab, export it using:

```python
import joblib
joblib.dump(model, "model.joblib")
```

Then upload the exported model file along with your dataset CSV.

---

## ⚙️ Tech Stack

- **FastAPI** — Backend framework  
- **SHAP** — Model explainability  
- **scikit-learn** — Supported ML framework  
- **Python 3.9+**

---

## 📌 What This Project Demonstrates

- Model serialization handling  
- Explainable AI integration using SHAP  
- Global vs Local model interpretability  
- API design & validation  
- Error handling  
- Clean backend architecture  
- Real-world ML engineering practices  

---

## 📄 License

MIT License