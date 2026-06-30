import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "../ui/ThemeToggle";

const links = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-deep-900/80 backdrop-blur-lg border-b border-deep-700/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="text-xl font-bold bg-gradient-to-r from-accent to-cyan bg-clip-text text-transparent"
        >
          Portfolio
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {isHome
            ? links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-slate-400 hover:text-accent-light transition-colors"
                >
                  {link.label}
                </a>
              ))
            : links.slice(0, 1).map((link) => (
                <Link
                  key="/"
                  to="/"
                  className="text-sm text-slate-400 hover:text-accent-light transition-colors"
                >
                  Home
                </Link>
              ))}
          <Link
            to="/blog"
            className="text-sm text-slate-400 hover:text-accent-light transition-colors"
          >
            Blog
          </Link>
          {isHome && (
            <a
              href="#contact"
              className="text-sm text-slate-400 hover:text-accent-light transition-colors"
            >
              Contact
            </a>
          )}
          <ThemeToggle />
        </div>

        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            className="text-slate-300 hover:text-accent-light transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-deep-800/95 backdrop-blur-lg border-t border-deep-700/50 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {isHome
                ? links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="text-slate-300 hover:text-accent-light transition-colors"
                    >
                      {link.label}
                    </a>
                  ))
                : null}
              <Link
                to="/blog"
                onClick={() => setOpen(false)}
                className="text-slate-300 hover:text-accent-light transition-colors"
              >
                Blog
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
