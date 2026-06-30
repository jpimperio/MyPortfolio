import { Code2, Globe, Mail } from "lucide-react";
import { personalInfo } from "../../data/portfolio";

const iconMap = {
  github: Code2,
  linkedin: Globe,
  email: Mail,
};

export default function Footer() {
  return (
    <footer className="border-t border-deep-700/50 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-500">
          &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          {Object.entries(personalInfo.social).map(([key, url]) => {
            const Icon = iconMap[key];
            if (!Icon) return null;
            return (
              <a
                key={key}
                href={key === "email" ? `mailto:${url}` : url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-accent-light transition-colors"
                aria-label={key}
              >
                <Icon size={18} />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
