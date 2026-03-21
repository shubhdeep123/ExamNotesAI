import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    id: Number,
    question: String,
    answer: String,
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
    },
    type: {
      type: String,
      enum: ["Conceptual", "Practical", "Coding"],
    },
  },
  { _id: false }
);

const interviewSchema = new mongoose.Schema(
  {
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
  }
);

const InterviewModel = mongoose.model("InterviewModel", interviewSchema);

export default InterviewModel;