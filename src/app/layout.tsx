import type { Metadata } from 'next';
import './globals.css';
import { ClientShell } from '../components/ClientShell';

export const metadata: Metadata = {
  title: 'Kathlouria Farms | Premium Indian Spices',
  description:
    'Premium Indian farm-to-kitchen brand offering authentic, high-quality spices and agricultural products. From our farm to your family.',
  openGraph: {
    title: 'Kathlouria Farms | Premium Indian Spices',
    description:
      'Premium Indian farm-to-kitchen brand offering authentic, high-quality spices and agricultural products. From our farm to your family.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="antialiased selection:bg-[#C5A467] selection:text-[#122619]">
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
