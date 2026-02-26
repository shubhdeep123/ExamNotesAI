import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import Toggle from "./Toggle";
import { generateNotes } from "../services/api";
import { useDispatch } from "react-redux";
import { updateCredits } from "../redux/userSlice";

const TopicForm = ({ setResult, setLoading, loading, setError }) => {
  const [topic, setTopic] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [examType, setExamType] = useState("");
  const [revisonMode, setRevisionMode] = useState(false);
  const [includeDiagram, setIncludeDiagram] = useState(false);
  const [includeChart, setIncludeChart] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState("");
  const dispatch = useDispatch()
  const handleSubmit = async () => {
    if (!topic.trim()) {
      setError("Please enter the topic");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);
    try {
      const result = await generateNotes({
        topic,
        classLevel,
        examType,
        revisonMode,
        includeDiagram,
        includeChart,
      });
      setResult(result.data);
      setLoading(false);
      setTopic("")
      setClassLevel("")
      setExamType("")
      setRevisionMode(false);
      setIncludeChart(false);
      setIncludeDiagram(false);

      if (typeof result.creditsLeft == "number") {
        dispatch(updateCredits(result.creditsLeft))
      }
    } catch (error) {
      setError("Faild to fetch notes from server");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading) {
      setProgress(0);
      setProgressText("");
      return;
    }
    let value = 0;

    const interval = setInterval(() => {
      value += Math.random() * 8;

      if (value >= 95) {
        value = 95;
        setProgressText("Almost done…");
        clearInterval(interval);
      } else if (value > 70) {
        setProgressText("Finalizing notes…");
      } else if (value > 40) {
        setProgressText("Processing content…");
      } else {
        setProgressText("Generating notes…");
      }

      setProgress(Math.floor(value));
    }, 700);

    return () => clearInterval(interval);
  }, [loading]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        rounded-2xl
        bg-gradient-to-br  from-black/90 via-black/80 to-black/90
        backdrop-blur-2xl
        border border-white/10
        shadow-[0_25px_60px_rgba(0,0,0,0.75)]
        p-8
        space-y-6
        text-white
      "
    >
      <input
        type="text"
        onChange={(e) => setTopic(e.target.value)}
        value={topic}
        className="w-full p-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
        placeholder="Enter Topic (e.g Web Development)"
      />
      <input
        type="text"
        onChange={(e) => setClassLevel(e.target.value)}
        value={classLevel}
        className="w-full p-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
        placeholder="Enter Class / Level (e.g 12th Grade)"
      />

      <input
        type="text"
        onChange={(e) => setExamType(e.target.value)}
        value={examType}
        className="w-full p-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
        placeholder="Enter Exam Type (e.g JEE Advanced)"
      />

      <div className="flex flex-col md:flex-row gap-6">
        <Toggle
          label="Revision Mode"
          checked={revisonMode}
          onChange={() => setRevisionMode(!revisonMode)}
        />
        <Toggle
          label="Include Diagram"
          checked={includeDiagram}
          onChange={() => setIncludeDiagram(!includeDiagram)}
        />
        <Toggle
          label="Include Chart"
          checked={includeChart}
          onChange={() => setIncludeChart(!includeChart)}
        />
      </div>
      <motion.button
        onClick={handleSubmit}
        whileHover={!loading ? { scale: 1.02 } : {}}
        whileTap={!loading ? { scale: 0.9 } : {}}
        disabled={loading}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        className={`
    w-full mt-4
    py-3 rounded-xl
    font-semibold
    flex items-center justify-center gap-3
    transition
    ${
      loading
        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
        : "bg-gradient-to-br from-white to-gray-200 text-black shadow-[0_15px_35px_rgba(0,0,0,0.4)]"
    }
  `}
      >
        {loading ? "Generating Notes..." : "Generate Notes"}
      </motion.button>
      {loading && 
        <div className="mt-4 space-y-2">
          <div className="w-full h-2 rounded-full bg-white/20 overflow-hidden">
          <motion.div
          initial={{width:0}}
          animate={{width:`${progress}%`}}
          transition={{ease:"easeOut", duration:0.6}}
          className="h-full bg-gradient-to-r from-green-400 via-emerald-400 to-green-500">

          </motion.div>
          </div>
          <div className="flex justify-between text-xs text-gray-300">
            <span>{progressText}</span>
            <span>{progress}%</span>
          </div>
          <p className="text-xs text-gray-400 text-center">
            This may take up to 2-5 minutes. Please don't close or refresh the page.
          </p>
        </div>
      }
    </motion.div>

  );
};

export default TopicForm;
