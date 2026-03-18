import React, { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import DynamicForm from "../components/DynamicForm";
import { interviewConfig } from "../static/configs/interviewConfig";
import { generateInterview } from "../services/api";

const Interview = () => {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const credits = userData?.credits;

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 px-6 py-8">

      {/* Header */}
      <motion.header
        initial={{ y: -15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="
          mb-10 rounded-2xl bg-black/80 backdrop-blur-xl
          border border-white/10 px-8 py-6
          shadow-[0_20px_45px_rgba(0,0,0,0.6)]
          flex justify-between flex-col md:flex-row gap-4
        "
      >
        <div onClick={() => navigate("/")} className="cursor-pointer">
          <h1 className="text-2xl font-bold bg-linear-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
            Interview Prep
          </h1>
          <p className="text-sm text-gray-300 mt-1">
            Practice smarter with AI
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/pricing")}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white"
          >
            💎 {credits} ➕
          </button>
        </div>
      </motion.header>

      {/* 🔹 Form */}
      <motion.div className="mb-12">
        <DynamicForm
          config={interviewConfig}
          onSubmit={generateInterview}
          loading={loading}
          setLoading={setLoading}
          setResult={setResult}
          setError={setError}
        />
      </motion.div>

      {/* 🔹 Loading */}
      {loading && (
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
          className="text-center text-black font-medium mb-6"
        >
          Generating interview questions...
        </motion.div>
      )}

      {/* 🔹 Error */}
      {error && (
        <div className="mb-6 text-center text-red-600 font-medium">
          {error}
        </div>
      )}

      {/* 🔹 Empty State */}
      {!result && !loading && (
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="
            h-64 rounded-2xl flex flex-col items-center justify-center
            bg-white/60 backdrop-blur-lg border border-dashed border-gray-300
            text-gray-500 shadow-inner
          "
        >
          <span className="text-4xl mb-3">🎯</span>
          <p className="text-sm">
            Your interview questions will appear here
          </p>
        </motion.div>
      )}

      {/* 🔥 Result Section */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid gap-6"
        >
          {result.questions?.map((q, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.1)]"
            >
              <h3 className="font-semibold text-lg mb-2">
                {index + 1}. {q.question}
              </h3>

              {q.answer && (
                <p className="text-gray-700 mb-2">
                  💬 {q.answer}
                </p>
              )}

              <span className="text-xs px-2 py-1 bg-gray-200 rounded">
                {q.difficulty}
              </span>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Interview;