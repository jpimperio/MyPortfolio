import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function GameHUD() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [level, setLevel] = useState(1);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      setLevel(Math.min(Math.floor(v * 6) + 1, 6));
    });
  }, [scrollYProgress]);

  return (
    <motion.div
      initial={{ x: -80 }}
      animate={{ x: 0 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 100, damping: 20 }}
      className="fixed bottom-6 left-6 z-[9990] hidden md:block"
    >
      <div className="bg-deep-900/80 backdrop-blur-sm border border-deep-600 rounded-lg p-3 min-w-[140px] font-mono text-xs">
        <div className="flex items-center gap-2 mb-2 text-accent-light">
          <span className="text-[10px] font-pixel">LV.{String(level).padStart(2, "0")}</span>
          <span className="text-slate-500 text-[10px]">// PORTFOLIO</span>
        </div>

        <div className="mb-1.5">
          <div className="flex justify-between text-[10px] mb-0.5">
            <span className="text-green-400">HP</span>
            <span className="text-slate-500">
              {100 - Math.floor(progress.get() * 100)}%
            </span>
          </div>
          <div className="h-1.5 bg-deep-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full"
              style={{ scaleX: progress, transformOrigin: "left" }}
            />
          </div>
        </div>

        <div className="mb-1.5">
          <div className="flex justify-between text-[10px] mb-0.5">
            <span className="text-cyan-400">XP</span>
            <span className="text-slate-500">
              {Math.floor(progress.get() * 100)}%
            </span>
          </div>
          <div className="h-1.5 bg-deep-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 to-accent rounded-full"
              style={{ scaleX: progress, transformOrigin: "left" }}
            />
          </div>
        </div>

        <div className="text-[10px] text-slate-600 font-pixel mt-1 tracking-tight">
          SCROLL TO NAVIGATE
        </div>
      </div>
    </motion.div>
  );
}
