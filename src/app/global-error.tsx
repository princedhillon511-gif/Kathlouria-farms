'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#FAF7F0] text-[#142C1E]">
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
          <h2 className="font-serif text-3xl font-bold mb-2">Something went wrong</h2>
          <p className="text-sm text-[#525955] mb-6">We encountered an unexpected error.</p>
          <button
            onClick={() => reset()}
            className="px-6 py-2.5 bg-[#142C1E] text-[#FAF7F0] rounded-xl font-bold text-xs uppercase tracking-wider"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
