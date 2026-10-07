import React from 'react';
import { BrandLogo } from './BrandLogo';
import { useRegulatory } from '../context/RegulatoryContext';
import { ShieldCheck, Phone, Mail, MapPin, Instagram, Facebook, Twitter, Youtube, Database } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { config, setIsEditorOpen } = useRegulatory();

  const handleNav = (path: string) => {
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#122619] text-[#FAF7F0] border-t border-[#C5A467]/30 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#FAF7F0]/10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={() => handleNav('/')}
              className="text-left focus-visible:outline-none"
              aria-label="Kathlouria Farms"
            >
              <BrandLogo variant="horizontal" theme="light-on-dark" size="lg" />
            </button>
            <p className="text-sm text-[#FAF7F0]/80 max-w-sm leading-relaxed mt-2">
              Kathlouria Farms is an authentic Indian agricultural brand delivering single-origin and thoughtfully cured culinary spices from our farm to your family.
            </p>
            <div className="pt-2 text-xs text-[#C5A467] font-semibold tracking-widest uppercase">
              ESTD. 1891 · TRADITIONAL INDIAN FARM HERITAGE
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-3">
              <a
                href="#social"
                onClick={e => e.preventDefault()}
                className="w-8 h-8 rounded-full border border-[#FAF7F0]/20 flex items-center justify-center text-[#FAF7F0] hover:text-[#C5A467] hover:border-[#C5A467] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#social"
                onClick={e => e.preventDefault()}
                className="w-8 h-8 rounded-full border border-[#FAF7F0]/20 flex items-center justify-center text-[#FAF7F0] hover:text-[#C5A467] hover:border-[#C5A467] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#social"
                onClick={e => e.preventDefault()}
                className="w-8 h-8 rounded-full border border-[#FAF7F0]/20 flex items-center justify-center text-[#FAF7F0] hover:text-[#C5A467] hover:border-[#C5A467] transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#social"
                onClick={e => e.preventDefault()}
                className="w-8 h-8 rounded-full border border-[#FAF7F0]/20 flex items-center justify-center text-[#FAF7F0] hover:text-[#C5A467] hover:border-[#C5A467] transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-[#C5A467] tracking-wider uppercase">
              Farm & Spices
            </h4>
            <ul className="space-y-2 text-xs text-[#FAF7F0]/80">
              <li>
                <button onClick={() => handleNav('/shop')} className="hover:text-[#C5A467] transition-colors">
                  Shop Spices
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/product/lakadong-turmeric-powder')} className="hover:text-[#C5A467] transition-colors">
                  Lakadong Turmeric
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/our-story')} className="hover:text-[#C5A467] transition-colors">
                  Our Story & Heritage
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/farm-sourcing')} className="hover:text-[#C5A467] transition-colors">
                  Farm & Sourcing Journey
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/quality')} className="hover:text-[#C5A467] transition-colors">
                  Quality You Can Trace
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care & Policies */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-[#C5A467] tracking-wider uppercase">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs text-[#FAF7F0]/80">
              <li>
                <button onClick={() => handleNav('/contact')} className="hover:text-[#C5A467] transition-colors">
                  Contact Us
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/shipping-policy')} className="hover:text-[#C5A467] transition-colors">
                  Shipping & Delivery Policy
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/refund-policy')} className="hover:text-[#C5A467] transition-colors">
                  Refund & Cancellation Policy
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/privacy-policy')} className="hover:text-[#C5A467] transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/terms')} className="hover:text-[#C5A467] transition-colors">
                  Terms & Conditions
                </button>
              </li>
              <li className="pt-1">
                <button
                  onClick={() => handleNav('/clients')}
                  className="hover:text-[#4ADE80] transition-colors flex items-center gap-1.5 text-[#4ADE80] font-semibold"
                >
                  <Database className="w-3.5 h-3.5" />
                  <span>Clients & Orders (Supabase)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Statutory Food Safety & FSSAI Information */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-serif text-base font-bold text-[#C5A467] tracking-wider uppercase">
                Food Safety / FSSAI
              </h4>
              <button
                onClick={() => setIsEditorOpen(true)}
                className="text-[10px] text-[#C5A467] underline hover:text-white"
                title="Edit statutory details"
              >
                Edit
              </button>
            </div>
            <div className="p-3 bg-[#0F1F14] border border-[#C5A467]/25 rounded text-[11px] text-[#FAF7F0]/80 space-y-1.5">
              <div className="flex items-center gap-1.5 text-[#C5A467] font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Statutory Food Compliance</span>
              </div>
              <p>
                <strong className="text-white">FSSAI Lic. No:</strong> {config.fssaiLicenceNo}
              </p>
              <p>
                <strong className="text-white">FBO:</strong> {config.fboName}
              </p>
              <button
                onClick={() => handleNav('/fssai-food-information')}
                className="text-[#C5A467] hover:underline text-[10px] font-semibold tracking-wider uppercase pt-1 block"
              >
                View Full Mandatory Food Info →
              </button>
            </div>

            <div className="text-[11px] text-[#FAF7F0]/70 space-y-1.5">
              <div className="flex items-center gap-1.5">
                <Phone className="w-3 h-3 text-[#C5A467] shrink-0" />
                <a
                  href={`tel:${config.customerCareNumber.replace(/\s+/g, '')}`}
                  className="hover:text-[#C5A467] transition-colors"
                >
                  {config.customerCareNumber}
                </a>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3 h-3 text-[#C5A467] shrink-0" />
                <a
                  href={`mailto:${config.customerCareEmail}`}
                  className="hover:text-[#C5A467] transition-colors break-all"
                >
                  {config.customerCareEmail}
                </a>
              </div>
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3 h-3 text-[#C5A467] shrink-0 mt-0.5" />
                <span className="line-clamp-2">{config.businessAddress}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright and Legal Statement */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#FAF7F0]/60 gap-4">
          <p>© 2026 Kathlouria Farms. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>From Our Farm, To Your Family.</span>
            <span>·</span>
            <span>Authentic Indian Farm Produce</span>
            <span>·</span>
            <button
              onClick={() => setIsEditorOpen(true)}
              className="text-[#C5A467] hover:underline"
            >
              Update Food Details
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
