import { motion } from "framer-motion";
import { personalInfo } from "../../data/portfolio";
import AnimatedSection from "../ui/AnimatedSection";
import TextReveal from "../ui/TextReveal";

export default function About() {
  return (
    <AnimatedSection id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <TextReveal className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
          About <span className="text-accent">Me</span>
        </TextReveal>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-center max-w-xl mx-auto mb-16"
        >
          Get to know me a little better
        </motion.p>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="w-72 h-72 md:w-80 md:h-80 mx-auto rounded-2xl bg-gradient-to-br from-accent/20 to-cyan/20 border border-deep-600 flex items-center justify-center overflow-hidden">
              {personalInfo.avatar ? (
                <img
                  src={personalInfo.avatar}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-7xl">👨‍💻</span>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              {personalInfo.name}
            </h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              {personalInfo.bio}
            </p>
            <div className="flex flex-wrap gap-3">
              {["React", "Node.js", "TypeScript", "Tailwind CSS"].map(
                (skill) => (
                  <span
                    key={skill}
                    className="px-4 py-1.5 rounded-full text-sm bg-deep-700 border border-deep-600 text-slate-300"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
            {personalInfo.resumeUrl !== "#" && (
              <a
                href={personalInfo.resumeUrl}
                className="mt-8 inline-block px-6 py-3 rounded-full bg-gradient-to-r from-accent to-cyan text-white font-medium hover:shadow-lg hover:shadow-accent/25 transition-all duration-300"
              >
                Download Resume
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
