import { useEffect, useRef, useCallback } from "react";

const TRAIL_LENGTH = 12;
const SPACING = 20;

export default function CursorTrail() {
  const dotsRef = useRef([]);
  const posRef = useRef({ x: -200, y: -200 });
  const rafRef = useRef();

  const update = useCallback(() => {
    const dots = dotsRef.current;
    let { x, y } = posRef.current;
    for (let i = dots.length - 1; i >= 0; i--) {
      const prev = dots[i - 1] || posRef.current;
      const dot = dots[i];
      if (!dot) continue;
      dot.style.left = prev.x - 3 + "px";
      dot.style.top = prev.y - 3 + "px";
      const dx = parseFloat(dot.style.left) - x;
      const dy = parseFloat(dot.style.top) - y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > SPACING) {
        x += (dx / dist) * (dist - SPACING);
        y += (dy / dist) * (dist - SPACING);
      }
    }
    rafRef.current = requestAnimationFrame(update);
  }, []);

  useEffect(() => {
    const dots = [];
    for (let i = 0; i < TRAIL_LENGTH; i++) {
      const dot = document.createElement("div");
      Object.assign(dot.style, {
        position: "fixed",
        width: "4px",
        height: "4px",
        borderRadius: "50%",
        background: i < 3 ? "rgba(139,92,246,0.6)" : "rgba(6,182,212,0.3)",
        pointerEvents: "none",
        zIndex: "9997",
        transition: "opacity 0.3s",
        opacity: 1 - i / TRAIL_LENGTH,
      });
      document.body.appendChild(dot);
      dots.push(dot);
    }
    dotsRef.current = dots;

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };
    document.addEventListener("mousemove", onMove);
    rafRef.current = requestAnimationFrame(update);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
      dots.forEach((d) => d.remove());
    };
  }, [update]);

  return null;
}
