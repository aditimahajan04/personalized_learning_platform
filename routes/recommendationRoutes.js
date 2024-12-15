const express = require("express");
const axios = require("axios");
const router = express.Router();
const Recommendation = require("../models/Recommendation");

// Generate a recommendation for a user
router.post("/generate", async (req, res) => {
    const { userId, Math_Score, Science_Score, Interest_Level } = req.body;

    try {
        // Make a POST request to the Flask server
        const response = await axios.post("http://localhost:5001/predict", {
            Math_Score,
            Science_Score,
            Interest_Level,
        });

        // Get the recommended career from the response
        const recommendedCareer = response.data.Recommended_Career;

        // Save the recommendation to MongoDB
        const recommendation = new Recommendation({
            userId,
            recommendationType: "career",
            recommendationDetails: recommendedCareer,
        });

        await recommendation.save();

        // Send the response back to the client
        res.status(200).json({
            message: "Recommendation generated successfully",
            recommendation,
        });
    } catch (error) {
        console.error(error);  // Log the error for debugging
        res.status(500).json({ error: "Failed to generate recommendation" });
    }
});

module.exports = router;
