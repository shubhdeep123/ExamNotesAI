import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Feature  from "../components/Feature";
import { studioFeatures } from "../static/studioFeatures";

const Studio = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-white text-black">
      <Navbar />
      <section className="max-w-6xl mx-auto px-8 py-32 grid grid-cols-1 md:grid-cols-4 gap-10">
        {studioFeatures.map((feature) => (
            <Feature {...feature} key={feature.id} />
        ))}
      </section>
      <Footer />
    </div>
  );
};

export default Studio;
