'use client';

import { useRouter } from 'next/navigation';
import { CartPage } from '../../views/CartPage';

export default function Cart() {
  const router = useRouter();
  return <CartPage onNavigate={(path) => router.push(path)} />;
}
