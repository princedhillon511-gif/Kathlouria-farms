import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="font-serif text-5xl font-bold text-[#142C1E] mb-4">404</h1>
      <p className="text-lg text-[#142C1E]/80 mb-6">The spice or page you are searching for cannot be found.</p>
      <Link
        href="/"
        className="px-6 py-3 bg-[#142C1E] text-[#FAF7F0] font-medium tracking-wide uppercase text-sm rounded transition-colors hover:bg-[#1C3E2B]"
      >
        Return to Farmstead
      </Link>
    </div>
  );
}
