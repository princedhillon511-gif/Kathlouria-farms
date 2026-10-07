'use client';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center">
      <h2 className="font-serif text-2xl font-bold text-[#142C1E] mb-2">Something went wrong</h2>
      <p className="text-xs text-[#525955] mb-4">We encountered an issue while loading this page.</p>
      <button
        onClick={() => reset()}
        className="px-5 py-2.5 bg-[#142C1E] hover:bg-[#1A3826] text-[#FAF7F0] rounded-xl font-bold text-xs uppercase tracking-wider transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
