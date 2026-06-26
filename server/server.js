require('dotenv').config();
const express = require("express");
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');

const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI();


app.post('/chat', async (req, res) => {
    // 2. Receive the user's message from req.body
    const userMessage = req.body.message;
    console.log("Received from user:", userMessage);

    // 3. For Phase 1, return a hardcoded dummy response
    try {
        // Example using a universal standard fetch call to an AI endpoint:
        // (Swap out the URL and headers depending on if you're using OpenAI, Gemini, etc.)
        const apiResponse = await fetch('https://api.example.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "your-chosen-model",
                messages: [{ role: "user", content: userMessage }]
            })
        });

        const aiData = await apiResponse.json();
        
        // Extract the text string from the specific AI's response object structure
        const aiText = aiData.choices[0].message.content; 

        // Send it right back to Prachi's frontend fetch loop
        res.json({ reply: aiText });

    } catch (error) {
        console.error("AI API Call Failed:", error);
        // Fallback response so the frontend doesn't hang forever
        res.status(500).json({ reply: "Oops! My brain short-circuited. Try again?" });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));