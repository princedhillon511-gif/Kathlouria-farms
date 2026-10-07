'use client';

import { useRouter } from 'next/navigation';
import { ClientsDatabasePage } from '../../views/ClientsDatabasePage';

export default function Clients() {
  const router = useRouter();
  return (
    <ClientsDatabasePage
      onNavigate={(path: string) => router.push(path)}
    />
  );
}
