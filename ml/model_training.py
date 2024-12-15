import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib

# Sample dataset (you can replace it with your actual dataset)
data = {
    "Math_Score": [85, 90, 78, 92, 88],
    "Science_Score": [80, 85, 76, 95, 89],
    "Interest_Level": [5, 4, 3, 5, 4],  # Interest level on a scale of 1-5
    "Recommended_Career": ["Engineering", "Medicine", "Arts", "Engineering", "Engineering"]
}

# Create a DataFrame
df = pd.DataFrame(data)

# Features and target
X = df[["Math_Score", "Science_Score", "Interest_Level"]]
y = df["Recommended_Career"]

# Train a Random Forest Classifier
model = RandomForestClassifier(random_state=42)
model.fit(X, y)

# Save the trained model to a file
joblib.dump(model, "ml/recommendation_model.pkl")

print("Model training complete. Saved to 'ml/recommendation_model.pkl'.")
