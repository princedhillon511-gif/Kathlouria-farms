'use client';

import { useRouter } from 'next/navigation';
import { ShopPage } from '../../views/ShopPage';
import { Product } from '../../types';

export default function Shop() {
  const router = useRouter();
  return (
    <ShopPage
      onSelectProduct={(product: Product) => router.push(`/product/${product.slug}`)}
    />
  );
}
