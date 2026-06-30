import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Code2, X } from "lucide-react";
import { projects } from "../../data/portfolio";
import AnimatedSection from "../ui/AnimatedSection";
import SectionHeader from "../ui/SectionHeader";
import KeyHint from "../ui/KeyHint";

const filters = ["All", ...new Set(projects.flatMap((p) => p.tags))];

function GlowAura({ hovered }) {
  if (!hovered) return null;
  const rect = hovered.getBoundingClientRect();
  return (
    <div
      className="fixed pointer-events-none z-0"
      style={{
        left: rect.left + rect.width / 2 - 120,
        top: rect.top + rect.height / 2 - 120,
        width: 240,
        height: 240,
        background: "radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)",
        transition: "all 0.3s ease-out",
      }}
    />
  );
}

export default function Projects() {
  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const gridRef = useRef(null);

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.tags.includes(active));

  return (
    <AnimatedSection id="projects" className="py-24 px-6 relative">
      <GlowAura hovered={hoveredCard} />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeader
          id="projects"
          title="My"
          accentWord="Projects"
          subtitle="SELECT A PROJECT TO LEARN MORE"
        />

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                active === f
                  ? "bg-accent text-white shadow-lg shadow-accent/30"
                  : "bg-deep-700 text-slate-400 border border-deep-600 hover:border-accent/50 hover:text-accent-light"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div
          ref={gridRef}
          layout
          className="grid md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.8 }}
                transition={{ duration: 0.4, delay: i * 0.08, type: "spring", stiffness: 200, damping: 20 }}
                onClick={() => setSelected(project)}
                onMouseEnter={(e) => setHoveredCard(e.currentTarget)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group cursor-pointer relative rounded-xl bg-deep-700/50 border border-deep-600 overflow-hidden transition-colors duration-500"
                whileHover={{
                  y: -24,
                  scale: 1.04,
                  borderColor: "rgba(139,92,246,0.6)",
                  boxShadow: "0 20px 60px rgba(139,92,246,0.25), 0 0 40px rgba(6,182,212,0.1)",
                  transition: { type: "spring", stiffness: 300, damping: 15 },
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative h-48 bg-deep-800 flex items-center justify-center overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-accent/20 to-cyan/20"
                    animate={
                      hoveredCard?.dataset?.title === project.title
                        ? { scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }
                        : {}
                    }
                    transition={{ repeat: Infinity, duration: 3 }}
                  />
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <motion.span
                      className="text-5xl opacity-40 group-hover:opacity-70 transition-opacity duration-300"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ repeat: Infinity, duration: 3 }}
                    >
                      📁
                    </motion.span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-700/80 via-transparent to-transparent" />

                  <motion.div
                    className="absolute top-3 right-3"
                    initial={{ opacity: 0, x: 20 }}
                    whileHover={{ opacity: 1, x: 0 }}
                  >
                    <KeyHint action="Select" className="text-accent-light" />
                  </motion.div>
                </div>

                <div className="p-6 relative z-10">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent-light transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-400 mb-4 line-clamp-2 group-hover:text-slate-300 transition-colors duration-300">
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-xs bg-deep-800 text-slate-500 border border-deep-600 group-hover:border-accent/20 transition-colors duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.6, y: 60, rotateX: 20 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                rotateX: 0,
                boxShadow: "0 30px 80px rgba(139,92,246,0.3)",
              }}
              exit={{ opacity: 0, scale: 0.6, y: 60, rotateX: 20 }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-deep-800 border border-accent/30 rounded-2xl max-w-lg w-full p-8 relative"
              style={{ perspective: 800 }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 via-transparent to-cyan/5 pointer-events-none" />

              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-20"
              >
                <X size={20} />
              </button>

              <div className="relative h-48 rounded-xl bg-deep-900 flex items-center justify-center mb-6 overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-accent/30 to-cyan/30"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                />
                {selected.image ? (
                  <img
                    src={selected.image}
                    alt={selected.title}
                    className="w-full h-full object-cover rounded-xl relative z-10"
                  />
                ) : (
                  <motion.span
                    className="text-6xl relative z-10"
                    animate={{ y: [0, -6, 0], rotate: [0, 2, 0, -2, 0] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                  >
                    📁
                  </motion.span>
                )}
              </div>

              <h3 className="text-2xl font-bold text-white mb-3 relative z-10">
                {selected.title}
              </h3>
              <p className="text-slate-400 mb-6 relative z-10">{selected.desc}</p>
              <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                {selected.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs bg-deep-700 text-slate-400 border border-deep-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 relative z-10">
                <a
                  href={selected.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-accent to-cyan text-white text-sm font-medium hover:shadow-lg hover:shadow-accent/30 transition-all duration-300"
                >
                  <ExternalLink size={16} /> Live Demo
                </a>
                <a
                  href={selected.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2 rounded-lg border border-deep-600 text-slate-300 text-sm font-medium hover:border-accent/50 hover:text-accent-light transition-all duration-300"
                >
                  <Code2 size={16} /> Source
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatedSection>
  );
}
