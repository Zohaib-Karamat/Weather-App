# Aurora Weather

Production-style React weather dashboard powered by **[WeatherAPI.com](https://www.weatherapi.com/)**: city search, current conditions, multi-day forecast, geolocation, metric/imperial units, dynamic backgrounds, recent searches (local storage), loading and error states, and a React error boundary.

## Tech stack

- **React 19** + **Vite 7**
- **Tailwind CSS** (mobile-first layout, glass-style cards)
- **Axios** (shared client + error normalization)
- **WeatherAPI.com** — current + forecast in one request (`/v1/forecast.json`)

## Setup

1. **Install**

   ```bash
   npm install
   ```

2. **API key** — Sign up at [WeatherAPI.com](https://www.weatherapi.com/), copy your key from the dashboard.

3. **Environment** — create `.env` in the project root (never commit real keys):

   ```bash
   cp .env.example .env
   ```

   Set `VITE_WEATHER_API_KEY` to your key.

   Optional: `VITE_FORECAST_DAYS` — default is **3** (aligned with the free tier). Paid plans support more days (e.g. `5` or `7`).

4. **Run**

   ```bash
   npm run dev
   ```

5. **Build**

   ```bash
   npm run build
   npm run preview
   ```

## API integration (WeatherAPI.com)

| Endpoint | Used for |
|----------|----------|
| `GET /v1/forecast.json` | Location `q`, `days`, `key` — returns **current** + **forecastday[]** in one response |

- **Query `q`**: city name or `lat,lon` for geolocation.
- **Errors**: JSON shape `{ error: { code, message } }` is normalized in `getWeatherErrorMessage()`.
- **Attribution**: UI includes a link to WeatherAPI.com per typical API terms.

## Deployment (Vercel / Netlify)

- Build: `npm run build`, output directory: `dist`.
- Set environment variable **`VITE_WEATHER_API_KEY`** (and optionally `VITE_FORECAST_DAYS`) on the host, then redeploy.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server |
| `npm run build` | Production bundle |
| `npm run preview` | Preview `dist` |
| `npm run lint` | ESLint |

## License

MIT (update when you publish).
