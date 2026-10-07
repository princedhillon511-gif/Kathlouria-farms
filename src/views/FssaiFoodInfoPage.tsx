'use client';

import React from 'react';
import { useRegulatory } from '../context/RegulatoryContext';
import { ShieldCheck, FileCheck, CheckCircle2 } from 'lucide-react';

interface FssaiFoodInfoPageProps {
  onNavigate: (path: string) => void;
}

export const FssaiFoodInfoPage: React.FC<FssaiFoodInfoPageProps> = ({ onNavigate }) => {
  const { config, setIsEditorOpen } = useRegulatory();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      <div className="space-y-2 border-b border-[#142C1E]/15 pb-4">
        <div className="inline-flex items-center gap-1.5 text-xs text-[#2E5C32] font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Statutory Compliance Registry</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#142C1E]">
          FSSAI & Food Safety Information
        </h1>
        <p className="text-xs text-[#525955]">
          Published under the Food Safety and Standards (Packaging and Labelling) Regulations, 2011 & Legal Metrology Rules.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-[#142C1E]/15 p-6 sm:p-8 space-y-6 shadow-xs text-xs text-[#525955]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-4 bg-[#FAF7F0] rounded-xl border border-[#142C1E]/10 space-y-1">
            <span className="font-bold text-[#142C1E] uppercase">Central FSSAI License:</span>
            <p className="font-serif text-lg font-bold text-[#142C1E] tabular-nums">{config.fssaiLicenceNo}</p>
          </div>

          <div className="p-4 bg-[#FAF7F0] rounded-xl border border-[#142C1E]/10 space-y-1">
            <span className="font-bold text-[#142C1E] uppercase">Food Business Operator:</span>
            <p className="font-bold text-[#142C1E]">{config.fboName}</p>
          </div>

          <div className="p-4 bg-[#FAF7F0] rounded-xl border border-[#142C1E]/10 space-y-1">
            <span className="font-bold text-[#142C1E] uppercase">Manufacturer Name:</span>
            <p>{config.manufacturerName}</p>
          </div>

          <div className="p-4 bg-[#FAF7F0] rounded-xl border border-[#142C1E]/10 space-y-1">
            <span className="font-bold text-[#142C1E] uppercase">Packer Name:</span>
            <p>{config.packerName}</p>
          </div>
        </div>

        <div className="p-4 bg-[#FAF7F0] rounded-xl border border-[#142C1E]/10 space-y-1">
          <span className="font-bold text-[#142C1E] uppercase">Registered Processing Facility:</span>
          <p>{config.businessAddress}</p>
        </div>

        <div className="space-y-3 pt-4 border-t border-[#142C1E]/10 leading-relaxed">
          <h3 className="font-serif text-base font-bold text-[#142C1E]">Statutory Declarations</h3>
          <ul className="space-y-2 list-disc pl-5">
            <li>100% Vegetarian product. Contains green vegetarian indicator mark on all retail packaging.</li>
            <li>No artificial colors, flavors, chemical preservatives, MSG, or synthetic food colors added.</li>
            <li>Storage: Store in a cool, dark, and dry place. Keep in an airtight container once opened.</li>
            <li>Country of Origin: India. Grown and packed in India.</li>
          </ul>
        </div>

        <div className="pt-4 flex justify-between items-center">
          <button
            onClick={() => setIsEditorOpen(true)}
            className="px-4 py-2 bg-[#142C1E] text-white text-xs uppercase font-bold rounded-lg"
          >
            Update FSSAI Records
          </button>
          <button
            onClick={() => onNavigate('/shop')}
            className="text-[#142C1E] font-bold text-xs uppercase hover:underline"
          >
            Return to Spice Shop
          </button>
        </div>
      </div>
    </div>
  );
};
