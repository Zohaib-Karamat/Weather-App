import { useMemo } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastList from "./components/ForecastList";
import Loader from "./components/Loader";
import ErrorBanner from "./components/ErrorBanner";
import Toggle from "./components/Toggle";
import { useWeather } from "./hooks/useWeather";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { pickBackground } from "./utils/backgrounds";
import { FORECAST_DAYS } from "./services/weatherApi";

function App() {
  const [recent, setRecent] = useLocalStorage("recent-cities", []);
  const { city, data, status, error, load, loadByCoords, units } = useWeather("metric");

  const background = useMemo(() => {
    const code = data.current?.conditionCode ?? 1000;
    const isDay = data.current?.isDay ?? true;
    return pickBackground(code, isDay);
  }, [data]);

  const handleSearch = (cityName) => {
    load(cityName, units);
    setRecent((prev) => Array.from(new Set([cityName, ...prev])).slice(0, 5));
  };

  const handleGeo = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => loadByCoords(coords.latitude, coords.longitude, units),
      () => alert("Unable to get location")
    );
  };

  const forecastDays = useMemo(() => data.forecast?.days ?? [], [data.forecast]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat transition-[opacity,filter] duration-700 ease-out"
        style={
          background.imageUrl ? { backgroundImage: `url(${background.imageUrl})` } : undefined
        }
        aria-hidden="true"
      />
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br transition-opacity duration-700 ease-out ${
          background.imageUrl ? "opacity-[0.78]" : "opacity-100"
        } ${background.gradient}`}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-10%,rgba(255,255,255,0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-slate-900/25" />
      <div className="pointer-events-none absolute -top-32 right-0 h-[28rem] w-[28rem] rounded-full bg-sky-400/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-24 h-[24rem] w-[24rem] rounded-full bg-blue-600/10 blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 sm:py-12 lg:gap-10">
        <header className="flex animate-fade-up flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-white/90 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
              Live
            </div>
            <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
              SkyCast
            </h1>
            <p className="max-w-md text-base text-white/75 text-balance-safe">
              Conditions, forecasts, and clarity — tuned for quick glances on any screen.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 md:justify-end">
            <Toggle label="Units" value={units} onChange={(next) => load(city, next)} />
            <button
              type="button"
              onClick={handleGeo}
              className="inline-flex items-center gap-2 rounded-2xl border border-white/25 bg-white/15 px-4 py-3 text-sm font-semibold text-white shadow-lift backdrop-blur-md transition hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
            >
              <svg className="h-4 w-4 opacity-90" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 21c3.5 0 6.5-2 8-5a9 9 0 10-16 0c1.5 3 4.5 5 8 5z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="11" r="3" stroke="currentColor" strokeWidth="1.6" />
              </svg>
              My location
            </button>
          </div>
        </header>

        <div className="animate-fade-up [animation-delay:80ms]">
          <SearchBar onSearch={handleSearch} recent={recent} />
        </div>

        {status === "loading" && (
          <div className="flex flex-1 flex-col items-center justify-center py-16">
            <Loader />
            <p className="mt-4 text-sm font-medium text-white/70">Fetching the latest outlook…</p>
          </div>
        )}

        {status === "error" && <ErrorBanner message={error} />}

        {status === "success" && data.current && (
          <div className="flex flex-col gap-8 pb-10">
            <section className="animate-fade-up [animation-delay:120ms]">
              <WeatherCard data={data.current} units={units} />
            </section>

            {forecastDays.length > 0 && (
              <section className="animate-fade-up glass-panel p-6 sm:p-8 [animation-delay:180ms]">
                <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-white">Daily forecast</h2>
                    <p className="text-sm text-white/65">
                      Next {FORECAST_DAYS} days · highs, lows, and rain chance
                    </p>
                  </div>
                </div>
                <ForecastList items={forecastDays} units={units} />
              </section>
            )}
          </div>
        )}

        <footer className="mt-auto border-t border-white/10 pt-8 text-center text-xs text-white/50">
          <a
            href="https://www.weatherapi.com/"
            target="_blank"
            rel="noreferrer noopener"
            className="font-medium text-white/70 underline decoration-white/30 underline-offset-2 transition hover:text-white"
          >
            Weather data by WeatherAPI.com
          </a>
        </footer>
      </div>
    </div>
  );
}

export default App;
