const { GoogleGenerativeAI } = require("@google/generative-ai");
const Interview = require("../module/interview");

require("dotenv").config(); // Make sure this is called before accessing process.env

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);

module.exports.generate = async (req, res) => {
  console.log(req.body.formData)
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
      finalized: true
    });

    await interview.save();
   await interview.save();
res.status(201).json({success: true, message: "Interview questions saved successfully.", questions});

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};
