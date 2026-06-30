import { motion } from "framer-motion";
import { experience } from "../../data/portfolio";
import AnimatedSection from "../ui/AnimatedSection";
import TextReveal from "../ui/TextReveal";

export default function Experience() {
  return (
    <AnimatedSection id="experience" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <TextReveal className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
          My <span className="text-accent">Journey</span>
        </TextReveal>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-center max-w-xl mx-auto mb-16"
        >
          Where I've worked and what I've done
        </motion.p>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-cyan to-deep-700 -translate-x-1/2" />

          {experience.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ scale: 1.02 }}
              className={`relative flex flex-col md:flex-row gap-6 mb-12 p-4 rounded-xl transition-colors duration-300 hover:bg-deep-700/20 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
              data-cursor
            >
              <div className="hidden md:block flex-1" />
              <div className="absolute left-4 md:left-1/2 w-4 h-4 -translate-x-1/2 bg-accent rounded-full border-4 border-deep-900 z-10 top-5"
                style={{ animation: "pulse-glow 2s ease-in-out infinite" }}
              />
              <div className={`flex-1 pl-10 md:pl-0 ${i % 2 === 0 ? "md:text-right md:pr-10" : "md:pl-10"}`}>
                <span className="text-xs text-accent-light font-medium tracking-wider uppercase">
                  {item.period}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  {item.role}
                </h3>
                <p className="text-cyan font-medium text-sm">{item.company}</p>
                <p className="text-slate-400 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
