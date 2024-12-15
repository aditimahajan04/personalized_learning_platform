import joblib
from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS after creating app

# Create the Flask app
app = Flask(__name__)

# Enable CORS
CORS(app)

# Load the trained model
model = joblib.load("ml/recommendation_model.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Get data from the request body
        data = request.get_json()
        math_score = data["Math_Score"]
        science_score = data["Science_Score"]
        interest_level = data["Interest_Level"]

        # Prepare the input data for prediction
        input_data = [[math_score, science_score, interest_level]]

        # Make a prediction using the model
        prediction = model.predict(input_data)
        
        # Return the prediction
        result = {"Recommended_Career": prediction[0]}
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)  # Run the Flask app on port 5001
