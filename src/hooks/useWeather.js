import { useCallback, useEffect, useState } from "react";
import {
  fetchByCoords,
  fetchCityBundle,
  fetchInitialBundle,
  getWeatherErrorMessage,
} from "../services/weatherApi";

const emptyData = { current: null, forecast: { days: [] } };

const initialQuery = import.meta.env.VITE_DEFAULT_LOCATION?.trim() || "auto:ip";

/**
 * @param {string} [defaultUnits="metric"]
 */
export function useWeather(defaultUnits = "metric") {
  const [city, setCity] = useState(initialQuery);
  const [units, setUnits] = useState(defaultUnits);
  const [data, setData] = useState(emptyData);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  const load = useCallback(
    async (targetCity, nextUnits = units) => {
      try {
        setStatus("loading");
        const bundle = await fetchCityBundle(targetCity, nextUnits);
        setData(bundle);
        setCity(bundle.current.locationName);
        setUnits(nextUnits);
        setStatus("success");
        setError(null);
      } catch (err) {
        setStatus("error");
        setError(getWeatherErrorMessage(err));
      }
    },
    [units]
  );

  const loadByCoords = useCallback(
    async (lat, lon, nextUnits = units) => {
      try {
        setStatus("loading");
        const bundle = await fetchByCoords(lat, lon, nextUnits);
        setData(bundle);
        setCity(bundle.current.locationName);
        setUnits(nextUnits);
        setStatus("success");
        setError(null);
      } catch (err) {
        setStatus("error");
        setError(getWeatherErrorMessage(err) || "Location fetch failed");
      }
    },
    [units]
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setStatus("loading");
        const bundle = await fetchInitialBundle(defaultUnits);
        if (cancelled) return;
        setData(bundle);
        setCity(bundle.current.locationName);
        setUnits(defaultUnits);
        setStatus("success");
        setError(null);
      } catch (err) {
        if (!cancelled) {
          setStatus("error");
          setError(getWeatherErrorMessage(err));
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [defaultUnits]);

  return { city, units, data, status, error, load, loadByCoords };
}
