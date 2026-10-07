'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { INITIAL_PRODUCTS } from '../data/products';
import { ProductArtwork } from '../components/ProductArtwork';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { useRegulatory } from '../context/RegulatoryContext';
import {
  ArrowLeft,
  ShoppingBag,
  Check,
  ShieldCheck,
  Award,
  Sparkles,
  MapPin,
  Clock,
  Info,
  ChevronRight,
  Plus,
  Minus,
  Truck,
  Leaf,
} from 'lucide-react';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onNavigate: (path: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBack,
  onNavigate,
}) => {
  const { addToCart } = useCart();
  const { config, setIsEditorOpen } = useRegulatory();

  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'nutrition' | 'fssai' | 'culinary'>('details');

  const selectedSize = product.sizes[selectedSizeIndex] || product.sizes[0];

  const handleAddToCart = () => {
    addToCart(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        selectedSize: selectedSize.size,
        price: selectedSize.price,
        mrp: selectedSize.mrp,
        weightGrams: selectedSize.weightGrams,
        colorTone: product.colorTone,
      },
      quantity
    );
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const relatedProducts = INITIAL_PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category
  ).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-12 pb-24 md:pb-12">
      {/* Navigation Breadcrumb & Back Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#142C1E] hover:text-[#C5A467] transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Spice Catalog</span>
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs text-[#525955]">
          <span className="hover:underline cursor-pointer" onClick={() => onNavigate('/')}>
            Home
          </span>
          <span>/</span>
          <span className="hover:underline cursor-pointer" onClick={() => onNavigate('/shop')}>
            Shop
          </span>
          <span>/</span>
          <span className="text-[#142C1E] font-semibold">{product.name}</span>
        </div>
      </div>

      {/* Main Contiguous Purchase Layout (2-Column Desktop, 1-Column Mobile) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Visual Artwork Gallery */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-6 bg-[#FAF7F0] border border-[#142C1E]/15 rounded-2xl p-6 sm:p-10 flex flex-col items-center justify-center relative overflow-hidden"
        >
          <div className="w-full max-w-md mx-auto aspect-square flex items-center justify-center">
            <ProductArtwork slug={product.slug} size="lg" />
          </div>

          {/* Heritage Tag Overlay */}
          <div className="absolute top-4 left-4 flex flex-col gap-1.5">
            <span className="px-3 py-1 bg-[#142C1E] text-[#FAF7F0] text-[11px] font-semibold tracking-widest uppercase rounded">
              {product.categoryLabel}
            </span>
            {product.isHero && (
              <span className="px-3 py-1 bg-[#C5A467] text-[#122619] text-[10px] font-bold tracking-widest uppercase rounded">
                Signature Harvest
              </span>
            )}
          </div>

          <div className="w-full mt-6 pt-4 border-t border-[#142C1E]/10 flex items-center justify-between text-xs text-[#525955]">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#C5A467]" />
              <span>{product.origin}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Leaf className="w-3.5 h-3.5 text-[#2E5C32]" />
              <span>Zero Artificial Additives</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#C5A467]">
              <span>Kathlouria Farms · Punjab</span>
              <span>·</span>
              <span>Estd. 1891</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#142C1E] leading-tight">
              {product.name}
            </h1>

            {product.subName && (
              <p className="text-base text-[#C5A467] font-medium tracking-wide">
                {product.subName}
              </p>
            )}

            <p className="text-sm text-[#525955] leading-relaxed pt-2">
              {product.fullDescription}
            </p>
          </div>

          {/* Price Header */}
          <div className="p-4 bg-[#F5EFE4] rounded-xl border border-[#C5A467]/20 flex items-baseline justify-between">
            <div>
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-[#142C1E] tabular-nums">
                  ₹{selectedSize.price}
                </span>
                {selectedSize.mrp > selectedSize.price && (
                  <span className="text-sm text-[#525955] line-through tabular-nums">
                    MRP: ₹{selectedSize.mrp}
                  </span>
                )}
              </div>
              <span className="text-[11px] text-[#525955] tracking-wide uppercase">
                Inclusive of all statutory taxes · Pan-India Dispatch
              </span>
            </div>

            {selectedSize.inStock ? (
              <span className="px-2.5 py-1 bg-[#2E5C32]/10 text-[#2E5C32] text-xs font-semibold rounded-full flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#2E5C32]" />
                In Stock
              </span>
            ) : (
              <span className="px-2.5 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                Out of Stock
              </span>
            )}
          </div>

          {/* Size Selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#142C1E] tracking-wider uppercase">Select Pack Size:</span>
              <span className="text-[#525955] font-semibold">{selectedSize.size} ({selectedSize.weightGrams}g)</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {product.sizes.map((sz, idx) => {
                const isSelected = selectedSizeIndex === idx;
                return (
                  <button
                    key={sz.size}
                    type="button"
                    onClick={() => setSelectedSizeIndex(idx)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#142C1E] text-[#FAF7F0] border-[#142C1E] shadow-sm'
                        : 'bg-white text-[#142C1E] border-[#142C1E]/20 hover:border-[#142C1E]/50'
                    }`}
                  >
                    <span className="block font-bold text-xs uppercase">{sz.size}</span>
                    <span className={`block text-xs mt-1 tabular-nums ${isSelected ? 'text-[#C5A467]' : 'text-[#525955]'}`}>
                      ₹{sz.price}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity Selector & Primary CTA Button */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            {/* Quantity Stepper */}
            <div className="flex items-center border border-[#142C1E]/25 rounded-xl bg-white p-1 self-stretch sm:self-auto justify-between sm:justify-start">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center text-[#142C1E] hover:bg-[#FAF7F0] rounded-lg transition-colors cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center font-bold text-sm tabular-nums text-[#142C1E]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-10 h-10 flex items-center justify-center text-[#142C1E] hover:bg-[#FAF7F0] rounded-lg transition-colors cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Add to Cart Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={handleAddToCart}
              className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md self-stretch ${
                isAdded
                  ? 'bg-[#2E5C32] text-white'
                  : 'bg-[#142C1E] hover:bg-[#1A3826] text-[#FAF7F0]'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4 text-[#C5A467]" />
                  <span>Added {quantity} to Spice Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-[#C5A467]" />
                  <span>Add To Cart · ₹{selectedSize.price * quantity}</span>
                </>
              )}
            </motion.button>
          </div>

          {/* Farm Dispatch & Trust Badges */}
          <div className="p-4 bg-white rounded-xl border border-[#142C1E]/15 grid grid-cols-2 gap-4 text-xs">
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-[#C5A467] shrink-0" />
              <span className="text-[#525955]">Complimentary delivery over ₹{config.freeShippingThreshold}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#2E5C32] shrink-0" />
              <span className="text-[#525955]">FSSAI Central Lic. {config.fssaiLicenceNo}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Product Specs, Ayurveda, Nutrition, FSSAI */}
      <div className="bg-white rounded-2xl border border-[#142C1E]/15 overflow-hidden shadow-sm">
        <div className="flex border-b border-[#142C1E]/10 overflow-x-auto scrollbar-none bg-[#FAF7F0]">
          {[
            { id: 'details', label: 'Ayurveda & Health' },
            { id: 'culinary', label: 'Culinary Applications' },
            { id: 'nutrition', label: 'Nutritional Facts' },
            { id: 'fssai', label: 'FSSAI Statutory Specs' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-4 text-xs font-bold tracking-wider uppercase whitespace-nowrap transition-colors cursor-pointer border-b-2 ${
                  isActive
                    ? 'border-[#142C1E] text-[#142C1E] bg-white'
                    : 'border-transparent text-[#525955] hover:text-[#142C1E]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="p-6 sm:p-8">
          {activeTab === 'details' && (
            <div className="space-y-6">
              <h3 className="font-serif text-2xl font-bold text-[#142C1E]">
                Ayurvedic Potency & Healing Traditions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.benefits?.map((b, i) => (
                  <div key={i} className="p-4 bg-[#FAF7F0] rounded-xl border border-[#142C1E]/10 space-y-1">
                    <span className="text-xs font-bold text-[#C5A467] uppercase tracking-wider">
                      {b.highlight}
                    </span>
                    <h4 className="font-serif text-base font-bold text-[#142C1E]">{b.title}</h4>
                    <p className="text-xs text-[#525955] leading-relaxed">{b.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'culinary' && (
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-bold text-[#142C1E]">
                In the Kitchen
              </h3>
              <ul className="space-y-2">
                {product.culinaryUses?.map((use, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#525955]">
                    <span className="text-[#C5A467] font-bold mt-1">✦</span>
                    <span>{use}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'nutrition' && (
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-bold text-[#142C1E]">
                Nutritional Values (Per {product.nutritionalInformation.servingSize})
              </h3>
              <div className="max-w-md border border-[#142C1E]/15 rounded-xl overflow-hidden">
                <table className="w-full text-xs text-left">
                  <tbody className="divide-y divide-[#142C1E]/10">
                    <tr className="bg-[#FAF7F0]">
                      <td className="px-4 py-2.5 font-semibold text-[#142C1E]">Energy</td>
                      <td className="px-4 py-2.5 tabular-nums text-right font-bold text-[#142C1E]">
                        {product.nutritionalInformation.energyKcal} kcal
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 font-medium text-[#525955]">Protein</td>
                      <td className="px-4 py-2.5 tabular-nums text-right text-[#142C1E]">
                        {product.nutritionalInformation.proteinG} g
                      </td>
                    </tr>
                    <tr className="bg-[#FAF7F0]">
                      <td className="px-4 py-2.5 font-medium text-[#525955]">Carbohydrates</td>
                      <td className="px-4 py-2.5 tabular-nums text-right text-[#142C1E]">
                        {product.nutritionalInformation.carbohydrateG} g
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 font-medium text-[#525955]">Dietary Fibre</td>
                      <td className="px-4 py-2.5 tabular-nums text-right text-[#142C1E]">
                        {product.nutritionalInformation.dietaryFibreG} g
                      </td>
                    </tr>
                    <tr className="bg-[#FAF7F0]">
                      <td className="px-4 py-2.5 font-medium text-[#525955]">Total Fat</td>
                      <td className="px-4 py-2.5 tabular-nums text-right text-[#142C1E]">
                        {product.nutritionalInformation.totalFatG} g
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 font-medium text-[#525955]">Sodium</td>
                      <td className="px-4 py-2.5 tabular-nums text-right text-[#142C1E]">
                        {product.nutritionalInformation.sodiumMg} mg
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'fssai' && (
            <div className="space-y-4 text-xs text-[#525955]">
              <h3 className="font-serif text-2xl font-bold text-[#142C1E]">
                Statutory Regulatory Disclosures
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-[#FAF7F0] rounded-xl border border-[#142C1E]/10 space-y-1">
                  <span className="font-bold text-[#142C1E] uppercase">FSSAI Licence No:</span>
                  <p className="tabular-nums font-semibold text-[#142C1E]">{product.fssaiLicenceNo}</p>
                </div>
                <div className="p-4 bg-[#FAF7F0] rounded-xl border border-[#142C1E]/10 space-y-1">
                  <span className="font-bold text-[#142C1E] uppercase">Ingredients:</span>
                  <p>{product.ingredients}</p>
                </div>
                <div className="p-4 bg-[#FAF7F0] rounded-xl border border-[#142C1E]/10 space-y-1">
                  <span className="font-bold text-[#142C1E] uppercase">Storage Instructions:</span>
                  <p>{product.storageInstructions}</p>
                </div>
                <div className="p-4 bg-[#FAF7F0] rounded-xl border border-[#142C1E]/10 space-y-1">
                  <span className="font-bold text-[#142C1E] uppercase">Allergen Advice:</span>
                  <p>{product.allergenInformation}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#142C1E]">
              You May Also Appreciate
            </h2>
            <button
              onClick={() => onNavigate('/shop')}
              className="text-xs font-semibold tracking-wider uppercase text-[#C5A467] hover:underline"
            >
              Browse All Spices
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onSelect={(prod) => onNavigate(`/product/${prod.slug}`)}
              />
            ))}
          </div>
        </div>
      )}

      {/* MOBILE STICKY PURCHASE BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7F0]/95 backdrop-blur-md border-t border-[#C5A467]/30 p-3 sm:p-4 shadow-2xl md:hidden">
        <div className="flex items-center justify-between gap-3">
          <div className="truncate">
            <p className="font-serif font-bold text-sm text-[#142C1E] truncate">{product.name}</p>
            <p className="text-xs text-[#525955]">
              <span className="font-bold text-[#142C1E]">₹{selectedSize.price * quantity}</span> ({selectedSize.size})
            </p>
          </div>

          <motion.button
            whileTap={{ scale: 0.96 }}
            type="button"
            onClick={handleAddToCart}
            className={`px-5 py-2.5 rounded-lg font-bold text-xs tracking-wider uppercase flex items-center gap-1.5 shrink-0 ${
              isAdded ? 'bg-[#2E5C32] text-white' : 'bg-[#142C1E] text-[#FAF7F0]'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#C5A467]" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-[#C5A467]" />
                <span>Add To Cart</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
};
