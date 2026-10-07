'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useRegulatory } from '../context/RegulatoryContext';
import { syncInquiryToSupabase } from '../lib/supabase';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

interface ContactPageProps {
  onNavigate?: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const { config } = useRegulatory();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    
    // Sync to Supabase inquiries table & backup locally
    syncInquiryToSupabase({
      name: form.name,
      email: form.email,
      phone: form.phone,
      message: form.message,
    }).catch(console.warn);

    if (typeof window !== 'undefined') {
      try {
        const stored = JSON.parse(localStorage.getItem('kathlouria_inquiries') || '[]');
        localStorage.setItem(
          'kathlouria_inquiries',
          JSON.stringify([
            {
              name: form.name,
              email: form.email,
              phone: form.phone,
              message: form.message,
              created_at: new Date().toISOString(),
            },
            ...stored,
          ])
        );
      } catch {}
    }

    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mx-auto space-y-3"
      >
        <span className="text-xs font-semibold tracking-widest uppercase text-[#C5A467]">
          Connect with the Farmstead
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#142C1E]">
          We Are Here to Assist Your Kitchen
        </h1>
        <p className="text-sm text-[#525955] leading-relaxed">
          Questions regarding spice origin, bulk orders, wholesale supply, or harvest updates? Reach out directly to our farm team.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-[#142C1E]/15 p-6 sm:p-8 space-y-6 shadow-xs">
          <h2 className="font-serif text-2xl font-bold text-[#142C1E] border-b border-[#142C1E]/10 pb-3">
            Farmstead Office
          </h2>

          <div className="space-y-4 text-xs text-[#525955]">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#C5A467] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#142C1E] block uppercase">Address:</span>
                <p>{config.businessAddress}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-[#C5A467] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#142C1E] block uppercase">Customer Care:</span>
                <p>{config.customerCareNumber}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-[#C5A467] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#142C1E] block uppercase">Email Address:</span>
                <p>{config.customerCareEmail}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#C5A467] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#142C1E] block uppercase">Operating Hours:</span>
                <p>{config.operatingHours}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#142C1E]/15 p-6 sm:p-8 space-y-6 shadow-xs">
          <h2 className="font-serif text-2xl font-bold text-[#142C1E] border-b border-[#142C1E]/10 pb-3">
            Send an Inquiry
          </h2>

          {submitted ? (
            <div className="p-8 text-center space-y-3 bg-[#FAF7F0] rounded-xl border border-[#2E5C32]/30">
              <CheckCircle2 className="w-12 h-12 text-[#2E5C32] mx-auto" />
              <h3 className="font-serif text-xl font-bold text-[#142C1E]">Message Received</h3>
              <p className="text-xs text-[#525955] max-w-sm mx-auto">
                Thank you. Our farm team will reply to {form.email} within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2 bg-[#142C1E] text-white text-xs uppercase font-bold rounded-lg"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold uppercase text-[#142C1E] mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Navjot Kaur"
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#142C1E]/20 rounded-xl focus:ring-2 focus:ring-[#C5A467] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase text-[#142C1E] mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="e.g. navjot@example.com"
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#142C1E]/20 rounded-xl focus:ring-2 focus:ring-[#C5A467] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase text-[#142C1E] mb-1">Phone Number (Optional)</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="e.g. +91 98765 43210"
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#142C1E]/20 rounded-xl focus:ring-2 focus:ring-[#C5A467] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-[#142C1E] mb-1">Inquiry / Message *</label>
                <textarea
                  rows={4}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us what you are looking for..."
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#142C1E]/20 rounded-xl focus:ring-2 focus:ring-[#C5A467] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#142C1E] hover:bg-[#1A3826] text-[#FAF7F0] font-bold text-xs uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
              >
                <span>Submit Inquiry</span>
                <Send className="w-4 h-4 text-[#C5A467]" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
