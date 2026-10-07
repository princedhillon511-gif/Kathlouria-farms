'use client';

import { useRouter } from 'next/navigation';
import { HomePage } from '../views/HomePage';
import { Product } from '../types';

export default function Page() {
  const router = useRouter();
  return (
    <HomePage
      onNavigate={(path) => router.push(path)}
      onSelectProduct={(product: Product) => router.push(`/product/${product.slug}`)}
    />
  );
}
