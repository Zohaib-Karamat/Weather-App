export default function Toggle({ label, value, onChange, left = "Metric", right = "Imperial" }) {
  const isMetric = value === "metric";

  return (
    <div className="inline-flex items-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-3 py-2 backdrop-blur-md">
      <span className="text-xs font-semibold uppercase tracking-wider text-white/70">{label}</span>
      <span className="flex rounded-xl bg-black/20 p-0.5" role="group" aria-label={`${label}: ${left} or ${right}`}>
        <button
          type="button"
          onClick={() => onChange("metric")}
          aria-pressed={isMetric}
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
            isMetric ? "bg-white text-slate-900 shadow-sm" : "text-white/70 hover:text-white"
          }`}
        >
          {left}
        </button>
        <button
          type="button"
          onClick={() => onChange("imperial")}
          aria-pressed={!isMetric}
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
            !isMetric ? "bg-white text-slate-900 shadow-sm" : "text-white/70 hover:text-white"
          }`}
        >
          {right}
        </button>
      </span>
    </div>
  );
}
