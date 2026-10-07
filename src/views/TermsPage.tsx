'use client';

import React from 'react';
import { useRegulatory } from '../context/RegulatoryContext';

interface TermsPageProps {
  onNavigate?: (path: string) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigate }) => {
  const { config } = useRegulatory();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      <div className="space-y-2 border-b border-[#142C1E]/15 pb-4">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#142C1E]">
          Terms of Service
        </h1>
        <p className="text-xs text-[#525955]">
          Effective as of 2026 · Governing Agricultural Direct Sales
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-[#142C1E]/15 p-6 sm:p-8 space-y-6 text-xs text-[#525955] leading-relaxed shadow-xs">
        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-[#142C1E]">1. Overview & Agricultural Produce</h2>
          <p>
            By purchasing from Kathlouria Farms ({config.fboName}), you acknowledge that all products are 100% natural agricultural commodities. Slight natural variations in color, grind texture, and aroma intensity may occur between harvest seasons and micro-climates.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-[#142C1E]">2. Pricing & Statutory Taxes</h2>
          <p>
            All listed prices are denominated in Indian Rupees (INR) and are inclusive of Goods and Services Tax (GST) as per applicable Central Board of Indirect Taxes and Customs (CBIC) food commodity tariffs.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-[#142C1E]">3. Orders & Cancellation</h2>
          <p>
            Orders can be canceled prior to dispatch by contacting {config.customerCareNumber}. Once an order is sealed and handed to the courier partner, cancellation is not possible due to food safety and hygiene protocols.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-[#142C1E]">4. Jurisdiction</h2>
          <p>
            Any dispute arising out of or related to these transactions shall be subject to the exclusive jurisdiction of the competent courts in Punjab, India.
          </p>
        </section>
      </div>
    </div>
  );
};
