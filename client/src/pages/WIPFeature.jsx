import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useNavigate } from "react-router-dom";

const WIPFeature = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <Navbar />

      <div className="flex flex-1 items-center justify-center px-6 mt-5">
        <div className="text-center max-w-xl">
          {/* Icon */}
          <div className="text-6xl mb-6 animate-bounce">🚧</div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            This FeatureCard is Cooking 🍳
          </h1>

          {/* Subtitle */}
          <p className="text-gray-600 text-lg mb-6">
            We're working hard to bring this feature to life. It’s going to be
            worth the wait — fast, smart, and powerful.
          </p>

          {/* Highlight box */}
          <div className="bg-gray-100 rounded-2xl p-5 mb-6">
            <p className="text-sm text-gray-700">
              💡 <span className="font-medium">Sneak peek:</span>
              This feature will help you learn faster and save hours of effort.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => window.history.back()}
              className="px-6 py-2 rounded-xl bg-black text-white hover:opacity-90 transition"
            >
              Go Back
            </button>

            <button
              onClick={() => navigate("/studio")}
              className="px-6 py-2 rounded-xl border border-black hover:bg-black hover:text-white transition"
            >
              Explore Other Features
            </button>
          </div>

          {/* Footer note */}
          <p className="text-xs text-gray-400 mt-6">
            🚀 New features dropping soon on ExamNotes AI
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WIPFeature;
