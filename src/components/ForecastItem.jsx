import { formatTemp } from "../utils/formatters";

export default function ForecastItem({ item, units }) {
  const { date, maxTemp, minTemp, conditionText, iconUrl, dailyChanceOfRain } = item;
  const when = new Date(`${date}T12:00:00`);
  const day = Number.isNaN(when.getTime())
    ? date
    : when.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });

  return (
    <div className="group flex flex-col items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-3 py-4 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md transition hover:border-white/30 hover:bg-white/15">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-white/55">{day}</p>
      {iconUrl && (
        <img
          src={iconUrl}
          alt=""
          className="h-14 w-14 drop-shadow-md transition group-hover:scale-105"
        />
      )}
      <p className="font-display text-xl font-bold text-white">{formatTemp(maxTemp, units)}</p>
      <p className="text-xs font-medium text-white/75">Lo {formatTemp(minTemp, units)}</p>
      {dailyChanceOfRain != null && dailyChanceOfRain > 0 ? (
        <p className="text-[11px] text-sky-200/90">{dailyChanceOfRain}% rain</p>
      ) : (
        <p className="min-h-[1rem] text-[11px] text-white/40">&nbsp;</p>
      )}
      <p className="line-clamp-2 min-h-[2rem] text-[11px] leading-snug text-white/65 capitalize">{conditionText}</p>
    </div>
  );
}
