const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const userRoute = require("./route/user");
const connectDB = require("./DB/DB");
const cors = require("cors");
const AIRoute = require("./route/AI");
const cookieParser = require("cookie-parser");

const PORT=5000;

connectDB();
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use('/upload', express.static('upload'));


app.post('/interviews/add', async (req, res) => {
  try {
    const {
      userId,
      role,
      level,
      techStack,
      type,
      amount,
      questions,
      answers,
      score,
      feedback,
      questionFeedback,
      finalized
    } = req.body;

    // ✅ Validate required fields
    if (!userId || !role || !level || !techStack || !type || !amount || !questions || !questions.length) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newInterview = new Interview({
      userId,
      role,
      level,
      techStack,
      type,
      amount,
      questions,
      answers: answers || [],             // default empty array if not provided
      score: score || 0,
      feedback: feedback || "",
      questionFeedback: questionFeedback || [],
      finalized: finalized || false
    });

    const savedInterview = await newInterview.save();
    res.status(201).json({
      message: 'Interview added successfully',
      interview: savedInterview
    });

  } catch (err) {
    console.error('Error creating interview:', err);
    res.status(500).json({ error: err.message });
  }
});

app.use("/user",userRoute);
app.use("/ai",AIRoute);




app.get("/",(req,res)=>{
    res.send("Backend is Running ")
})


app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})