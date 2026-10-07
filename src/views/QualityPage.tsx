'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useRegulatory } from '../context/RegulatoryContext';
import { ShieldCheck, Award, FileCheck2, FlaskConical, CheckCircle2 } from 'lucide-react';

interface QualityPageProps {
  onNavigate: (path: string) => void;
}

export const QualityPage: React.FC<QualityPageProps> = ({ onNavigate }) => {
  const { config, setIsEditorOpen } = useRegulatory();

  const tests = [
    {
      title: 'High-Performance Liquid Chromatography (HPLC)',
      standard: 'Curcuminoid Purity > 7.5%',
      result: 'Verified 100% Native',
      note: 'Confirms natural curcumin levels without artificial dye spiking.',
    },
    {
      title: 'Moisture & Water Activity Testing',
      standard: 'Below 8.5% Moisture',
      result: 'Aflatoxin & Mold Free',
      note: 'Ensures long-term stability and freshness in oxygen-barrier pouches.',
    },
    {
      title: 'Heavy Metal ICP-MS Screening',
      standard: 'Lead, Arsenic, Cadmium < FSSAI limits',
      result: 'Undetectable / Zero Risk',
      note: 'Guarantees soil is free of industrial runoff and toxic pesticide residues.',
    },
    {
      title: 'Zero Sudan Dye & Metanil Yellow Assay',
      standard: 'Zero Tolerance',
      result: 'Passed 100%',
      note: 'Never subjected to synthetic brightening agents commonly found in commercial bulk spices.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mx-auto space-y-3"
      >
        <span className="text-xs font-semibold tracking-widest uppercase text-[#C5A467]">
          Laboratory Verification & Standards
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#142C1E]">
          Uncompromising Purity & Safety
        </h1>
        <p className="text-sm text-[#525955] leading-relaxed">
          Every harvest batch is certified under FSSAI regulations and tested by independent NABL-accredited analytical laboratories.
        </p>
      </motion.div>

      {/* Central License Banner */}
      <div className="p-6 sm:p-8 bg-[#142C1E] text-[#FAF7F0] rounded-3xl border border-[#C5A467]/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#0C1F14] text-[#C5A467] flex items-center justify-center shrink-0 border border-[#C5A467]/40">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C5A467]">
              FSSAI Food Business Operator
            </span>
            <h2 className="font-serif text-2xl font-bold">Central License #{config.fssaiLicenceNo}</h2>
            <p className="text-xs text-[#FAF7F0]/70">{config.fboName} · {config.businessAddress}</p>
          </div>
        </div>

        <button
          onClick={() => setIsEditorOpen(true)}
          className="px-5 py-2.5 bg-[#C5A467] text-[#122619] font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#D4B579] transition-colors shrink-0"
        >
          Manage Disclosures
        </button>
      </div>

      {/* Testing Protocol Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tests.map((t, idx) => (
          <div key={idx} className="p-6 bg-white rounded-2xl border border-[#142C1E]/15 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#2E5C32] flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                {t.result}
              </span>
              <span className="text-[11px] text-[#525955] font-mono">{t.standard}</span>
            </div>
            <h3 className="font-serif text-lg font-bold text-[#142C1E]">{t.title}</h3>
            <p className="text-xs text-[#525955] leading-relaxed">{t.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
