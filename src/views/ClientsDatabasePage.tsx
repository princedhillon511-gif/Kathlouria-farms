'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  checkSupabaseStatus,
  fetchClientsFromSupabase,
  fetchOrdersFromSupabase,
  fetchInquiriesFromSupabase,
  syncOrderToSupabase,
  seedProductsToSupabase,
  SUPABASE_SETUP_SQL,
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  SupabaseClientRecord,
  SupabaseOrderRecord,
  SupabaseInquiryRecord,
} from '../lib/supabase';
import { INITIAL_PRODUCTS } from '../data/products';
import { PlacedOrder } from '../types';
import {
  Database,
  Users,
  ShoppingBag,
  MessageSquare,
  RefreshCw,
  Copy,
  Check,
  Download,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Search,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Layers,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  CreditCard,
  Zap,
} from 'lucide-react';

interface ClientsDatabasePageProps {
  onNavigate?: (path: string) => void;
}

export const ClientsDatabasePage: React.FC<ClientsDatabasePageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'clients' | 'orders' | 'inquiries' | 'razorpay' | 'schema'>('clients');
  const [isLoading, setIsLoading] = useState(true);
  const [copiedSql, setCopiedSql] = useState(false);
  const [copiedEnv, setCopiedEnv] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [seedingLoading, setSeedingLoading] = useState(false);
  const [seedSuccessMsg, setSeedSuccessMsg] = useState<string | null>(null);
  const [syncingOrders, setSyncingOrders] = useState(false);
  const [syncMsg, setSyncMsg] = useState<string | null>(null);
  const [testingRazorpay, setTestingRazorpay] = useState(false);
  const [razorpayTestResult, setRazorpayTestResult] = useState<any>(null);

  // Status state
  const [dbStatus, setDbStatus] = useState<{
    connected: boolean;
    projectUrl: string;
    tables: {
      clients: boolean;
      orders: boolean;
      inquiries: boolean;
      products: boolean;
    };
    error?: string;
  }>({
    connected: true,
    projectUrl: SUPABASE_URL,
    tables: { clients: false, orders: false, inquiries: false, products: false },
  });

  // Data states
  const [clients, setClients] = useState<SupabaseClientRecord[]>([]);
  const [orders, setOrders] = useState<SupabaseOrderRecord[]>([]);
  const [inquiries, setInquiries] = useState<SupabaseInquiryRecord[]>([]);

  // Load everything
  const loadDatabaseData = async () => {
    setIsLoading(true);
    setSeedSuccessMsg(null);
    setSyncMsg(null);

    try {
      // 1. Check table status
      const status = await checkSupabaseStatus();
      setDbStatus(status);

      // 2. Fetch clients
      let clientsData: SupabaseClientRecord[] = [];
      if (status.tables.clients) {
        const res = await fetchClientsFromSupabase();
        clientsData = res.data;
      }

      // 3. Fetch orders
      let ordersData: SupabaseOrderRecord[] = [];
      if (status.tables.orders) {
        const res = await fetchOrdersFromSupabase();
        ordersData = res.data;
      }

      // 4. Fetch inquiries
      let inquiriesData: SupabaseInquiryRecord[] = [];
      if (status.tables.inquiries) {
        const res = await fetchInquiriesFromSupabase();
        inquiriesData = res.data;
      }

      // 5. Merge with local backup storage so store owner NEVER loses any customer data
      if (typeof window !== 'undefined') {
        try {
          const localOrders: PlacedOrder[] = JSON.parse(
            localStorage.getItem('kathlouria_all_orders') || '[]'
          );

          // Convert local orders to client records if not already in clientsData
          if (localOrders.length > 0) {
            const clientMap = new Map<string, SupabaseClientRecord>();

            // Add existing supabase clients to map
            clientsData.forEach((c) => {
              const key = (c.phone || c.email).toLowerCase();
              if (key) clientMap.set(key, c);
            });

            // Merge local orders to generate client records
            localOrders.forEach((lo) => {
              const key = (lo.customerInfo.phone || lo.customerInfo.email).toLowerCase();
              if (key) {
                const existing = clientMap.get(key);
                if (!existing) {
                  clientMap.set(key, {
                    id: 'local-' + Math.random().toString(36).substring(7),
                    full_name: lo.customerInfo.fullName,
                    phone: lo.customerInfo.phone,
                    email: lo.customerInfo.email,
                    address_line: lo.customerInfo.addressLine,
                    landmark: lo.customerInfo.landmark,
                    city: lo.customerInfo.city,
                    state: lo.customerInfo.state,
                    pincode: lo.customerInfo.pincode,
                    total_orders: 1,
                    total_spent: lo.total,
                    last_order_date: lo.date,
                    created_at: new Date().toISOString(),
                  });
                }
              }

              // Also check if order is already in ordersData
              if (!ordersData.some((o) => o.order_id === lo.orderId)) {
                ordersData.push({
                  order_id: lo.orderId,
                  customer_name: lo.customerInfo.fullName,
                  customer_phone: lo.customerInfo.phone,
                  customer_email: lo.customerInfo.email,
                  shipping_address: {
                    addressLine: lo.customerInfo.addressLine,
                    landmark: lo.customerInfo.landmark,
                    city: lo.customerInfo.city,
                    state: lo.customerInfo.state,
                    pincode: lo.customerInfo.pincode,
                  },
                  items: lo.items,
                  subtotal: lo.subtotal,
                  discount: lo.discount,
                  shipping: lo.shipping,
                  total: lo.total,
                  payment_method: lo.customerInfo.paymentMethod,
                  status: lo.status,
                  estimated_delivery: lo.estimatedDelivery,
                  created_at: lo.date,
                });
              }
            });

            clientsData = Array.from(clientMap.values());
          }

          // Merge local inquiries
          const localInquiries: SupabaseInquiryRecord[] = JSON.parse(
            localStorage.getItem('kathlouria_inquiries') || '[]'
          );
          if (localInquiries.length > 0) {
            localInquiries.forEach((li) => {
              if (!inquiriesData.some((iq) => iq.email === li.email && iq.message === li.message)) {
                inquiriesData.push(li);
              }
            });
          }
        } catch (e) {
          console.warn('Local merge error:', e);
        }
      }

      setClients(clientsData);
      setOrders(ordersData);
      setInquiries(inquiriesData);
    } catch (err: any) {
      console.error('Failed to load database:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDatabaseData();
  }, []);

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SETUP_SQL);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const handleSeedProducts = async () => {
    setSeedingLoading(true);
    setSeedSuccessMsg(null);
    try {
      const res = await seedProductsToSupabase(INITIAL_PRODUCTS);
      if (res.success) {
        setSeedSuccessMsg(`Successfully seeded ${res.count} products into Supabase public.products!`);
      } else {
        setSeedSuccessMsg(`Notice: ${res.error || 'Please execute the SQL setup script first.'}`);
      }
      const st = await checkSupabaseStatus();
      setDbStatus(st);
    } catch (err: any) {
      setSeedSuccessMsg(`Error: ${err?.message || 'Could not seed products'}`);
    } finally {
      setSeedingLoading(false);
    }
  };

  const handleSyncPendingOrders = async () => {
    setSyncingOrders(true);
    setSyncMsg(null);
    try {
      const localOrders: PlacedOrder[] = JSON.parse(
        localStorage.getItem('kathlouria_all_orders') || '[]'
      );
      if (localOrders.length === 0) {
        setSyncMsg('No pending local orders found to sync.');
        setSyncingOrders(false);
        return;
      }

      let syncedCount = 0;
      for (const ord of localOrders) {
        const res = await syncOrderToSupabase(ord);
        if (res.success) syncedCount++;
      }

      if (syncedCount > 0) {
        setSyncMsg(`Successfully synchronized ${syncedCount} orders to Supabase!`);
        await loadDatabaseData();
      } else {
        setSyncMsg('Notice: Could not sync orders. Ensure the public.orders table is created via SQL.');
      }
    } catch (e: any) {
      setSyncMsg(`Sync error: ${e?.message}`);
    } finally {
      setSyncingOrders(false);
    }
  };

  const handleExportClientsCsv = () => {
    if (clients.length === 0) {
      setSyncMsg('Notice: No client data available to export yet.');
      return;
    }

    const headers = [
      'Full Name',
      'Phone',
      'Email',
      'Address',
      'City',
      'State',
      'PIN Code',
      'Total Orders',
      'Total Spent (INR)',
      'Last Active Date',
    ];

    const rows = clients.map((c) => [
      `"${c.full_name || ''}"`,
      `"${c.phone || ''}"`,
      `"${c.email || ''}"`,
      `"${c.address_line || ''}"`,
      `"${c.city || ''}"`,
      `"${c.state || ''}"`,
      `"${c.pincode || ''}"`,
      c.total_orders || 1,
      c.total_spent || 0,
      `"${c.last_order_date || c.created_at || ''}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `kathlouria_clients_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter clients
  const filteredClients = clients.filter((c) => {
    const q = searchQuery.toLowerCase();
    return (
      (c.full_name && c.full_name.toLowerCase().includes(q)) ||
      (c.phone && c.phone.toLowerCase().includes(q)) ||
      (c.email && c.email.toLowerCase().includes(q)) ||
      (c.city && c.city.toLowerCase().includes(q)) ||
      (c.state && c.state.toLowerCase().includes(q))
    );
  });

  // Calculate metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
  const allTablesReady =
    dbStatus.tables.clients &&
    dbStatus.tables.orders &&
    dbStatus.tables.inquiries &&
    dbStatus.tables.products;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Top Header Card */}
      <div className="bg-[#142C1E] text-[#FAF7F0] rounded-2xl p-6 sm:p-8 border border-[#C5A467]/30 shadow-lg space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[#FAF7F0]/10 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4ADE80] animate-pulse" />
              <span className="text-xs uppercase tracking-widest font-semibold text-[#C5A467]">
                Live Supabase Database Connected
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight">
              Client Data & Orders Command Center
            </h1>
            <p className="text-xs sm:text-sm text-[#FAF7F0]/75 max-w-2xl">
              Connected to Supabase Project <code className="bg-[#0B1710] px-2 py-0.5 rounded text-[#C5A467] font-mono">rilxmhisjltxnatjwtrz</code>.
              Manage your clients, live orders, customer inquiries, and spice catalog.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={loadDatabaseData}
              disabled={isLoading}
              className="px-4 py-2 bg-white/10 hover:bg-white/15 text-[#FAF7F0] text-xs font-semibold uppercase tracking-wider rounded-xl flex items-center gap-2 border border-white/20 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>

            <button
              onClick={handleExportClientsCsv}
              className="px-4 py-2 bg-[#C5A467] hover:bg-[#B39358] text-[#142C1E] text-xs font-bold uppercase tracking-wider rounded-xl flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Clients CSV</span>
            </button>

            <button
              onClick={() => setActiveTab('schema')}
              className="px-4 py-2 bg-white text-[#142C1E] hover:bg-[#FAF7F0] text-xs font-bold uppercase tracking-wider rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Database className="w-3.5 h-3.5" />
              <span>SQL Setup Guide</span>
            </button>
          </div>
        </div>

        {/* Database Quick Health Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-[#0D1E14] p-3 rounded-xl border border-white/5 flex items-center justify-between">
            <span className="text-[#FAF7F0]/70">Table: clients</span>
            {dbStatus.tables.clients ? (
              <span className="inline-flex items-center gap-1 text-[#4ADE80] font-semibold text-[11px]">
                <CheckCircle2 className="w-3 h-3" /> Ready
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[#FCD34D] font-semibold text-[11px]">
                <AlertCircle className="w-3 h-3" /> Setup Needed
              </span>
            )}
          </div>

          <div className="bg-[#0D1E14] p-3 rounded-xl border border-white/5 flex items-center justify-between">
            <span className="text-[#FAF7F0]/70">Table: orders</span>
            {dbStatus.tables.orders ? (
              <span className="inline-flex items-center gap-1 text-[#4ADE80] font-semibold text-[11px]">
                <CheckCircle2 className="w-3 h-3" /> Ready
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[#FCD34D] font-semibold text-[11px]">
                <AlertCircle className="w-3 h-3" /> Setup Needed
              </span>
            )}
          </div>

          <div className="bg-[#0D1E14] p-3 rounded-xl border border-white/5 flex items-center justify-between">
            <span className="text-[#FAF7F0]/70">Table: inquiries</span>
            {dbStatus.tables.inquiries ? (
              <span className="inline-flex items-center gap-1 text-[#4ADE80] font-semibold text-[11px]">
                <CheckCircle2 className="w-3 h-3" /> Ready
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[#FCD34D] font-semibold text-[11px]">
                <AlertCircle className="w-3 h-3" /> Setup Needed
              </span>
            )}
          </div>

          <div className="bg-[#0D1E14] p-3 rounded-xl border border-white/5 flex items-center justify-between">
            <span className="text-[#FAF7F0]/70">Table: products</span>
            {dbStatus.tables.products ? (
              <span className="inline-flex items-center gap-1 text-[#4ADE80] font-semibold text-[11px]">
                <CheckCircle2 className="w-3 h-3" /> Ready
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[#FCD34D] font-semibold text-[11px]">
                <AlertCircle className="w-3 h-3" /> Setup Needed
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Setup Notice Banner if tables aren't created yet */}
      {!allTablesReady && (
        <div className="bg-[#FFFBEB] border-2 border-[#F59E0B]/40 rounded-2xl p-5 sm:p-6 space-y-3 shadow-xs">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
            <div className="space-y-1 flex-1">
              <h3 className="font-serif font-bold text-base text-[#92400E]">
                Supabase Tables Initialization Available
              </h3>
              <p className="text-xs text-[#78350F] leading-relaxed">
                Your Supabase project <span className="font-mono font-bold">rilxmhisjltxnatjwtrz</span> is authenticated and ready!
                To initialize the tables in Supabase Postgres, click <strong>"Copy SQL Schema"</strong> below, open your{' '}
                <a
                  href="https://supabase.com/dashboard/project/rilxmhisjltxnatjwtrz/sql/new"
                  target="_blank"
                  rel="noreferrer"
                  className="underline font-bold text-[#92400E] hover:text-[#B45309]"
                >
                  Supabase SQL Editor
                </a>
                , paste the script, and click Run.
              </p>
            </div>
            <button
              onClick={handleCopySql}
              className="px-4 py-2 bg-[#92400E] text-white hover:bg-[#78350F] text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm shrink-0 cursor-pointer transition-colors"
            >
              {copiedSql ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSql ? 'Copied!' : 'Copy SQL Schema'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Feedback Messages */}
      {seedSuccessMsg && (
        <div className="bg-[#ECFDF5] border border-[#10B981]/40 rounded-xl p-4 text-xs text-[#065F46] flex items-center justify-between">
          <span className="font-medium">{seedSuccessMsg}</span>
          <button onClick={() => setSeedSuccessMsg(null)} className="font-bold underline text-[#047857]">Dismiss</button>
        </div>
      )}

      {syncMsg && (
        <div className="bg-[#EFF6FF] border border-[#3B82F6]/40 rounded-xl p-4 text-xs text-[#1E40AF] flex items-center justify-between">
          <span className="font-medium">{syncMsg}</span>
          <button onClick={() => setSyncMsg(null)} className="font-bold underline text-[#1D4ED8]">Dismiss</button>
        </div>
      )}

      {/* 4 Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#142C1E]/15 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-[#525955]">
            <span className="font-bold uppercase tracking-wider">Total Clients</span>
            <Users className="w-4 h-4 text-[#C5A467]" />
          </div>
          <div className="font-serif text-3xl font-bold text-[#142C1E]">{clients.length}</div>
          <div className="text-[11px] text-[#2E5C32]">Verified Customer Accounts</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#142C1E]/15 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-[#525955]">
            <span className="font-bold uppercase tracking-wider">Orders Placed</span>
            <ShoppingBag className="w-4 h-4 text-[#C5A467]" />
          </div>
          <div className="font-serif text-3xl font-bold text-[#142C1E]">{orders.length}</div>
          <div className="text-[11px] text-[#2E5C32]">Online Spice Dispatches</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#142C1E]/15 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-[#525955]">
            <span className="font-bold uppercase tracking-wider">Client Revenue</span>
            <TrendingUp className="w-4 h-4 text-[#C5A467]" />
          </div>
          <div className="font-serif text-3xl font-bold text-[#142C1E]">₹{totalRevenue}</div>
          <div className="text-[11px] text-[#2E5C32]">Cumulative Sales Volume</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#142C1E]/15 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-[#525955]">
            <span className="font-bold uppercase tracking-wider">Customer Inquiries</span>
            <MessageSquare className="w-4 h-4 text-[#C5A467]" />
          </div>
          <div className="font-serif text-3xl font-bold text-[#142C1E]">{inquiries.length}</div>
          <div className="text-[11px] text-[#2E5C32]">Farmstead Help Messages</div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="bg-white rounded-2xl border border-[#142C1E]/15 shadow-xs overflow-hidden">
        <div className="border-b border-[#142C1E]/10 flex flex-wrap items-center justify-between px-6 pt-4">
          <div className="flex items-center gap-6 overflow-x-auto">
            <button
              onClick={() => setActiveTab('clients')}
              className={`pb-4 text-xs font-bold tracking-widest uppercase relative cursor-pointer transition-colors flex items-center gap-2 ${
                activeTab === 'clients' ? 'text-[#142C1E]' : 'text-[#525955] hover:text-[#142C1E]'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Clients ({clients.length})</span>
              {activeTab === 'clients' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#142C1E]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`pb-4 text-xs font-bold tracking-widest uppercase relative cursor-pointer transition-colors flex items-center gap-2 ${
                activeTab === 'orders' ? 'text-[#142C1E]' : 'text-[#525955] hover:text-[#142C1E]'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Orders ({orders.length})</span>
              {activeTab === 'orders' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#142C1E]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('inquiries')}
              className={`pb-4 text-xs font-bold tracking-widest uppercase relative cursor-pointer transition-colors flex items-center gap-2 ${
                activeTab === 'inquiries' ? 'text-[#142C1E]' : 'text-[#525955] hover:text-[#142C1E]'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Inquiries ({inquiries.length})</span>
              {activeTab === 'inquiries' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#142C1E]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('razorpay')}
              className={`pb-4 text-xs font-bold tracking-widest uppercase relative cursor-pointer transition-colors flex items-center gap-2 ${
                activeTab === 'razorpay' ? 'text-[#142C1E]' : 'text-[#525955] hover:text-[#142C1E]'
              }`}
            >
              <CreditCard className="w-4 h-4 text-[#C5A467]" />
              <span>Razorpay Payments</span>
              {activeTab === 'razorpay' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#142C1E]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('schema')}
              className={`pb-4 text-xs font-bold tracking-widest uppercase relative cursor-pointer transition-colors flex items-center gap-2 ${
                activeTab === 'schema' ? 'text-[#142C1E]' : 'text-[#525955] hover:text-[#142C1E]'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Supabase Schema & Config</span>
              {activeTab === 'schema' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#142C1E]" />
              )}
            </button>
          </div>

          {/* Seed and Sync Quick Helpers */}
          <div className="flex items-center gap-2 pb-4">
            <button
              onClick={handleSeedProducts}
              disabled={seedingLoading}
              className="px-3 py-1.5 bg-[#FAF7F0] hover:bg-[#F2ECE1] text-[#142C1E] border border-[#142C1E]/20 text-[11px] font-semibold uppercase rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
              title="Seed 6 Initial Spice Catalog Products into Supabase Products table"
            >
              <Layers className="w-3 h-3 text-[#C5A467]" />
              <span>{seedingLoading ? 'Seeding...' : 'Seed Catalog to Supabase'}</span>
            </button>

            <button
              onClick={handleSyncPendingOrders}
              disabled={syncingOrders}
              className="px-3 py-1.5 bg-[#FAF7F0] hover:bg-[#F2ECE1] text-[#142C1E] border border-[#142C1E]/20 text-[11px] font-semibold uppercase rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
              title="Sync any offline or cached orders directly into Supabase"
            >
              <RefreshCw className={`w-3 h-3 text-[#2E5C32] ${syncingOrders ? 'animate-spin' : ''}`} />
              <span>{syncingOrders ? 'Syncing...' : 'Sync Orders'}</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Clients Directory */}
        {activeTab === 'clients' && (
          <div className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-[#525955] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by client name, phone, city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-[#FAF7F0] border border-[#142C1E]/15 rounded-xl text-xs focus:ring-2 focus:ring-[#C5A467] focus:outline-none"
                />
              </div>

              <div className="text-xs text-[#525955]">
                Showing <strong className="text-[#142C1E]">{filteredClients.length}</strong> of{' '}
                <strong className="text-[#142C1E]">{clients.length}</strong> clients
              </div>
            </div>

            {filteredClients.length === 0 ? (
              <div className="text-center py-16 space-y-3 bg-[#FAF7F0]/60 rounded-xl border border-dashed border-[#142C1E]/20">
                <Users className="w-10 h-10 text-[#C5A467] mx-auto" />
                <h4 className="font-serif text-lg font-bold text-[#142C1E]">No Clients Found</h4>
                <p className="text-xs text-[#525955] max-w-sm mx-auto">
                  When customers complete an order on the checkout page, their client data will automatically appear here and sync to Supabase.
                </p>
                <button
                  onClick={() => onNavigate && onNavigate('/shop')}
                  className="px-5 py-2 bg-[#142C1E] text-white text-xs uppercase font-bold rounded-lg cursor-pointer"
                >
                  Visit Shop Page
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF7F0] text-[#525955] font-semibold uppercase tracking-wider border-b border-[#142C1E]/10">
                    <tr>
                      <th className="py-3 px-4">Client Name</th>
                      <th className="py-3 px-4">Phone</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Location</th>
                      <th className="py-3 px-4">Orders</th>
                      <th className="py-3 px-4">Total Spent</th>
                      <th className="py-3 px-4">Last Order</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#142C1E]/10">
                    {filteredClients.map((client, idx) => (
                      <tr key={client.id || idx} className="hover:bg-[#FAF7F0]/40 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-[#142C1E] text-sm">{client.full_name}</div>
                          {client.address_line && (
                            <div className="text-[11px] text-[#525955] truncate max-w-xs">
                              {client.address_line}
                            </div>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <a
                            href={`tel:${client.phone}`}
                            className="font-medium text-[#142C1E] hover:text-[#C5A467] flex items-center gap-1.5"
                          >
                            <Phone className="w-3.5 h-3.5 text-[#C5A467]" />
                            <span>{client.phone}</span>
                          </a>
                        </td>
                        <td className="py-3.5 px-4">
                          <a
                            href={`mailto:${client.email}`}
                            className="text-[#525955] hover:text-[#142C1E] flex items-center gap-1.5"
                          >
                            <Mail className="w-3.5 h-3.5 text-[#525955]" />
                            <span>{client.email}</span>
                          </a>
                        </td>
                        <td className="py-3.5 px-4 text-[#525955]">
                          <div className="flex items-center gap-1 font-medium text-[#142C1E]">
                            <MapPin className="w-3 h-3 text-[#C5A467]" />
                            <span>
                              {client.city ? `${client.city}, ${client.state}` : client.state || 'India'}
                            </span>
                          </div>
                          {client.pincode && (
                            <div className="text-[10px] text-[#525955]">PIN: {client.pincode}</div>
                          )}
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-[#142C1E]">
                          <span className="px-2 py-0.5 bg-[#FAF7F0] border border-[#142C1E]/15 rounded-md">
                            {client.total_orders || 1} order{client.total_orders === 1 ? '' : 's'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-serif font-bold text-[#142C1E] tabular-nums text-sm">
                          ₹{client.total_spent || 0}
                        </td>
                        <td className="py-3.5 px-4 text-[11px] text-[#525955]">
                          {client.last_order_date
                            ? new Date(client.last_order_date).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })
                            : 'Recent'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Orders List */}
        {activeTab === 'orders' && (
          <div className="p-6 space-y-6">
            {orders.length === 0 ? (
              <div className="text-center py-16 space-y-3 bg-[#FAF7F0]/60 rounded-xl border border-dashed border-[#142C1E]/20">
                <ShoppingBag className="w-10 h-10 text-[#C5A467] mx-auto" />
                <h4 className="font-serif text-lg font-bold text-[#142C1E]">No Orders Yet</h4>
                <p className="text-xs text-[#525955] max-w-sm mx-auto">
                  Orders placed through your store will show up here, complete with customer details and line items.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((ord, idx) => (
                  <div
                    key={ord.order_id || idx}
                    className="p-5 bg-[#FAF7F0]/50 rounded-xl border border-[#142C1E]/15 space-y-4 hover:border-[#142C1E]/30 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#142C1E]/10 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-sm text-[#142C1E]">
                          {ord.order_id}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase bg-[#E0F2FE] text-[#0369A1]">
                          {ord.status || 'Confirmed'}
                        </span>
                        <span className="text-xs text-[#525955]">
                          {ord.created_at ? new Date(ord.created_at).toLocaleDateString('en-IN') : 'Recent'}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs text-[#525955]">Payment:</span>
                        <span className="uppercase text-xs font-bold text-[#142C1E]">
                          {ord.payment_method}
                        </span>
                        {ord.payment_id && (
                          <span className="px-2 py-0.5 bg-[#ECFDF5] text-[#065F46] rounded text-[10px] font-mono font-semibold" title="Razorpay Payment Transaction ID">
                            Txn: {ord.payment_id}
                          </span>
                        )}
                        <span className="text-base font-serif font-bold text-[#142C1E] ml-2">
                          ₹{ord.total}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      {/* Customer & Shipping info */}
                      <div className="space-y-1.5">
                        <span className="font-bold uppercase tracking-wider text-[#142C1E] text-[11px] block">
                          Client Details & Shipping Address:
                        </span>
                        <p className="font-bold text-[#142C1E]">{ord.customer_name}</p>
                        <p className="text-[#525955]">Phone: {ord.customer_phone}</p>
                        <p className="text-[#525955]">Email: {ord.customer_email}</p>
                        <p className="text-[#525955] leading-relaxed pt-1">
                          {ord.shipping_address?.addressLine}
                          {ord.shipping_address?.landmark && `, ${ord.shipping_address.landmark}`}
                          {ord.shipping_address?.city && `, ${ord.shipping_address.city}`}
                          {ord.shipping_address?.state && `, ${ord.shipping_address.state}`}
                          {ord.shipping_address?.pincode && ` - ${ord.shipping_address.pincode}`}
                        </p>
                      </div>

                      {/* Items */}
                      <div className="space-y-1.5">
                        <span className="font-bold uppercase tracking-wider text-[#142C1E] text-[11px] block">
                          Purchased Spices:
                        </span>
                        <div className="space-y-1.5 bg-white p-3 rounded-lg border border-[#142C1E]/10">
                          {Array.isArray(ord.items) &&
                            ord.items.map((it, itemIdx) => (
                              <div
                                key={itemIdx}
                                className="flex items-center justify-between text-xs py-1 border-b border-[#142C1E]/5 last:border-0"
                              >
                                <span className="font-medium text-[#142C1E]">
                                  {it.name} <span className="text-[#525955]">({it.selectedSize})</span> × {it.quantity}
                                </span>
                                <span className="font-serif font-bold text-[#142C1E]">
                                  ₹{it.price * it.quantity}
                                </span>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Inquiries */}
        {activeTab === 'inquiries' && (
          <div className="p-6 space-y-6">
            {inquiries.length === 0 ? (
              <div className="text-center py-16 space-y-3 bg-[#FAF7F0]/60 rounded-xl border border-dashed border-[#142C1E]/20">
                <MessageSquare className="w-10 h-10 text-[#C5A467] mx-auto" />
                <h4 className="font-serif text-lg font-bold text-[#142C1E]">No Inquiries Yet</h4>
                <p className="text-xs text-[#525955] max-w-sm mx-auto">
                  Messages submitted by clients via your Contact form will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {inquiries.map((iq, idx) => (
                  <div
                    key={iq.id || idx}
                    className="p-5 bg-[#FAF7F0]/50 rounded-xl border border-[#142C1E]/15 space-y-2 hover:border-[#142C1E]/30 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#142C1E]/10 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#142C1E]">{iq.name}</span>
                        <span className="text-[#525955] text-xs">({iq.email})</span>
                        {iq.phone && <span className="text-[#525955] text-xs">· Tel: {iq.phone}</span>}
                      </div>
                      <span className="text-[11px] text-[#525955]">
                        {iq.created_at ? new Date(iq.created_at).toLocaleDateString('en-IN') : 'Recent'}
                      </span>
                    </div>
                    {iq.subject && (
                      <div className="font-semibold text-xs text-[#142C1E]">
                        Subject: {iq.subject}
                      </div>
                    )}
                    <p className="text-xs text-[#525955] leading-relaxed bg-white p-3 rounded-lg border border-[#142C1E]/10">
                      "{iq.message}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Razorpay Payment Gateway Connection */}
        {activeTab === 'razorpay' && (
          <div className="p-6 space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] animate-pulse" />
                <span className="text-xs uppercase tracking-widest font-semibold text-[#142C1E]">
                  Razorpay India Payment Gateway
                </span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#142C1E]">
                Connect Your Razorpay Account & Receive Live Orders
              </h3>
              <p className="text-xs text-[#525955] leading-relaxed max-w-3xl">
                Razorpay allows your customers across India to pay instantly via UPI (Google Pay, PhonePe, Paytm),
                RuPay/Visa/Mastercard debit and credit cards, and NetBanking. Once paid, orders and client records are
                automatically validated and saved into your Supabase database.
              </p>
            </div>

            {/* Quick Status and Testing Panel */}
            <div className="bg-[#FAF7F0] border border-[#142C1E]/15 rounded-2xl p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#525955] block">
                    Gateway Status
                  </span>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2E5C32]" />
                    <span className="font-bold text-sm text-[#142C1E]">
                      Live Razorpay Merchant Gateway Linked
                    </span>
                    <span className="px-2 py-0.5 bg-[#ECFDF5] text-[#065F46] font-mono text-[10px] rounded-full font-semibold">
                      rzp_live_TkgQ4F9YJieteQ
                    </span>
                  </div>
                  <p className="text-[11px] text-[#525955]">
                    API endpoint <code className="bg-white px-1.5 py-0.5 rounded font-mono text-[#142C1E]">/api/razorpay/create-order</code> and signature verification are authenticated with your live keys.
                  </p>
                </div>

                <button
                  onClick={async () => {
                    setTestingRazorpay(true);
                    setRazorpayTestResult(null);
                    try {
                      const res = await fetch('/api/razorpay/create-order', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          amount: 125,
                          customerName: 'Test Client',
                          customerEmail: 'test@example.com',
                          customerPhone: '9876543210',
                        }),
                      });
                      const data = await res.json();
                      setRazorpayTestResult(data);
                    } catch (err: any) {
                      setRazorpayTestResult({ error: err.message });
                    } finally {
                      setTestingRazorpay(false);
                    }
                  }}
                  disabled={testingRazorpay}
                  className="px-4 py-2 bg-[#142C1E] hover:bg-[#1A3826] text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center gap-2 cursor-pointer shadow-xs transition-colors self-start sm:self-auto"
                >
                  <Zap className={`w-3.5 h-3.5 text-[#C5A467] ${testingRazorpay ? 'animate-bounce' : ''}`} />
                  <span>{testingRazorpay ? 'Pinging Gateway...' : 'Test Gateway API'}</span>
                </button>
              </div>

              {razorpayTestResult && (
                <div className="bg-[#0B1710] text-[#D1D5DB] p-4 rounded-xl text-xs font-mono space-y-1 border border-[#C5A467]/30">
                  <div className="text-[#C5A467] font-bold">API Test Response:</div>
                  <pre className="overflow-x-auto select-all">{JSON.stringify(razorpayTestResult, null, 2)}</pre>
                </div>
              )}
            </div>

            {/* Step-by-Step Setup Guide */}
            <div className="space-y-4">
              <h4 className="font-serif text-lg font-bold text-[#142C1E]">
                3-Step Connection Guide: How to Add Your Razorpay API Keys
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-[#142C1E]/15 shadow-xs space-y-3">
                  <div className="w-8 h-8 rounded-full bg-[#142C1E] text-[#FAF7F0] font-bold text-xs flex items-center justify-center">
                    1
                  </div>
                  <h5 className="font-bold text-sm text-[#142C1E]">Get API Keys from Razorpay</h5>
                  <p className="text-xs text-[#525955] leading-relaxed">
                    Log in to your Razorpay Dashboard, navigate to <strong>Settings</strong> &rarr; <strong>API Keys</strong>, and click <strong>Generate Key</strong>.
                  </p>
                  <a
                    href="https://dashboard.razorpay.com/app/keys"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#142C1E] hover:text-[#C5A467] underline"
                  >
                    <span>Open Razorpay Keys Dashboard</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#142C1E]/15 shadow-xs space-y-3">
                  <div className="w-8 h-8 rounded-full bg-[#142C1E] text-[#FAF7F0] font-bold text-xs flex items-center justify-center">
                    2
                  </div>
                  <h5 className="font-bold text-sm text-[#142C1E]">Configure Environment Variables</h5>
                  <p className="text-xs text-[#525955] leading-relaxed">
                    Set your Razorpay credentials in <code className="bg-[#FAF7F0] px-1 py-0.5 rounded text-[#142C1E]">.env.local</code> or AI Studio Secrets.
                  </p>
                  <button
                    onClick={() => {
                      const text = `NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_live_your_key_id"\nRAZORPAY_KEY_SECRET="your_key_secret"`;
                      navigator.clipboard.writeText(text);
                      setCopiedEnv(true);
                      setTimeout(() => setCopiedEnv(false), 2000);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#142C1E] hover:text-[#C5A467] cursor-pointer"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{copiedEnv ? 'Copied snippet!' : 'Copy env template'}</span>
                  </button>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#142C1E]/15 shadow-xs space-y-3">
                  <div className="w-8 h-8 rounded-full bg-[#142C1E] text-[#FAF7F0] font-bold text-xs flex items-center justify-center">
                    3
                  </div>
                  <h5 className="font-bold text-sm text-[#142C1E]">Receive Real UPI & Card Orders</h5>
                  <p className="text-xs text-[#525955] leading-relaxed">
                    Once keys are saved, all customer payments go directly into your bank account via Razorpay, and orders log in the Orders tab and Supabase database.
                  </p>
                </div>
              </div>
            </div>

            {/* Environment Variables Code Box */}
            <div className="space-y-2">
              <span className="font-bold text-xs uppercase tracking-wider text-[#142C1E] block">
                Environment Configuration Template (.env.local)
              </span>
              <pre className="bg-[#0B1710] text-[#D1D5DB] p-4 rounded-xl text-xs font-mono overflow-x-auto border border-[#C5A467]/20 select-all leading-relaxed">
{`# Razorpay Payment Gateway Configuration
# Get your keys at https://dashboard.razorpay.com/app/keys
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_or_live_YOUR_KEY_ID"
RAZORPAY_KEY_SECRET="YOUR_RAZORPAY_KEY_SECRET"`}
              </pre>
            </div>

            {/* Supported Payment Channels */}
            <div className="bg-[#FAF7F0] p-6 rounded-2xl border border-[#142C1E]/15 space-y-4">
              <h5 className="font-serif text-base font-bold text-[#142C1E]">
                Supported Payment Methods with Razorpay
              </h5>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-white p-3 rounded-xl border border-[#142C1E]/10 space-y-1">
                  <span className="font-bold text-[#142C1E] block">UPI / QR</span>
                  <span className="text-[#525955] text-[11px]">Google Pay, PhonePe, Paytm, BHIM, CRED</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-[#142C1E]/10 space-y-1">
                  <span className="font-bold text-[#142C1E] block">Cards</span>
                  <span className="text-[#525955] text-[11px]">RuPay, Visa, Mastercard, Maestro</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-[#142C1E]/10 space-y-1">
                  <span className="font-bold text-[#142C1E] block">NetBanking</span>
                  <span className="text-[#525955] text-[11px]">SBI, HDFC, ICICI, Axis, PNB & 50+ Banks</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-[#142C1E]/10 space-y-1">
                  <span className="font-bold text-[#142C1E] block">Cash on Delivery</span>
                  <span className="text-[#525955] text-[11px]">Doorstep cash collection on delivery</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: SQL Schema Setup Guide & Connection */}
        {activeTab === 'schema' && (
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <h3 className="font-serif text-xl font-bold text-[#142C1E]">
                Supabase SQL Setup & Connection Details
              </h3>
              <p className="text-xs text-[#525955] leading-relaxed">
                Here are your configured credentials and the ready-to-run SQL schema to create the tables in your Supabase project.
              </p>
            </div>

            {/* Connection Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-[#FAF7F0] p-4 rounded-xl border border-[#142C1E]/15 space-y-2">
                <span className="font-bold uppercase tracking-wider text-[#142C1E] block">
                  Supabase Project ID
                </span>
                <code className="block bg-white p-2.5 rounded-lg border border-[#142C1E]/10 font-mono text-[#142C1E] select-all">
                  rilxmhisjltxnatjwtrz
                </code>
                <span className="text-[11px] text-[#525955]">
                  Configured Project Reference
                </span>
              </div>

              <div className="bg-[#FAF7F0] p-4 rounded-xl border border-[#142C1E]/15 space-y-2">
                <span className="font-bold uppercase tracking-wider text-[#142C1E] block">
                  Supabase Endpoint URL
                </span>
                <code className="block bg-white p-2.5 rounded-lg border border-[#142C1E]/10 font-mono text-[#142C1E] select-all">
                  {SUPABASE_URL}
                </code>
                <span className="text-[11px] text-[#525955]">
                  REST API & Realtime Gateway
                </span>
              </div>

              <div className="bg-[#FAF7F0] p-4 rounded-xl border border-[#142C1E]/15 space-y-2 md:col-span-2">
                <span className="font-bold uppercase tracking-wider text-[#142C1E] block">
                  Supabase Publishable / Anon API Key
                </span>
                <code className="block bg-white p-2.5 rounded-lg border border-[#142C1E]/10 font-mono text-[#142C1E] select-all truncate">
                  {SUPABASE_ANON_KEY}
                </code>
                <span className="text-[11px] text-[#525955]">
                  Client-side authenticated key for database read/write
                </span>
              </div>
            </div>

            {/* SQL Setup Script */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-[#142C1E]">
                    SQL Schema Script (Postgres DDL)
                  </h4>
                  <p className="text-[11px] text-[#525955]">
                    Run this in your Supabase SQL Editor to create <code className="font-mono">clients</code>, <code className="font-mono">orders</code>, <code className="font-mono">inquiries</code>, and <code className="font-mono">products</code> tables.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="https://supabase.com/dashboard/project/rilxmhisjltxnatjwtrz/sql/new"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 bg-[#FAF7F0] hover:bg-[#F2ECE1] text-[#142C1E] border border-[#142C1E]/20 text-xs font-semibold rounded-lg flex items-center gap-1"
                  >
                    <span>Open Supabase SQL Editor</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <button
                    onClick={handleCopySql}
                    className="px-4 py-1.5 bg-[#142C1E] hover:bg-[#1A3826] text-white text-xs font-bold uppercase rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    {copiedSql ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSql ? 'Copied!' : 'Copy Script'}</span>
                  </button>
                </div>
              </div>

              <div className="relative">
                <pre className="bg-[#0B1710] text-[#D1D5DB] p-4 rounded-xl text-xs font-mono overflow-x-auto max-h-96 leading-relaxed border border-[#C5A467]/20 select-all">
                  {SUPABASE_SETUP_SQL}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
