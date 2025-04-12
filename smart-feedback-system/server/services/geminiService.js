const axios = require("axios");

const analyzeSentiment = async (comment) => {
  const apiKey = process.env.GEMINI_API_KEY;
  const endpoint =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-001:generateContent";




const prompt = `
You are an AI sentiment analyzer. Score the following hotel guest comment using ONLY a number between -1 (very negative) and +1 (very positive).
DO NOT explain. JUST return a number.

Comment: "${comment}"
`;


  try {
    const response = await axios.post(
      `${endpoint}?key=${apiKey}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const rawOutput = response.data.candidates[0].content.parts[0].text;
    const score = parseFloat(rawOutput.trim());

    // Ensure it's a valid number
    if (isNaN(score)) return null;
    return Math.max(-1, Math.min(1, score)); // Clamp between -1 and 1
  } catch (error) {
    console.error("Gemini error:", error.response?.data || error.message);
    return null;
  }
};

module.exports = {
  analyzeSentiment,
};
