import express from 'express'
const router = express.Router();
import axios from 'axios'

// POST /api/predict-career → Sends responses to Flask
router.post("/", async (req, res) => {
    try {
        const flaskResponse = await axios.post("http://127.0.0.1:5000/predict-career", req.body, {
            headers: { "Content-Type": "application/json" }
        });

        res.json(flaskResponse.data);
    } catch (error) {
        console.error("Flask API error:", error.message);
        res.status(500).json({ error: "Error connecting to Flask API" });
    }
});

export default router;
