import {GoogleGenerativeAI} from "@google/generative-ai"


const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);

module.exports.generate = async (req, res) => {

    const {type, role, level, techStack, amount, userid} = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-pro" });

    const prompt = `prepare questions for a job interview.
    The job role is ${role}.
    The job experience level is ${level}.
    The tech stack used in the job is ${techStack}.
    The focus between  behavioral and technical questions should lean towards: ${type}.
    The amount of questions required is ${amount}.
    Please return only qustions, without any additional text.
    The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break voice system.
    Return the questions formatted like this:
    ["Question 1","Question 2", "Question 3", ...]

    Thank you! <3`;

    try{
        const result = await model.generateContent(prompt);
        const text = result.response.text;
         res.json({ success: true, text });
    }catch(error){
        res.status(500).json({ success: false, error: error.message });
    }
}