import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import FeatureCard  from "../components/ui/FeatureCard";
import { studioFeatures } from "../static/studioFeatures";

const Studio = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-white text-black">
      <Navbar />
      <section className="max-w-6xl mx-auto px-8 py-32 grid grid-cols-1 md:grid-cols-4 gap-10">
        {studioFeatures.map((feature) => (
            <FeatureCard {...feature} key={feature.id} />
        ))}
      </section>
      <Footer />
    </div>
  );
};

export default Studio;
