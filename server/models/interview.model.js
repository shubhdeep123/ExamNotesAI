import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },

    question: {
      type: String,
      required: true,
    },

    answer: {
      type: String,
      default: "",
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },

    type: {
      type: String,
      enum: ["Conceptual", "Practical", "Coding"],
      required: true,
    },

    // ✅ NEW FIELDS

    keyPoints: {
      type: [String], // array of strings
      default: [],
    },

    example: {
      type: String,
      default: "",
    },

    mistake: {
      type: String,
      default: "",
    },

    explanation: {
      type: String,
      default: "",
    },
  },
  { _id: false },
);

const interviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
    required: true,
  },

  // 🔹 Input
  role: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  topics: {
    type: String,
    required: true,
  },
  includeAnswers: Boolean,
  mixedDifficulty: Boolean,

  // 🔥 Output (IMPORTANT)
  questions: [questionSchema],

  // 📊 Metadata
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const InterviewModel = mongoose.model("InterviewModel", interviewSchema);

export default InterviewModel;
