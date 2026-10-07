import { NextResponse } from 'next/server';
import { seedProductsToSupabase } from '../../../../lib/supabase';
import { INITIAL_PRODUCTS } from '../../../../data/products';

export async function POST() {
  const result = await seedProductsToSupabase(INITIAL_PRODUCTS);
  return NextResponse.json({
    timestamp: new Date().toISOString(),
    projectId: 'rilxmhisjltxnatjwtrz',
    ...result,
  });
}
