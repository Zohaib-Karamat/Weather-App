export const formatTemp = (value, units) => `${Math.round(value)}°${units === "metric" ? "C" : "F"}`;

/** WeatherAPI: kph (metric) / mph (imperial) */
export const formatWindSpeed = (value, units) =>
  `${Math.round(value)} ${units === "metric" ? "km/h" : "mph"}`;

/** @param {number} epochSeconds - Unix seconds in location context */
export const formatLocalDateTime = (epochSeconds, tzId) => {
  const d = new Date(epochSeconds * 1000);
  try {
    return new Intl.DateTimeFormat(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZone: tzId || undefined,
    }).format(d);
  } catch {
    return d.toLocaleString();
  }
};
