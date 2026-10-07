'use client';

import React from 'react';
import { useRegulatory } from '../context/RegulatoryContext';

interface PrivacyPolicyPageProps {
  onNavigate?: (path: string) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigate }) => {
  const { config } = useRegulatory();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      <div className="space-y-2 border-b border-[#142C1E]/15 pb-4">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#142C1E]">
          Privacy Policy
        </h1>
        <p className="text-xs text-[#525955]">
          Last revised: 2026 · Kathlouria Farms
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-[#142C1E]/15 p-6 sm:p-8 space-y-6 text-xs text-[#525955] leading-relaxed shadow-xs">
        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-[#142C1E]">1. Information We Collect</h2>
          <p>
            When you purchase from Kathlouria Farms or inquire via our contact channels, we collect essential customer delivery details including your full name, postal delivery address, phone number, and email. This data is exclusively used to prepare and dispatch your spice order.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-[#142C1E]">2. Payment Data Security</h2>
          <p>
            All online transactions (UPI, Credit/Debit Cards, Net Banking) are securely routed through PCI-DSS Level 1 compliant Indian payment gateways. Kathlouria Farms does not store credit card numbers or banking passwords on our servers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-[#142C1E]">3. Data Sharing & Third Parties</h2>
          <p>
            We strictly share your shipping address and contact phone number with our trusted pan-India logistics partners (such as Delhivery, Blue Dart, and India Post) strictly for the purpose of doorstep delivery. We never sell or lease customer information to third-party advertisers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-[#142C1E]">4. Contact Our Data Desk</h2>
          <p>
            For privacy inquiries, please contact {config.customerCareEmail} or write to our registered facility at {config.businessAddress}.
          </p>
        </section>
      </div>
    </div>
  );
};
