import React from "react";
import { motion } from "motion/react";

const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">

      <div className="text-center space-y-6">
        
        {/* 🔵 Animated AI Orb */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
          className="
            w-16 h-16 mx-auto
            rounded-full
            bg-gradient-to-br from-black via-gray-700 to-black
            shadow-[0_10px_40px_rgba(0,0,0,0.4)]
          "
        />

        {/* ✨ Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xl font-semibold text-gray-800"
        >
          Preparing your AI experience...
        </motion.h2>

        {/* 🔁 Animated dots */}
        <div className="flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -6, 0] }}
              transition={{
                repeat: Infinity,
                duration: 0.8,
                delay: i * 0.2,
              }}
              className="w-2 h-2 bg-black rounded-full"
            />
          ))}
        </div>

        {/* 💬 Subtext */}
        <p className="text-sm text-gray-500">
          Generating something powerful...
        </p>
      </div>
    </div>
  );
};

export default Loader;