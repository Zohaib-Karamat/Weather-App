export default function SearchBar({ onSearch, recent = [] }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const city = formData.get("city")?.trim();
    if (city) onSearch(city);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <label className="relative flex flex-1 items-center">
          <span className="pointer-events-none absolute left-4 text-white/50">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M10.5 18a7.5 7.5 0 110-15 7.5 7.5 0 010 15zM16.5 16.5L21 21"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <input
            name="city"
            autoComplete="off"
            placeholder="Search city or region…"
            className="w-full rounded-2xl border border-white/25 bg-white/15 py-3.5 pl-12 pr-4 text-[15px] font-medium text-white placeholder:text-white/45 shadow-inner backdrop-blur-md transition focus:border-white/40 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-sky-400/50"
          />
        </label>
        <button
          type="submit"
          className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 shadow-lift transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:min-w-[8.5rem]"
        >
          Search
          <svg
            className="h-4 w-4 transition group-hover:translate-x-0.5"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path d="M5 12h12M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {recent.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">Recent</p>
          <div className="flex flex-wrap gap-2">
            {recent.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => onSearch(c)}
                className="rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-sm font-medium text-white/90 backdrop-blur-md transition hover:border-white/35 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50"
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}
    </form>
  );
}
