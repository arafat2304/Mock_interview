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

// backend route
// app.post("/api/tts", async (req, res) => {
//   try {
//     const { text } = req.body;
//     if (!text) return res.status(400).json({ error: "Text is required" });

//     const elevenRes = await axios.post(
//       `https://api.elevenlabs.io/v1/text-to-speech/FGY2WhTYpPnrIDTdsKH5`,
//       {
//         text,
//         model_id: "eleven_turbo_v2",
//         voice_settings: { stability: 0.5, similarity_boost: 0.75 },
//       },
//       {
//         headers: {
//           "xi-api-key": "0a172fcde8c17bad4d2d8ea57cfacb1d2d7a630edc4fc278647649a14fb45595",
//           "Content-Type": "application/json",
//         },
//         responseType: "arraybuffer",
//       }
//     );

//     res.send(elevenRes.data);
//   } catch (err) {
//     console.error("TTS error:", err.response?.data || err.message);
//     res.status(500).json({ error: "TTS failed"});
//   }
// });

app.use("/user",userRoute);
app.use("/ai",AIRoute);




app.get("/",(req,res)=>{
    res.send("Backend is Running ")
})


app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})