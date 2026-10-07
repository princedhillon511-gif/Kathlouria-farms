'use client';

import React from 'react';
import { useRegulatory } from '../context/RegulatoryContext';
import { ShieldCheck, RefreshCw, CheckCircle2 } from 'lucide-react';

interface RefundPolicyPageProps {
  onNavigate?: (path: string) => void;
}

export const RefundPolicyPage: React.FC<RefundPolicyPageProps> = ({ onNavigate }) => {
  const { config } = useRegulatory();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      <div className="space-y-2 border-b border-[#142C1E]/15 pb-4">
        <div className="inline-flex items-center gap-1.5 text-xs text-[#2E5C32] font-bold uppercase tracking-wider">
          <RefreshCw className="w-4 h-4" />
          <span>Customer Assurance Guarantee</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#142C1E]">
          Returns & Refund Policy
        </h1>
        <p className="text-xs text-[#525955]">
          Food hygiene standards and replacement guidelines.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-[#142C1E]/15 p-6 sm:p-8 space-y-6 text-xs text-[#525955] leading-relaxed shadow-xs">
        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-[#142C1E]">1. Food Safety Non-Returnable Policy</h2>
          <p>
            Due to stringent FSSAI public health, sanitation, and food safety protocols, edible agricultural spices and packaged seasonings cannot be returned once delivered and unsealed.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-[#142C1E]">2. Damaged or Tampered Shipments</h2>
          <p>
            If your package arrives physically torn, tampered with, or if incorrect items were delivered, notify us within 48 hours of receipt. Please email photographs of the outer courier carton and inner pouch to <span className="font-bold text-[#142C1E]">{config.customerCareEmail}</span> or WhatsApp <span className="font-bold text-[#142C1E]">{config.customerCareNumber}</span>.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-[#142C1E]">3. Replacements & Full Refunds</h2>
          <p>
            Upon verification of damage during courier transit, Kathlouria Farms will immediately dispatch a fresh replacement batch at zero additional cost or initiate a 100% refund back to your original source payment method within 3 to 5 business days.
          </p>
        </section>
      </div>
    </div>
  );
};
