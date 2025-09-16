// routes/Pet.js
const express = require('express');
const { GoogleGenAI } = require('@google/genai');
const router = express.Router();
require('dotenv').config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

router.post('/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message required' });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
    });

    const reply = response.text || 'No reply from Gemma';
    res.json({ reply });
  } catch (err) {
    console.error('Gemma API Error:', err);
    res.status(500).json({ reply: 'Something went wrong with Gemma' });
  }
});

module.exports = router;
