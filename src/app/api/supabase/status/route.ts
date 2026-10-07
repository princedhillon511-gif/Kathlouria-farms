import { NextResponse } from 'next/server';
import { checkSupabaseStatus } from '../../../../lib/supabase';

export async function GET() {
  const status = await checkSupabaseStatus();
  return NextResponse.json({
    timestamp: new Date().toISOString(),
    projectId: 'rilxmhisjltxnatjwtrz',
    ...status,
  });
}
