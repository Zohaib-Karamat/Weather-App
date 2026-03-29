export default function ErrorBanner({ message }) {
  if (!message) return null;
  return (
    <div
      className="flex items-start gap-3 rounded-2xl border border-red-400/40 bg-red-950/50 px-4 py-4 text-sm font-medium text-red-100 shadow-lift backdrop-blur-md"
      role="alert"
    >
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-red-500/20 text-red-200">
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 9v4m0 4h.01M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <div className="min-w-0 pt-0.5">
        <p className="font-semibold text-red-50">We couldn&apos;t load that</p>
        <p className="mt-1 text-red-100/90">{message}</p>
      </div>
    </div>
  );
}
