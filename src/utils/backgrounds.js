/**
 * Blue-forward palettes + optional Unsplash photos (cover + gradient overlay for contrast).
 */
import { categoryFromWeatherApiCode } from "./weatherCondition";

export const backgrounds = {
  clear: {
    gradient: "from-sky-400 via-cyan-500 to-blue-700",
    imageUrl:
      "https://images.unsplash.com/photo-1601296188446-7b1e2db6e899?auto=format&fit=crop&w=1920&q=80",
  },
  clouds: {
    gradient: "from-slate-400 via-sky-500 to-indigo-700",
    imageUrl:
      "https://images.unsplash.com/photo-1534088568595-a066f410bc81?auto=format&fit=crop&w=1920&q=80",
  },
  rain: {
    gradient: "from-slate-600 via-sky-800 to-blue-950",
    imageUrl:
      "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=1920&q=80",
  },
  snow: {
    gradient: "from-sky-500 via-cyan-300 to-indigo-600",
    imageUrl:
      "https://images.unsplash.com/photo-1491002052546-30775c88713d?auto=format&fit=crop&w=1920&q=80",
  },
  night: {
    gradient: "from-indigo-950 via-slate-900 to-blue-950",
    imageUrl:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1920&q=80",
  },
};

/** @param {number} conditionCode - WeatherAPI `condition.code` */
export function pickBackground(conditionCode, isDay) {
  if (!isDay) return backgrounds.night;
  const key = categoryFromWeatherApiCode(conditionCode);
  return backgrounds[key] ?? backgrounds.clouds;
}
