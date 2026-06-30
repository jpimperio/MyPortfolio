import TextReveal from "./TextReveal";

const levels = {
  about: "01",
  skills: "02",
  experience: "03",
  projects: "04",
  contact: "05",
  blog: "06",
};

export default function SectionHeader({ id, title, accentWord, subtitle }) {
  const accentColor = id === "skills" || id === "contact" ? "text-cyan" : "text-accent";

  return (
    <div className="mb-16 text-center">
      <div className="flex items-center justify-center gap-3 mb-2">
        <span className="text-[10px] font-pixel text-accent tracking-widest">
          LV.{levels[id] || "??"}
        </span>
        <span className="h-px w-8 bg-accent/30" />
        <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
          {id}
        </span>
        <span className="h-px w-8 bg-accent/30" />
        <span className="text-[10px] font-pixel text-cyan tracking-widest">
          {levels[id] || "??"}/05
        </span>
      </div>
      <TextReveal className="text-4xl md:text-5xl font-bold text-white mb-4">
        {title}{" "}
        <span className={accentColor}>{accentWord}</span>
      </TextReveal>
      <p className="text-slate-500 max-w-xl mx-auto font-mono text-sm">
        {'//'} {subtitle}
      </p>
    </div>
  );
}
