import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const over = () => setHovering(true);
    const out = () => setHovering(false);
    document.addEventListener("mousemove", move);
    document.querySelectorAll("a, button, input, textarea, [data-cursor]").forEach((el) => {
      el.addEventListener("mouseenter", over);
      el.addEventListener("mouseleave", out);
    });
    return () => {
      document.removeEventListener("mousemove", move);
      document.querySelectorAll("a, button, input, textarea, [data-cursor]").forEach((el) => {
        el.removeEventListener("mouseenter", over);
        el.removeEventListener("mouseleave", out);
      });
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-accent rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{ x: pos.x - 8, y: pos.y - 8, scale: hovering ? 2.5 : 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-accent/50 rounded-full pointer-events-none z-[9998]"
        animate={{ x: pos.x - 16, y: pos.y - 16, scale: hovering ? 1.5 : 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.8 }}
      />
    </>
  );
}
