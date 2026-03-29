import { formatLocalDateTime, formatTemp, formatWindSpeed } from "../utils/formatters";

function Stat({ icon, label, value, hint }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/60 px-4 py-3 shadow-sm backdrop-blur-sm">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900/[0.06] text-slate-700">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">{label}</p>
        <p className="truncate text-sm font-semibold text-slate-900">{value}</p>
        {hint ? <p className="truncate text-xs text-slate-500">{hint}</p> : null}
      </div>
    </div>
  );
}

export default function WeatherCard({ data, units }) {
  const {
    locationName,
    region,
    country,
    tzId,
    localtimeEpoch,
    temp,
    feelsLike,
    humidity,
    windSpeed,
    windDir,
    gust,
    pressure,
    uv,
    conditionText,
    iconUrl,
    lastUpdatedEpoch,
  } = data;

  const title = [locationName, region].filter(Boolean).join(", ");

  return (
    <article className="relative overflow-hidden rounded-[2rem] border border-white/30 bg-gradient-to-br from-white/[0.97] via-white/90 to-slate-50/95 p-6 text-slate-900 shadow-[0_32px_80px_-24px_rgba(15,23,42,0.45)] sm:p-8">
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-sky-400/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-indigo-400/10 blur-3xl" />

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-stretch lg:justify-between">
        <div className="flex flex-1 flex-col gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              {formatLocalDateTime(localtimeEpoch, tzId)}
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {title}
              <span className="font-semibold text-slate-500">, {country}</span>
            </h2>
            <p className="mt-1 text-lg capitalize text-slate-600">{conditionText}</p>
            {lastUpdatedEpoch ? (
              <p className="mt-2 text-xs text-slate-400">
                Updated {formatLocalDateTime(lastUpdatedEpoch, tzId)}
              </p>
            ) : null}
          </div>

          <div className="flex flex-wrap items-end gap-2">
            <span className="font-display text-7xl font-bold leading-none tracking-tight text-slate-900 sm:text-8xl">
              {Math.round(temp)}
            </span>
            <span className="mb-2 text-2xl font-semibold text-slate-500">°{units === "metric" ? "C" : "F"}</span>
          </div>
          <p className="text-sm font-medium text-slate-600">
            Feels like <span className="font-semibold text-slate-800">{formatTemp(feelsLike, units)}</span>
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 lg:w-[220px]">
          {iconUrl && (
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-sky-900/5 blur-xl" />
              <img src={iconUrl} alt="" className="relative h-36 w-36 drop-shadow-lg sm:h-40 sm:w-40" />
            </div>
          )}
        </div>
      </div>

      <div className="relative mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          label="Humidity"
          value={`${humidity}%`}
          icon={
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 3c3 4 7 7.5 7 12a7 7 0 11-14 0c0-4.5 4-8 7-12z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
          }
        />
        <Stat
          label="Wind"
          value={formatWindSpeed(windSpeed, units)}
          hint={windDir ? `${windDir}${gust ? ` · Gust ${Math.round(gust)} ${units === "metric" ? "km/h" : "mph"}` : ""}` : null}
          icon={
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M4 10h11a3 3 0 100-6M4 14h7a3 3 0 110 6M4 18h15"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          }
        />
        <Stat
          label="Pressure"
          value={`${pressure} mb`}
          icon={
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 3v18M5 12h14M8 8l4-4 4 4M8 16l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          }
        />
        <Stat
          label="UV index"
          value={uv != null ? String(uv) : "—"}
          icon={
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
              <path
                d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          }
        />
      </div>
    </article>
  );
}
