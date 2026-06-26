require('dotenv').config();
const express = require("express");
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');

const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({});


app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    if (!userMessage) {
        return res.status(400).json({ error: "No message provided" });
    }

    try {
        console.log(`[Server] Forwarding message to Gemini: "${userMessage}"`);

        // 🚀 This uses the official Google SDK instead of a manual fetch block!
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: userMessage,
        });

        // Extract the clean text response string from Gemini
        const aiReplyText = response.text;

        console.log(`[Server] Gemini replied successfully.`);

        // Send it right back to Prachi's frontend fetch loop
        res.json({ reply: aiReplyText });

    } catch (error) {
        console.error("AI API Error:", error);
        res.status(500).json({ reply: "Sorry, I had trouble processing that request." });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));