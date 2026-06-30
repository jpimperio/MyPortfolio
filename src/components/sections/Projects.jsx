import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Code2, X } from "lucide-react";
import { projects } from "../../data/portfolio";
import AnimatedSection from "../ui/AnimatedSection";
import TextReveal from "../ui/TextReveal";

const filters = ["All", ...new Set(projects.flatMap((p) => p.tags))];

export default function Projects() {
  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState(null);

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.tags.includes(active));

  return (
    <AnimatedSection id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <TextReveal className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
          My <span className="text-accent">Projects</span>
        </TextReveal>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-center max-w-xl mx-auto mb-8"
        >
          Some things I've built
        </motion.p>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-4 py-1.5 rounded-full text-sm transition-all duration-300 ${
                active === f
                  ? "bg-accent text-white"
                  : "bg-deep-700 text-slate-400 border border-deep-600 hover:border-accent/50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div layout className="grid md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                onClick={() => setSelected(project)}
                className="group cursor-pointer relative rounded-xl bg-deep-700/50 border border-deep-600 overflow-hidden hover:border-accent/30 transition-all duration-500"
                style={{ transformStyle: "preserve-3d" }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = (e.clientX - rect.left) / rect.width - 0.5;
                  const y = (e.clientY - rect.top) / rect.height - 0.5;
                  e.currentTarget.style.transform = `perspective(600px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    "perspective(600px) rotateY(0deg) rotateX(0deg)";
                }}
              >
                <div className="h-48 bg-gradient-to-br from-accent/10 to-cyan/10 flex items-center justify-center">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-5xl opacity-30">📁</span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent-light transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-xs bg-deep-800 text-slate-500"
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
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-deep-800 border border-deep-600 rounded-2xl max-w-lg w-full p-8 relative"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
              <div className="h-48 rounded-xl bg-gradient-to-br from-accent/10 to-cyan/10 flex items-center justify-center mb-6">
                {selected.image ? (
                  <img
                    src={selected.image}
                    alt={selected.title}
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <span className="text-5xl opacity-30">📁</span>
                )}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                {selected.title}
              </h3>
              <p className="text-slate-400 mb-6">{selected.desc}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {selected.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs bg-deep-700 text-slate-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <a
                  href={selected.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-accent to-cyan text-white text-sm font-medium"
                >
                  <ExternalLink size={16} /> Live Demo
                </a>
                <a
                  href={selected.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2 rounded-lg border border-deep-600 text-slate-300 text-sm font-medium hover:border-accent/50 transition-colors"
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
