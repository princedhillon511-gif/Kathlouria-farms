'use client';

import { useRouter } from 'next/navigation';
import { OurStoryPage } from '../../views/OurStoryPage';

export default function OurStory() {
  const router = useRouter();
  return <OurStoryPage onNavigate={(path) => router.push(path)} />;
}
