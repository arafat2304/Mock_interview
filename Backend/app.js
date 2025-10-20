const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const userRoute = require("./route/user");
const connectDB = require("./DB/DB");
const cors = require("cors");
const AIRoute = require("./route/AI");
const cookieParser = require("cookie-parser");
const axios = require("axios")


const PORT=5000;

connectDB();
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use('/upload', express.static('upload'));

app.post("/tts",async (req,res)=>{
   try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Text is required" });

    const apiKey = be072ff438867af3131336a27786575016245caccb4a98558bc7b5a3a0b476f8;

    if (!apiKey) return res.status(500).json({ error: "Missing ElevenLabs API key" });
 // Replace with your ElevenLabs voice ID

    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/2EiwWnXFnvU5JabPnv8n`,
      {
        text,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75
        }
      },
      {
        headers: {
          "xi-api-key": apiKey,
          "Content-Type": "application/json",
          "Accept": "audio/mpeg"
        },
        responseType: "arraybuffer"
      }
    );

     const audioBase64 = Buffer.from(response.data).toString("base64");
    res.json({ audio: audioBase64 });
  } catch (error) {
    console.error("TTS Error:", error.response?.data || error.message);
    res.status(500).json({ error: "TTS generation failed" });
  }
})

app.use("/user",userRoute);
app.use("/ai",AIRoute);




app.get("/",(req,res)=>{
    res.send("Backend is Running ")
})


app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})