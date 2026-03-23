import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import Toggle from "./Toggle";
import { useDispatch } from "react-redux";
import { updateCredits } from "../redux/userSlice";

const DynamicForm = ({
  config,
  onSubmit,
  setResult,
  setLoading,
  loading,
  setError,
}) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState("");

  // Initialize fields
  useEffect(() => {
    const initialData = {};

    config.fields.forEach((f) => (initialData[f.name] = ""));
    config.toggles?.forEach((t) => (initialData[t.name] = false));

    setFormData(initialData);
  }, [config]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData[config.fields[0].name]?.trim()) {
      setError("Please fill required field");
      return;
    }

    setError("");
    setLoading(true);
    setResult(null);
    setFormData({});

    try {
      const result = await onSubmit(formData);

      setResult(result.data);
      setLoading(false);

      if (typeof result.creditsLeft === "number") {
        dispatch(updateCredits(result.creditsLeft));
      }
    } catch (err) {
      setError("Something went wrong");
      setLoading(false);
    }
  };

  // Progress logic (unchanged)
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
        bg-gradient-to-br from-black/90 via-black/80 to-black/90
        backdrop-blur-2xl
        border border-white/10
        shadow-[0_25px_60px_rgba(0,0,0,0.75)]
        p-8
        space-y-6
        text-white
      "
    >
      {/* Dynamic Inputs */}
      {config.fields.map((field) => (
        <input
          key={field.name}
          type="text"
          value={formData[field.name] || ""}
          onChange={(e) => handleChange(field.name, e.target.value)}
          placeholder={field.placeholder}
          className="
            w-full p-3 rounded-xl
            bg-white/10 backdrop-blur-lg
            border border-white/20
            placeholder-gray-400 text-white
            focus:outline-none focus:ring-2 focus:ring-white/30
          "
        />
      ))}

      {/* Dynamic Toggles */}
      <div className="flex flex-col md:flex-row gap-6">
        {config.toggles?.map((toggle) => (
          <Toggle
            key={toggle.name}
            label={toggle.label}
            checked={formData[toggle.name] || false}
            onChange={() => handleChange(toggle.name, !formData[toggle.name])}
          />
        ))}
      </div>

      {/* Button */}
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
        {loading ? "Generating..." : config.buttonText}
      </motion.button>

      {/* Progress */}
      {loading && (
        <div className="mt-4 space-y-2">
          <div className="w-full h-2 rounded-full bg-white/20 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut", duration: 0.6 }}
              className="h-full bg-gradient-to-r from-green-400 via-emerald-400 to-green-500"
            />
          </div>

          <div className="flex justify-between text-xs text-gray-300">
            <span>{progressText}</span>
            <span>{progress}%</span>
          </div>

          <p className="text-xs text-gray-400 text-center">
            This may take up to 2-5 minutes. Please don't close or refresh the
            page.
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default DynamicForm;
