export default function Loader() {
  return (
    <div className="relative h-14 w-14" aria-label="Loading">
      <div className="absolute inset-0 rounded-full border-[3px] border-white/20" />
      <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-transparent border-t-cyan-300 border-r-white/70" />
      <div className="absolute inset-2 rounded-full border border-white/10" />
    </div>
  );
}
