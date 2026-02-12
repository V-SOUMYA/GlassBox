import pandas as pd
from sklearn.linear_model import LinearRegression
from joblib import dump

# Create a simple dataset
data = {
    "hours_studied": [1, 2, 3, 4, 5, 6],
    "attendance": [60, 65, 70, 75, 80, 85],
    "score": [50, 55, 60, 65, 70, 75],
}

df = pd.DataFrame(data)

# Features and target
X = df[["hours_studied", "attendance"]]
y = df["score"]

# Train model
model = LinearRegression()
model.fit(X, y)

# Save dataset and model
df.to_csv("students.csv", index=False)
dump(model, "model.joblib")

print("Test dataset and model created!")
