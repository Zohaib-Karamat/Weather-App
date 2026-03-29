import axios from "axios";

const BASE_URL = "https://api.weatherapi.com/v1";
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

/** Free tier includes 3-day forecast; increase if your plan allows (e.g. 5, 7, 14). */
const FORECAST_DAYS = Number(import.meta.env.VITE_FORECAST_DAYS) || 3;

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

function iconToHttps(icon) {
  if (!icon) return null;
  if (icon.startsWith("//")) return `https:${icon}`;
  if (icon.startsWith("http")) return icon;
  return `https:${icon}`;
}

/** @param {import("axios").AxiosError} err */
export function getWeatherErrorMessage(err) {
  const msg = err.response?.data?.error?.message;
  if (typeof msg === "string") return msg;
  if (err.response?.status === 400) return "Invalid location or request";
  if (err.response?.status === 401) return "Invalid API key";
  if (err.response?.status === 403) return "API quota exceeded or access denied";
  if (!apiKey) return "Missing API key — set VITE_WEATHER_API_KEY in .env";
  if (err.code === "ECONNABORTED") return "Request timed out — try again";
  return "Unable to fetch weather";
}

/**
 * @param {object} raw - WeatherAPI forecast.json payload
 * @param {"metric"|"imperial"} units
 */
export function normalizeForecastResponse(raw, units) {
  const metric = units === "metric";
  const loc = raw.location;
  const cur = raw.current;

  const current = {
    locationName: loc.name,
    region: loc.region,
    country: loc.country,
    tzId: loc.tz_id,
    localtimeEpoch: loc.localtime_epoch,
    localtime: loc.localtime,
    temp: metric ? cur.temp_c : cur.temp_f,
    feelsLike: metric ? cur.feelslike_c : cur.feelslike_f,
    humidity: cur.humidity,
    windSpeed: metric ? cur.wind_kph : cur.wind_mph,
    windDir: cur.wind_dir,
    gust: metric ? cur.gust_kph : cur.gust_mph,
    pressure: cur.pressure_mb,
    uv: cur.uv,
    conditionText: cur.condition.text,
    conditionCode: cur.condition.code,
    iconUrl: iconToHttps(cur.condition.icon),
    isDay: cur.is_day === 1,
    lastUpdatedEpoch: cur.last_updated_epoch,
  };

  const days = (raw.forecast?.forecastday ?? []).map((d) => ({
    date: d.date,
    dateEpoch: d.date_epoch,
    maxTemp: metric ? d.day.maxtemp_c : d.day.maxtemp_f,
    minTemp: metric ? d.day.mintemp_c : d.day.mintemp_f,
    dailyChanceOfRain: d.day.daily_chance_of_rain,
    conditionText: d.day.condition.text,
    conditionCode: d.day.condition.code,
    iconUrl: iconToHttps(d.day.condition.icon),
  }));

  return { current, forecast: { days } };
}

async function fetchForecastRaw(query) {
  const { data } = await client.get("/forecast.json", {
    params: {
      key: apiKey,
      q: query,
      days: FORECAST_DAYS,
      aqi: "no",
      alerts: "no",
    },
  });
  return data;
}

export async function fetchCityBundle(city, units = "metric") {
  const raw = await fetchForecastRaw(city);
  return normalizeForecastResponse(raw, units);
}

export async function fetchByCoords(lat, lon, units = "metric") {
  const raw = await fetchForecastRaw(`${lat},${lon}`);
  return normalizeForecastResponse(raw, units);
}

export { FORECAST_DAYS };
