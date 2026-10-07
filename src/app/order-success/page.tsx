'use client';

import { useRouter } from 'next/navigation';
import { OrderSuccessPage } from '../../views/OrderSuccessPage';

export default function OrderSuccess() {
  const router = useRouter();
  return <OrderSuccessPage onNavigate={(path) => router.push(path)} />;
}
