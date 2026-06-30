export default function GlitchText({ children, as: Tag = "span", className }) {
  return (
    <Tag
      className={`relative inline-block ${className}`}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.animation = "none";
        void el.offsetHeight;
        el.style.animation = "glitch-1 0.3s ease";
      }}
    >
      {children}
    </Tag>
  );
}
