'use client';

import { useRouter } from 'next/navigation';
import { FarmSourcingPage } from '../../views/FarmSourcingPage';

export default function FarmSourcing() {
  const router = useRouter();
  return <FarmSourcingPage onNavigate={(path) => router.push(path)} />;
}
