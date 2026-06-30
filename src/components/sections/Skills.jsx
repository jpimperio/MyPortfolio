import { motion } from "framer-motion";
import { skills } from "../../data/portfolio";
import AnimatedSection from "../ui/AnimatedSection";
import TextReveal from "../ui/TextReveal";

export default function Skills() {
  return (
    <AnimatedSection id="skills" className="py-24 px-6 bg-deep-800/50">
      <div className="max-w-6xl mx-auto">
        <TextReveal className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
          My <span className="text-cyan">Skills</span>
        </TextReveal>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-center max-w-xl mx-auto mb-16"
        >
          Technologies I wield
        </motion.p>

        <div className="grid md:grid-cols-2 gap-6">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 200, damping: 20 }}
              whileHover={{
                y: -12,
                scale: 1.03,
                borderColor: "rgba(6,182,212,0.5)",
                boxShadow: "0 16px 48px rgba(6,182,212,0.15)",
                transition: { type: "spring", stiffness: 300, damping: 15 },
              }}
              className="group relative p-5 rounded-xl bg-deep-700/30 border border-deep-600 cursor-default overflow-hidden"
              data-cursor
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex items-center gap-4 mb-3 relative z-10">
                <motion.span
                  className="text-2xl"
                  whileHover={{ scale: 1.3, rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  {skill.icon}
                </motion.span>
                <span className="text-white font-semibold group-hover:text-cyan-light transition-colors duration-300">
                  {skill.name}
                </span>
                <span className="ml-auto text-sm text-slate-500 group-hover:text-cyan-light/60 transition-colors duration-300 font-mono">
                  {skill.level}%
                </span>
              </div>

              <div className="relative h-3 bg-deep-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-accent via-cyan to-accent rounded-full relative"
                  style={{ backgroundSize: "200% 100%" }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full"
                  initial={{ opacity: 0 }}
                  whileHover={{
                    opacity: 1,
                    boxShadow: "inset 0 0 12px rgba(6,182,212,0.4)",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
