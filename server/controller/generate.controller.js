import InterviewModel from "../models/interview.model.js";
import Notes from "../models/notes.model.js";
import UserModel from "../models/user.model.js";
import { generateGeminiResponse } from "../services/gemini.services.js";
import { buildInterviewPrompt, buildNotesPrompt } from "../utils/promptBuilder.js";

export const generateNotes = async (req, res) => {
  try {
    const {
      topic,
      classLevel,
      examType,
      revisionMode = false,
      includeDiagram = false,
      includeChart = false,
    } = req.body;
    if (!topic) {
      return res.status(400).json({ message: "Topic is required" });
    }
    const user = await UserModel.findById(req.userId);
    if (!user) {
      res.status(400).json({ message: "user id not found" });
    }
    if (user.credits < 10) {
      user.isCreditAvailable = false;
      await user.save();
      res.status(403).json({ message: "Insufficient credits" });
    }

    const prompt = buildNotesPrompt({
      topic,
      classLevel,
      examType,
      revisionMode,
      includeDiagram,
      includeChart,
    });

    const aiResponse = await generateGeminiResponse(prompt);

    const notes = await Notes.create({
      user: user._id,
      topic,
      classLevel,
      examType,
      revisionMode,
      includeDiagram,
      includeChart,
      content: aiResponse,
    });

    user.credits -= 10;
    if (user.credits <= 0) user.isCreditAvailable = false;
    if (!Array.isArray(user.notes)) {
      user.notes = [];
    }
    user.notes.push(notes._id);

    await user.save();

    return res.status(200).json({
      data: aiResponse,
      noteId: notes._id,
      creditsLeft: user.credits,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
        error:"AI generation Failed",
        message:error.message
    })
  }
};

export const generateInterviewQuesAns = async (req, res) => {
  try {
    const {
      role,
      experience,
      topics,
      includeAnswers = false,
      mixedDifficulty = false,
    } = req.body;

    if (!topics) {
      return res.status(400).json({message:"Topic is required"});
    }

    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(400).json({message:"User Id Not Found"});
    }

    if (user.credits < 10) {
      user.isCreditAvailable = false;
      await user.save();
      res.status(403).json({message:"Insufficient Credits"});
    }

    const prompt = buildInterviewPrompt({
      role,
      experience,
      topics,
      includeAnswers,
      mixedDifficulty,
    });

    const aiResponse = await generateGeminiResponse(prompt);

    const questions = aiResponse.questions || aiResponse;

    const interview = await InterviewModel.create({
      user: user._id,
      role,
      experience,
      topics,
      includeAnswers,
      mixedDifficulty,
      questions,
      creditsUsed: 10,
    });

    user.credits -= 10;

    if (user.credits <= 0) {
      user.isCreditAvailable = false;
    }

    if (!Array.isArray(user.interview)) {
      user.interview = [];
    }

    user.interview.push(interview._id);

    await user.save();

    return res.status(200).json({
      data: questions,
      interviewId: interview._id,
      creditsLeft: user.credits,
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "AI Generation failed for interview",
      message: error.message,
    });
  }
};
