import { Suspense, lazy, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { personalInfo } from "../../data/portfolio";
import Magnetic from "../ui/Magnetic";

const Scene3D = lazy(() => import("../three/Scene3D"));
import TextReveal from "../ui/TextReveal";

const words = ["Developer", "Designer", "Creator", "Dreamer"];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-deep-900" />}>
          <Scene3D />
        </Suspense>
      </div>

      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-deep-900/30 via-transparent to-deep-900" />

      <div
        className="absolute inset-0 z-[1] opacity-30"
        style={{
          background: "linear-gradient(135deg, #8b5cf6, #06b6d4, #a78bfa, #22d3ee)",
          backgroundSize: "400% 400%",
          animation: "gradient-shift 8s ease infinite",
          maskImage: "linear-gradient(to bottom, transparent 20%, black 60%, transparent 80%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 20%, black 60%, transparent 80%)",
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-accent-light font-medium mb-4 tracking-wider uppercase text-sm"
        >
          Welcome to my portfolio
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight"
        >
          Hi, I'm{" "}
          <span className="bg-gradient-to-r from-accent to-cyan bg-clip-text text-transparent">
            {personalInfo.name}
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-2xl md:text-3xl text-slate-400 mb-8 h-10"
        >
          I'm a{" "}
          <span className="text-white font-semibold">
            {words[index]}
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-slate-400 max-w-xl mx-auto mb-10 text-lg"
        >
          {personalInfo.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex items-center justify-center gap-4"
        >
          <Magnetic>
            <a
              href="#projects"
              className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-accent to-cyan text-white font-medium hover:shadow-lg hover:shadow-accent/25 transition-all duration-300"
              style={{ animation: "pulse-glow 3s ease-in-out infinite" }}
            >
              View My Work
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contact"
              className="inline-block px-8 py-3 rounded-full border border-deep-600 text-slate-300 hover:border-accent/50 hover:text-accent-light transition-all duration-300"
            >
              Get in Touch
            </a>
          </Magnetic>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-slate-500 hover:text-accent-light transition-colors"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown size={28} />
        </motion.div>
      </motion.a>
    </section>
  );
}
