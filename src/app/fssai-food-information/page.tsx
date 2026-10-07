'use client';

import { useRouter } from 'next/navigation';
import { FssaiFoodInfoPage } from '../../views/FssaiFoodInfoPage';

export default function FssaiFoodInfo() {
  const router = useRouter();
  return <FssaiFoodInfoPage onNavigate={(path) => router.push(path)} />;
}
