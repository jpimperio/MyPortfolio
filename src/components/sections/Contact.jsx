import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, Mail, MapPin, Phone } from "lucide-react";
import AnimatedSection from "../ui/AnimatedSection";
import { personalInfo } from "../../data/portfolio";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 1500));
    alert("Message sent! (demo)");
    reset();
  };

  return (
    <AnimatedSection id="contact" className="py-24 px-6 bg-deep-800/50">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-white mb-4 text-center"
        >
          Get in <span className="text-cyan">Touch</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-center max-w-xl mx-auto mb-16"
        >
          Have a project in mind? Let's build something great together
        </motion.p>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent-light">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-sm text-slate-500">Email</p>
                <p className="text-white">{personalInfo.social.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-cyan/10 border border-cyan/20 flex items-center justify-center text-cyan-light">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-sm text-slate-500">Location</p>
                <p className="text-white">Remote / Worldwide</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent-light">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-sm text-slate-500">Phone</p>
                <p className="text-white">Available on request</p>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
            <div>
              <input
                {...register("name")}
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-lg bg-deep-700 border border-deep-600 text-white placeholder:text-slate-500 focus:outline-none focus:border-accent/50 transition-colors"
              />
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <input
                {...register("email")}
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-lg bg-deep-700 border border-deep-600 text-white placeholder:text-slate-500 focus:outline-none focus:border-accent/50 transition-colors"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <textarea
                {...register("message")}
                rows={5}
                placeholder="Your Message"
                className="w-full px-4 py-3 rounded-lg bg-deep-700 border border-deep-600 text-white placeholder:text-slate-500 focus:outline-none focus:border-accent/50 transition-colors resize-none"
              />
              {errors.message && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-accent to-cyan text-white font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-accent/25 transition-all duration-300 disabled:opacity-50"
            >
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <Send size={18} />
                </motion.div>
              ) : (
                <>
                  <Send size={18} /> Send Message
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </AnimatedSection>
  );
}
