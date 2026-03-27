import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

// This component takes full interview data (array of questions)
// and renders a beautiful interactive UI (no markdown needed)

const InterviewResult = ({ data = [] }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!data.length) {
    return (
      <div className="text-center text-gray-400 py-10">
        No interview data available
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {data.map((q, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] overflow-hidden"
        >
          {/* Question Header */}
          <div
            onClick={() => toggle(index)}
            className="cursor-pointer px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition"
          >
            <h3 className="font-semibold text-lg">
              {index + 1}. {q.question}
            </h3>

            <div className="flex items-center gap-3">
              {q.difficulty && (
                <span className="text-xs px-2 py-1 bg-gray-200 rounded">
                  {q.difficulty}
                </span>
              )}

              <span className="text-xl">
                {openIndex === index ? "−" : "+"}
              </span>
            </div>
          </div>

          {/* Answer Section */}
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="px-6 pb-6"
              >
                {/* Answer */}
                {q.answer && (
                  <div className="mb-4">
                    <h4 className="font-semibold mb-1 text-purple-600">
                      🧠 Answer
                    </h4>
                    <p className="text-gray-700 leading-7">
                      {q.answer}
                    </p>
                  </div>
                )}

                {/* Key Points */}
                {q.keyPoints && (
                  <div className="mb-4">
                    <h4 className="font-semibold mb-1 text-blue-600">
                      📌 Key Points
                    </h4>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                      {q.keyPoints.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Example */}
                {q.example && (
                  <div className="mb-4">
                    <h4 className="font-semibold mb-1 text-green-600">
                      🚀 Example
                    </h4>
                    <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm">
                      <code>{q.example}</code>
                    </pre>
                  </div>
                )}

                {/* Mistake */}
                {q.mistake && (
                  <div>
                    <h4 className="font-semibold mb-1 text-red-600">
                      ⚠️ Common Mistake
                    </h4>
                    <p className="text-gray-700">
                      {q.mistake}
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

export default InterviewResult;
