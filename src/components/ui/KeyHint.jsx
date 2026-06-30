export default function KeyHint({ action = "Select", className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[10px] font-pixel text-slate-500 ${className}`}
    >
      <span className="border border-slate-600 rounded px-1.5 py-0.5 text-[9px] text-slate-400">
        E
      </span>
      {action}
    </span>
  );
}
