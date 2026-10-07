import React, { useState } from 'react';
import { useRegulatory } from '../context/RegulatoryContext';
import { X, Check, RotateCcw, ShieldCheck, AlertCircle } from 'lucide-react';

export const RegulatoryEditorModal: React.FC = () => {
  const { config, updateConfig, resetConfig, isEditorOpen, setIsEditorOpen } = useRegulatory();

  const [formValues, setFormValues] = useState(config);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isEditorOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig(formValues);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setIsEditorOpen(false);
    }, 1200);
  };

  const handleReset = () => {
    resetConfig();
    setIsEditorOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-12">
      <div className="fixed inset-0 bg-[#122619]/70 backdrop-blur-xs" onClick={() => setIsEditorOpen(false)} />

      <div className="relative max-w-2xl mx-auto bg-[#FAF7F0] border border-[#C5A467] rounded-xl shadow-2xl overflow-hidden z-10">
        {/* Header */}
        <div className="bg-[#142C1E] text-[#FAF7F0] px-6 py-5 flex items-center justify-between border-b border-[#C5A467]/30">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#C5A467]" />
            <div>
              <h3 className="font-serif text-xl font-bold tracking-wide">FSSAI & Regulatory Manager</h3>
              <p className="text-[11px] text-[#FAF7F0]/70">
                Official statutory information editable by brand management
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsEditorOpen(false)}
            className="text-[#FAF7F0] hover:text-[#C5A467] p-1 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Legal Advisory Banner */}
        <div className="bg-[#FFF9EC] border-b border-[#C5A467]/30 px-6 py-3 flex items-start gap-2.5 text-xs text-[#6B5526]">
          <AlertCircle className="w-4 h-4 text-[#C5A467] shrink-0 mt-0.5" />
          <p>
            In compliance with Indian Food Safety & Standards Regulations (e-commerce & packaging standards), food business operators must display verified FSSAI licence numbers, packer/manufacturer addresses, and customer care channels before order completion. Placeholders are maintained until formal certification is supplied.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[65vh] overflow-y-auto text-xs">
          <div>
            <label className="block font-semibold text-[#122619] mb-1">
              FSSAI Licence / Registration No. (Mandatory)
            </label>
            <input
              type="text"
              value={formValues.fssaiLicenceNo}
              onChange={e => setFormValues({ ...formValues, fssaiLicenceNo: e.target.value })}
              className="w-full bg-[#FDFCFA] border border-[#1A3826]/20 rounded px-3 py-2 text-[#122619] focus:outline-none focus:ring-1 focus:ring-[#1A3826]"
              placeholder="e.g. 1002XXXXXXXXXX or state licence"
            />
            <span className="text-[10px] text-[#525955] mt-1 block">
              Leave as placeholder or enter the 14-digit state/central FSSAI licence number once approved.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-[#122619] mb-1">
                Food Business Operator (FBO) Name
              </label>
              <input
                type="text"
                value={formValues.fboName}
                onChange={e => setFormValues({ ...formValues, fboName: e.target.value })}
                className="w-full bg-[#FDFCFA] border border-[#1A3826]/20 rounded px-3 py-2 text-[#122619] focus:outline-none focus:ring-1 focus:ring-[#1A3826]"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#122619] mb-1">
                Manufacturer Name & Unit
              </label>
              <input
                type="text"
                value={formValues.manufacturerName}
                onChange={e => setFormValues({ ...formValues, manufacturerName: e.target.value })}
                className="w-full bg-[#FDFCFA] border border-[#1A3826]/20 rounded px-3 py-2 text-[#122619] focus:outline-none focus:ring-1 focus:ring-[#1A3826]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-[#122619] mb-1">
                Packer Name & Unit
              </label>
              <input
                type="text"
                value={formValues.packerName}
                onChange={e => setFormValues({ ...formValues, packerName: e.target.value })}
                className="w-full bg-[#FDFCFA] border border-[#1A3826]/20 rounded px-3 py-2 text-[#122619] focus:outline-none focus:ring-1 focus:ring-[#1A3826]"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#122619] mb-1">
                Customer Care Helpline
              </label>
              <input
                type="text"
                value={formValues.customerCareNumber}
                onChange={e => setFormValues({ ...formValues, customerCareNumber: e.target.value })}
                className="w-full bg-[#FDFCFA] border border-[#1A3826]/20 rounded px-3 py-2 text-[#122619] focus:outline-none focus:ring-1 focus:ring-[#1A3826]"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-[#122619] mb-1">
              Registered Business & Facility Address
            </label>
            <textarea
              rows={2}
              value={formValues.businessAddress}
              onChange={e => setFormValues({ ...formValues, businessAddress: e.target.value })}
              className="w-full bg-[#FDFCFA] border border-[#1A3826]/20 rounded px-3 py-2 text-[#122619] focus:outline-none focus:ring-1 focus:ring-[#1A3826]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-[#122619] mb-1">
                Customer Support Email
              </label>
              <input
                type="email"
                value={formValues.customerCareEmail}
                onChange={e => setFormValues({ ...formValues, customerCareEmail: e.target.value })}
                className="w-full bg-[#FDFCFA] border border-[#1A3826]/20 rounded px-3 py-2 text-[#122619] focus:outline-none focus:ring-1 focus:ring-[#1A3826]"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#122619] mb-1">
                Free Shipping Threshold (₹)
              </label>
              <input
                type="number"
                value={formValues.freeShippingThreshold}
                onChange={e => setFormValues({ ...formValues, freeShippingThreshold: Number(e.target.value) })}
                className="w-full bg-[#FDFCFA] border border-[#1A3826]/20 rounded px-3 py-2 text-[#122619] focus:outline-none focus:ring-1 focus:ring-[#1A3826]"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-[#1A3826]/10 flex items-center justify-between">
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-[#525955] hover:text-[#992D1D] flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Standard Defaults</span>
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsEditorOpen(false)}
                className="px-4 py-2 border border-[#1A3826]/20 text-[#122619] rounded hover:bg-[#1A3826]/5 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#1A3826] hover:bg-[#122619] text-[#FAF7F0] font-semibold rounded flex items-center gap-1.5 shadow-sm"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-[#C5A467]" />
                    <span>Updated Live!</span>
                  </>
                ) : (
                  <span>Save Regulatory Info</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
