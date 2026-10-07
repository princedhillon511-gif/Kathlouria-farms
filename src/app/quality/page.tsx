'use client';

import { useRouter } from 'next/navigation';
import { QualityPage } from '../../views/QualityPage';

export default function Quality() {
  const router = useRouter();
  return <QualityPage onNavigate={(path) => router.push(path)} />;
}
