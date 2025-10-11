const { GoogleGenerativeAI } = require("@google/generative-ai");
const Interview = require("../module/interview");
const axios = require("axios")

require("dotenv").config(); // Make sure this is called before accessing process.env

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);

module.exports.generate = async (req, res) => {

  const { type, role, experience, techStack, questionCount } = req.body.formData;
  const userId = req.user._id; // Assuming req.user is set by authUser middleware

  if(!type || !role || !experience|| !techStack || !questionCount || !userId) {
    return res.status(400).json({ success: false, error: "All fields are required." });
  }

  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-001" });

  const prompt = `Prepare questions for a job interview.
                  The job role is ${role}.
                  The job experience  is ${experience} year.
                  The tech stack used in the job is ${techStack}.
                  The focus between behavioral and technical questions should lean towards: ${type}.
                  The amount of questions required is ${questionCount}.
                  Please return only questions, without any additional text.
                  The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice system.
                  Return the questions formatted like this:
                  ["Question 1","Question 2", "Question 3", ...]

                  Thank you! <3`;

  try {
    const result = await model.generateContent(prompt);
    const rawText = result.response.candidates[0].content.parts[0].text;
    const questions = JSON.parse(rawText);
    

    const interview = new Interview({
      userId,
      role,
      level:experience,
      techStack,
      type,
      amount:questionCount,
      questions,
      createdAt: new Date(),
      finalized: false
    });

    await interview.save();
   await interview.save();
res.status(201).json({success: true, message: "Interview questions saved successfully.", questions,interviewId:interview._id});

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Example: add answer to existing interview
module.exports.saved = async (req,res) => {
  
    try {
    const { userId, answer } = req.body;
    if(!userId || !answer){
      res.status(201).json("all field required");
    }
    
    // Find the latest interview of this user that is not finalized
    const interview = await Interview.findOne({ userId, finalized:false}).sort({ createdAt: -1 });
    
    if (!interview) return res.status(404).json({ error: "Interview not found" });

    // Push the answer into the answers array
    interview.answers.push(answer);
    await interview.save();

    res.status(201).json({ success: true, message: "Answer saved" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save answer" });
  }
   
}

module.exports.evalution = async (req,res) =>{
try {
    const { userId, questions, answers, interviewId } = req.body;

    // 🧩 Input validation
    if (!interviewId || !userId || !questions || !answers || questions.length !== answers.length) {
      return res.status(400).json({ error: "Invalid input" });
    }

    // 🔹 Gemini AI model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-001" });

    // 🧠 Prompt
    const prompt = `
You are an interview evaluator. Here are the questions and the user's answers:
${questions.map((q, i) => `Q${i + 1}: ${q}\nA${i + 1}: ${answers[i]}`).join("\n")}

Evaluate each answer from 0 to 10 based on clarity, completeness, relevance, and confidence.
Provide a short feedback for each question.
Also provide an overall score out of 100 and overall feedback.
Return ONLY a pure JSON object like this (no extra text or explanation):

{
  "overall_score": 85,
  "overall_feedback": "Good understanding, but needs more depth.",
  "questions": [
    { "question": "Question text", "answer": "Answer text", "score": 9, "feedback": "Short feedback" }
  ]
}
`;

    // 🔹 Get AI response
    const aiResponse = await model.generateContent(prompt);
    const aiText = aiResponse.response.text();

    // 🧹 Clean AI output
    let cleanText = aiText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .replace(/[\u0000-\u001F]+/g, "")
      .trim();

    const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return res.status(500).json({
        error: "No JSON object found in AI response",
        raw: aiText,
      });
    }

    cleanText = jsonMatch[0]
      .replace(/,\s*}/g, "}")
      .replace(/,\s*]/g, "]");

    // 🧩 Parse JSON
    let evaluation;
    try {
      evaluation = JSON.parse(cleanText);
      console.log("✅ Parsed Evaluation:", evaluation);
    } catch (err) {
      console.error("❌ Still invalid JSON after cleanup:", err);
      return res.status(500).json({
        error: "Invalid AI response format after cleanup",
        raw: cleanText,
      });
    }



    // 🧮 Build questionFeedback array
    const questionFeedback = (evaluation.questions || []).map((item, index) => ({
      question: item.question || questions[index],
      answer: item.answer || answers[index],
      score: item.score || 0,
      feedback: item.feedback || "",
    }));

    // 🔹 Update interview record
    const updatedInterview = await Interview.findByIdAndUpdate(
      interviewId,
      {
        score: evaluation.overall_score,
        feedback: evaluation.overall_feedback,
        questionFeedback: questionFeedback,
        finalized: true,
      },
      { new: true, runValidators: true }
    );

    if (!updatedInterview) {
      return res.status(404).json({ error: "Interview not found" });
    }

    res.status(200).json({
      message: "Interview evaluation updated successfully",
      interview: updatedInterview,
    });

  } catch (err) {
    console.error("🔥 Server Error:", err);
    res.status(500).json({ error: err.message });
  }
}


module.exports.history = async (req,res) =>{
   try {
        const userId = req.query; // assuming you are using JWT auth
        const interviews = await Interview.find({ userId:userId.userId }).sort({ createdAt: -1 });
        res.json(interviews);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports.interview = async (req,res) =>{
   try {
        const interview = await Interview.findById(req.params.id);
        if (!interview) return res.status(404).json({ error: 'Interview not found' });
        res.json(interview);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
