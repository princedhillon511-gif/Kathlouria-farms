import { createClient } from '@supabase/supabase-js';
import { PlacedOrder, CartItem, Product } from '../types';

export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rilxmhisjltxnatjwtrz.supabase.co';

export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_yAzPSY3LaPCsjZ9s5aS1iQ_EijKcWPF';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface SupabaseClientRecord {
  id?: string;
  full_name: string;
  phone: string;
  email: string;
  address_line?: string;
  landmark?: string;
  city?: string;
  state?: string;
  pincode?: string;
  total_orders?: number;
  total_spent?: number;
  last_order_date?: string;
  created_at?: string;
}

export interface SupabaseOrderRecord {
  id?: string;
  order_id: string;
  client_id?: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  shipping_address: {
    addressLine: string;
    landmark?: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  payment_method: string;
  payment_id?: string;
  razorpay_order_id?: string;
  status: string;
  estimated_delivery?: string;
  created_at?: string;
}

export interface SupabaseInquiryRecord {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  created_at?: string;
}

export const SUPABASE_SETUP_SQL = `-- Run this in your Supabase SQL Editor (Project: rilxmhisjltxnatjwtrz)

-- 1. Clients Table (stores all customer data)
CREATE TABLE IF NOT EXISTS public.clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  address_line TEXT,
  landmark TEXT,
  city TEXT,
  state TEXT,
  pincode TEXT,
  total_orders INT DEFAULT 1,
  total_spent NUMERIC DEFAULT 0,
  last_order_date TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id TEXT UNIQUE NOT NULL,
  client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  shipping_address JSONB NOT NULL,
  items JSONB NOT NULL,
  subtotal NUMERIC NOT NULL,
  discount NUMERIC DEFAULT 0,
  shipping NUMERIC DEFAULT 0,
  total NUMERIC NOT NULL,
  payment_method TEXT NOT NULL,
  payment_id TEXT,
  razorpay_order_id TEXT,
  status TEXT DEFAULT 'Confirmed',
  estimated_delivery TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Customer Inquiries Table
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Products Table
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  sub_name TEXT,
  vernacular_name TEXT,
  category TEXT NOT NULL,
  category_label TEXT,
  short_description TEXT,
  full_description TEXT,
  base_price NUMERIC NOT NULL,
  sizes JSONB NOT NULL,
  benefits JSONB,
  culinary_uses JSONB,
  ingredients TEXT,
  net_quantity TEXT,
  origin TEXT,
  storage_instructions TEXT,
  allergen_information TEXT,
  nutritional_information JSONB,
  manufacturer TEXT,
  packer TEXT,
  fssai_licence_no TEXT,
  batch_no TEXT,
  date_of_packing TEXT,
  best_before TEXT,
  is_featured BOOLEAN DEFAULT false,
  color_tone TEXT,
  tags JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS and public policies for publishable API key access
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all for clients" ON public.clients;
CREATE POLICY "Allow all for clients" ON public.clients FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all for orders" ON public.orders;
CREATE POLICY "Allow all for orders" ON public.orders FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all for inquiries" ON public.inquiries;
CREATE POLICY "Allow all for inquiries" ON public.inquiries FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all for products" ON public.products;
CREATE POLICY "Allow all for products" ON public.products FOR ALL USING (true) WITH CHECK (true);
`;

/**
 * Checks connectivity to the Supabase endpoint and checks table presence
 */
export async function checkSupabaseStatus(): Promise<{
  connected: boolean;
  projectUrl: string;
  tables: {
    clients: boolean;
    orders: boolean;
    inquiries: boolean;
    products: boolean;
  };
  error?: string;
}> {
  try {
    const results = await Promise.allSettled([
      supabase.from('clients').select('id').limit(1),
      supabase.from('orders').select('id').limit(1),
      supabase.from('inquiries').select('id').limit(1),
      supabase.from('products').select('id').limit(1),
    ]);

    const isMissingTable = (err: any) =>
      err && (err.code === 'PGRST205' || err.message?.includes('schema cache'));

    const clientsRes = results[0].status === 'fulfilled' ? results[0].value : null;
    const ordersRes = results[1].status === 'fulfilled' ? results[1].value : null;
    const inquiriesRes = results[2].status === 'fulfilled' ? results[2].value : null;
    const productsRes = results[3].status === 'fulfilled' ? results[3].value : null;

    return {
      connected: true,
      projectUrl: SUPABASE_URL,
      tables: {
        clients: !isMissingTable(clientsRes?.error),
        orders: !isMissingTable(ordersRes?.error),
        inquiries: !isMissingTable(inquiriesRes?.error),
        products: !isMissingTable(productsRes?.error),
      },
    };
  } catch (err: any) {
    return {
      connected: false,
      projectUrl: SUPABASE_URL,
      tables: { clients: false, orders: false, inquiries: false, products: false },
      error: err?.message || 'Connection failed',
    };
  }
}

/**
 * Saves or updates client info in Supabase
 */
export async function syncClientToSupabase(customerInfo: {
  fullName: string;
  phone: string;
  email: string;
  addressLine?: string;
  landmark?: string;
  city?: string;
  state?: string;
  pincode?: string;
  orderTotal?: number;
}): Promise<{ clientId?: string; success: boolean; error?: string }> {
  try {
    // 1. Try to find existing client by phone or email
    const { data: existingClients, error: fetchErr } = await supabase
      .from('clients')
      .select('id, total_orders, total_spent')
      .or(`phone.eq.${customerInfo.phone},email.eq.${customerInfo.email}`)
      .limit(1);

    if (fetchErr) {
      if (fetchErr.code === 'PGRST205') {
        // Table not created yet
        return { success: false, error: 'Table public.clients does not exist in Supabase yet.' };
      }
      return { success: false, error: fetchErr.message };
    }

    if (existingClients && existingClients.length > 0) {
      const existing = existingClients[0];
      const updatedOrders = (existing.total_orders || 1) + 1;
      const updatedSpent = Number(existing.total_spent || 0) + Number(customerInfo.orderTotal || 0);

      const { data: updated, error: updateErr } = await supabase
        .from('clients')
        .update({
          full_name: customerInfo.fullName,
          phone: customerInfo.phone,
          email: customerInfo.email,
          address_line: customerInfo.addressLine,
          landmark: customerInfo.landmark,
          city: customerInfo.city,
          state: customerInfo.state,
          pincode: customerInfo.pincode,
          total_orders: updatedOrders,
          total_spent: updatedSpent,
          last_order_date: new Date().toISOString(),
        })
        .eq('id', existing.id)
        .select('id')
        .single();

      if (updateErr) {
        return { clientId: existing.id, success: true };
      }
      return { clientId: updated?.id || existing.id, success: true };
    } else {
      // Create new client
      const { data: created, error: insertErr } = await supabase
        .from('clients')
        .insert([
          {
            full_name: customerInfo.fullName,
            phone: customerInfo.phone,
            email: customerInfo.email,
            address_line: customerInfo.addressLine,
            landmark: customerInfo.landmark,
            city: customerInfo.city,
            state: customerInfo.state,
            pincode: customerInfo.pincode,
            total_orders: 1,
            total_spent: Number(customerInfo.orderTotal || 0),
            last_order_date: new Date().toISOString(),
          },
        ])
        .select('id')
        .single();

      if (insertErr) {
        return { success: false, error: insertErr.message };
      }
      return { clientId: created?.id, success: true };
    }
  } catch (err: any) {
    return { success: false, error: err?.message || 'Error syncing client' };
  }
}

/**
 * Saves order to Supabase and links client
 */
export async function syncOrderToSupabase(order: PlacedOrder): Promise<{
  success: boolean;
  orderId?: string;
  error?: string;
}> {
  try {
    // 1. Sync client first to get client_id
    const clientResult = await syncClientToSupabase({
      fullName: order.customerInfo.fullName,
      phone: order.customerInfo.phone,
      email: order.customerInfo.email,
      addressLine: order.customerInfo.addressLine,
      landmark: order.customerInfo.landmark,
      city: order.customerInfo.city,
      state: order.customerInfo.state,
      pincode: order.customerInfo.pincode,
      orderTotal: order.total,
    });

    // 2. Insert into orders table
    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          order_id: order.orderId,
          client_id: clientResult.clientId || null,
          customer_name: order.customerInfo.fullName,
          customer_phone: order.customerInfo.phone,
          customer_email: order.customerInfo.email,
          shipping_address: {
            addressLine: order.customerInfo.addressLine,
            landmark: order.customerInfo.landmark || '',
            city: order.customerInfo.city,
            state: order.customerInfo.state,
            pincode: order.customerInfo.pincode,
          },
          items: order.items,
          subtotal: order.subtotal,
          discount: order.discount,
          shipping: order.shipping,
          total: order.total,
          payment_method: order.customerInfo.paymentMethod,
          payment_id: order.razorpayPaymentId || null,
          razorpay_order_id: order.razorpayOrderId || null,
          status: order.status,
          estimated_delivery: order.estimatedDelivery,
          created_at: new Date().toISOString(),
        },
      ])
      .select('id')
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, orderId: data?.id };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Error inserting order' };
  }
}

/**
 * Saves contact inquiry to Supabase
 */
export async function syncInquiryToSupabase(inquiry: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from('inquiries').insert([
      {
        name: inquiry.name,
        email: inquiry.email,
        phone: inquiry.phone || '',
        subject: inquiry.subject || 'General Inquiry',
        message: inquiry.message,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Error submitting inquiry' };
  }
}

/**
 * Fetches all clients from Supabase
 */
export async function fetchClientsFromSupabase(): Promise<{
  data: SupabaseClientRecord[];
  error?: string;
}> {
  try {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return { data: [], error: error.message };
    }
    return { data: (data as SupabaseClientRecord[]) || [] };
  } catch (err: any) {
    return { data: [], error: err?.message || 'Error loading clients' };
  }
}

/**
 * Fetches all orders from Supabase
 */
export async function fetchOrdersFromSupabase(): Promise<{
  data: SupabaseOrderRecord[];
  error?: string;
}> {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return { data: [], error: error.message };
    }
    return { data: (data as SupabaseOrderRecord[]) || [] };
  } catch (err: any) {
    return { data: [], error: err?.message || 'Error loading orders' };
  }
}

/**
 * Fetches all customer inquiries
 */
export async function fetchInquiriesFromSupabase(): Promise<{
  data: SupabaseInquiryRecord[];
  error?: string;
}> {
  try {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return { data: [], error: error.message };
    }
    return { data: (data as SupabaseInquiryRecord[]) || [] };
  } catch (err: any) {
    return { data: [], error: err?.message || 'Error loading inquiries' };
  }
}

/**
 * Seeds products into Supabase products table
 */
export async function seedProductsToSupabase(products: Product[]): Promise<{
  success: boolean;
  count: number;
  error?: string;
}> {
  try {
    const rows = products.map((p) => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      sub_name: p.subName || null,
      vernacular_name: p.vernacularName || null,
      category: p.category,
      category_label: p.categoryLabel,
      short_description: p.shortDescription,
      full_description: p.fullDescription,
      base_price: p.basePrice,
      sizes: p.sizes,
      benefits: p.benefits || [],
      culinary_uses: p.culinaryUses || [],
      ingredients: p.ingredients,
      net_quantity: p.netQuantity,
      origin: p.origin,
      storage_instructions: p.storageInstructions,
      allergen_information: p.allergenInformation,
      nutritional_information: p.nutritionalInformation,
      manufacturer: p.manufacturer,
      packer: p.packer,
      fssai_licence_no: p.fssaiLicenceNo,
      batch_no: p.batchNo,
      date_of_packing: p.dateOfPacking,
      best_before: p.bestBefore,
      is_featured: !!p.isFeatured,
      color_tone: p.colorTone,
      tags: p.tags,
    }));

    const { error } = await supabase.from('products').upsert(rows, { onConflict: 'id' });
    if (error) {
      return { success: false, count: 0, error: error.message };
    }
    return { success: true, count: rows.length };
  } catch (err: any) {
    return { success: false, count: 0, error: err?.message || 'Error seeding products' };
  }
}

