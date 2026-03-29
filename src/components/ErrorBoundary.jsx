import { Component } from "react";

export class ErrorBoundary extends Component {
  state = { hasError: false, message: "" };

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error?.message ?? "Something went wrong" };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
          <div className="max-w-md rounded-[1.75rem] border border-white/15 bg-white/10 p-8 text-center shadow-lift backdrop-blur-2xl">
            <h1 className="font-display text-xl font-semibold">Something went wrong</h1>
            <p className="mt-2 text-sm text-white/75">{this.state.message}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-6 rounded-2xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-lift transition hover:bg-slate-100"
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
