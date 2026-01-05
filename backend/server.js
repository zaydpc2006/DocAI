//Yasssin------------------------------------------------------------------------------------
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    console.log("💬 User message:", message);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,

      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `
You are a general health information assistant.
Provide educational, information only.
Give all causes in general.

User question:
${message}
                `
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    console.log("🧪 RAW Gemini response:");
    console.dir(data, { depth: null });

    let reply = "No response from Gemini.";

    // If API returned an error
    if (data.error) {
      console.log("❌ API Error:", data.error);
      reply = data.error.message;
    } 
    // If safe candidates exist
    else if (data.candidates?.length > 0) {
      reply = data.candidates[0].content.parts
        .map(p => p.text)
        .join("");
      console.log("✅ Parsed reply:", reply);
    } 
    // If blocked by safety
    else if (data.promptFeedback?.blocked?.length > 0) {
      console.log("⚠️ Safety blocked:", data.promptFeedback.blocked);
      reply = "Your question was blocked for safety reasons. Try rephrasing.";
    } 
    else {
      console.log("⚠️ No candidates, no error, raw data logged above");
    }

    res.json({ reply });
  } catch (error) {
    console.error("🔥 REST error caught:", error);
    res.status(500).json({ reply: "Medical assistant unavailable." });
  }
});

app.listen(5000, () => {
  console.log("✅ Backend running on http://localhost:5000");
});
