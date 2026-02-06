# 🧠 GlassBox
**Transparent machine learning, explained.**

GlassBox is a simple web app that helps you understand **what your machine learning model is doing and why**.

You upload a trained ML model and a dataset, and GlassBox explains:
- which features matter the most  
- why a specific prediction was made  
- where bias or fairness issues might exist  

The goal is to make machine learning **less of a black box** and more understandable — especially for students and beginners.

---

## 🚀 Why GlassBox?

Many ML models work well but are hard to explain.  
In interviews, classes, or real-world use, people often ask:

- Why did the model predict this?
- Which features influenced the decision?
- Is the model biased?

GlassBox helps answer these questions in a clear and visual way.

---

## ✨ What GlassBox can do

- 📊 **Feature Importance**  
  See which features influence the model the most.

- 🔍 **Prediction Explanation**  
  Pick one data point and understand why the model predicted that result.

- ⚖️ **Bias & Fairness Check**  
  Compare predictions across groups (like gender or age) to spot potential bias.

- 🧠 **Plain-English Explanations**  
  Uses GenAI to explain results in simple language, not just charts.

---

## 🛠️ How it works (high level)

1. Upload a trained ML model (`.pkl` or `.joblib`)
2. Upload the dataset used to train it (`.csv`)
3. Select the target column
4. (Optional) Select a sensitive attribute for bias analysis
5. GlassBox analyzes the model and shows explanations

---

## 🧰 Tech Stack

- **Frontend:** React / Next.js  
- **Backend:** Python + FastAPI  
- **ML:** scikit-learn, SHAP  
- **GenAI:** Used for human-readable explanations  

---

## 🎓 Who is this for?

- Machine Learning students  
- Beginners learning model interpretability  
- People preparing for ML interviews  
- Anyone curious about ethical and explainable AI  

---

## 📌 Current Status

This project is under active development.  
Planned improvements include:
- Support for more model types  
- PDF export of explanations  
- Model comparison  
- “Explain like I’m 10” mode  

---

## 🤝 Contributions

Contributions, ideas, and feedback are welcome!  
If you’re new to open source, this is a beginner-friendly project.

---

## 📄 License

This project is open source and available under the MIT License.
