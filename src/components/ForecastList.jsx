import ForecastItem from "./ForecastItem";

export default function ForecastList({ items, units }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
      {items.map((item) => (
        <ForecastItem key={item.date} item={item} units={units} />
      ))}
    </div>
  );
}
