'use client';

import React from 'react';
import { useRegulatory } from '../context/RegulatoryContext';
import { Truck, CheckCircle2, ShieldCheck } from 'lucide-react';

interface ShippingPolicyPageProps {
  onNavigate?: (path: string) => void;
}

export const ShippingPolicyPage: React.FC<ShippingPolicyPageProps> = ({ onNavigate }) => {
  const { config } = useRegulatory();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      <div className="space-y-2 border-b border-[#142C1E]/15 pb-4">
        <div className="inline-flex items-center gap-1.5 text-xs text-[#2E5C32] font-bold uppercase tracking-wider">
          <Truck className="w-4 h-4" />
          <span>Pan-India Logistics</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#142C1E]">
          Shipping & Delivery Policy
        </h1>
        <p className="text-xs text-[#525955]">
          Airtight packaging & express farm dispatch across 19,000+ Indian PIN codes.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-[#142C1E]/15 p-6 sm:p-8 space-y-6 text-xs text-[#525955] leading-relaxed shadow-xs">
        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-[#142C1E]">1. Pan-India Delivery Timelines</h2>
          <p>
            Orders are dispatched within 24 to 48 hours of milling and batch packing. Metro cities (Delhi, Mumbai, Bengaluru, Chennai, Kolkata, Hyderabad) typically receive delivery within 3 to 4 business days. Other non-metro and regional PIN codes are delivered within 4 to 6 business days.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-[#142C1E]">2. Shipping Charges</h2>
          <div className="p-4 bg-[#FAF7F0] rounded-xl border border-[#142C1E]/10 space-y-1">
            <p className="font-bold text-[#142C1E]">
              Orders ₹{config.freeShippingThreshold} & Above: <span className="text-[#2E5C32]">Complimentary Free Shipping</span>
            </p>
            <p>
              Orders below ₹{config.freeShippingThreshold}: Flat nominal shipping fee of ₹{config.standardShippingFee} pan-India.
            </p>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-[#142C1E]">3. Package Tracking & Order Updates</h2>
          <p>
            Once your spice package is sealed and handed to our logistics partner, an automated SMS and email containing the AWB tracking number and live link will be dispatched to your registered contact info.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-[#142C1E]">4. Special Packaging Safeguards</h2>
          <p>
            All ground and whole spices are sealed in multi-layer food-grade pouches with high moisture-barrier foil linings to ensure protection against ambient humidity during transit.
          </p>
        </section>
      </div>
    </div>
  );
};
