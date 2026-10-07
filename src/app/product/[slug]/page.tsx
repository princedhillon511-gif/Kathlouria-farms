'use client';

import { useParams, useRouter } from 'next/navigation';
import { ProductDetailPage } from '../../../views/ProductDetailPage';
import { INITIAL_PRODUCTS } from '../../../data/products';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const slug = typeof params?.slug === 'string' ? params.slug : '';

  const product = INITIAL_PRODUCTS.find(p => p.slug === slug) || INITIAL_PRODUCTS[0];

  return (
    <ProductDetailPage
      product={product}
      onBack={() => router.push('/shop')}
      onNavigate={(path) => router.push(path)}
    />
  );
}
