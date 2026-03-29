/**
 * Map WeatherAPI.com condition codes to background theme keys.
 * @see https://www.weatherapi.com/docs/weather_conditions.json
 */
export function categoryFromWeatherApiCode(code) {
  if (code === 1000) return "clear";

  const snow = new Set([
    1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258, 1261, 1264, 1277, 1279, 1282,
  ]);
  if (snow.has(code)) return "snow";

  if (code >= 1180 && code <= 1201) return "rain";
  if (code >= 1240 && code <= 1246) return "rain";
  const rain = new Set([1063, 1087, 1150, 1153, 1156, 1159, 1273, 1276, 1278]);
  if (rain.has(code)) return "rain";

  const clouds = new Set([1003, 1006, 1009, 1030, 1135, 1147]);
  if (clouds.has(code)) return "clouds";

  return "clouds";
}
