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
          Technologies I work with
        </motion.p>

        <div className="grid md:grid-cols-2 gap-8">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xl">{skill.icon}</span>
                <span className="text-white font-medium">{skill.name}</span>
                <span className="ml-auto text-sm text-slate-500">
                  {skill.level}%
                </span>
              </div>
              <div className="h-2 bg-deep-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-accent to-cyan rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
