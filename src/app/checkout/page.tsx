'use client';

import { useRouter } from 'next/navigation';
import { CheckoutPage } from '../../views/CheckoutPage';

export default function Checkout() {
  const router = useRouter();
  return <CheckoutPage onNavigate={(path) => router.push(path)} />;
}
