import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { ProductArtwork } from './ProductArtwork';
import { useCart } from '../context/CartContext';
import { Check, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const { addToCart } = useCart();
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [addedJustNow, setAddedJustNow] = useState(false);

  const selectedSize = product.sizes[selectedSizeIndex] || product.sizes[0];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
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
      1
    );

    setAddedJustNow(true);
    setTimeout(() => setAddedJustNow(false), 1600);
  };

  return (
    <div
      onClick={() => onSelect(product)}
      className="group flex flex-col justify-between bg-[#FDFCFA] border border-[#1A3826]/15 hover:border-[#1A3826]/40 rounded-2xl p-5 transition-all duration-300 hover:shadow-lg cursor-pointer relative"
    >
      {/* Visual Slot with Smooth Hover Zoom */}
      <div className="relative mb-4 overflow-hidden rounded-xl bg-[#FAF7F0] transition-transform duration-500 group-hover:scale-[1.02]">
        <ProductArtwork slug={product.slug} size="md" />

        {/* Quiet Kicker Tag (No pill, unboxed editorial text) */}
        {product.isHero && (
          <div className="absolute top-2.5 left-2.5 bg-[#122619] text-[#FAF7F0] text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-sm shadow-xs">
            Signature Harvest
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="flex-1 flex flex-col">
        {/* Quiet Category & Origin Kicker */}
        <div className="flex items-center gap-1.5 text-[11px] text-[#525955] tracking-wider uppercase mb-1">
          <span>{product.categoryLabel}</span>
          <span aria-hidden="true">·</span>
          <span>ESTD. 1891</span>
        </div>

        {/* Product Title */}
        <h3 className="font-serif text-xl font-bold text-[#122619] group-hover:text-[#1A3826] transition-colors leading-snug line-clamp-1">
          {product.name}
        </h3>

        {/* Vernacular / Culinary Note if present */}
        {product.subName && (
          <p className="text-xs text-[#C5A467] font-medium tracking-wide mt-0.5 line-clamp-1">
            {product.subName}
          </p>
        )}

        {/* Short Factual Description */}
        <p className="text-xs text-[#525955] leading-relaxed mt-2 line-clamp-2">
          {product.shortDescription}
        </p>

        {/* Key Health Benefit Callout */}
        {product.benefits && product.benefits.length > 0 && (
          <div className="mt-2.5 px-2.5 py-1.5 bg-[#FAF7F0] border border-[#143823]/10 rounded flex items-center gap-1.5 text-[11px] text-[#143823]">
            <span className="text-[#C5A467] font-bold text-xs">✦</span>
            <span className="font-semibold text-[#143823]">{product.benefits[0].highlight}:</span>
            <span className="text-[#525955] truncate">{product.benefits[0].title}</span>
          </div>
        )}

        {/* Available Sizes Selector */}
        <div className="mt-4 pt-3 border-t border-[#1A3826]/10">
          <div className="flex items-center justify-between text-[11px] text-[#525955] mb-1.5">
            <span className="font-medium tracking-wide uppercase">Select Size:</span>
            <span className="text-[#122619] font-semibold">{selectedSize.size}</span>
          </div>

          <div className="flex flex-wrap gap-1.5" onClick={e => e.stopPropagation()}>
            {product.sizes.map((s, idx) => (
              <button
                key={s.size}
                type="button"
                onClick={() => setSelectedSizeIndex(idx)}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-all cursor-pointer ${
                  selectedSizeIndex === idx
                    ? 'bg-[#1A3826] text-[#FAF7F0] font-semibold'
                    : 'bg-[#FAF7F0] text-[#122619] border border-[#1A3826]/20 hover:border-[#1A3826]/50'
                }`}
              >
                {s.size}
              </button>
            ))}
          </div>
        </div>

        {/* Price & Add to Cart Action Row */}
        <div className="mt-4 pt-3 border-t border-[#1A3826]/10 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-2xl font-bold text-[#122619] tabular-nums">
                ₹{selectedSize.price}
              </span>
              {selectedSize.mrp > selectedSize.price && (
                <span className="text-xs text-[#7B827E] line-through tabular-nums">
                  ₹{selectedSize.mrp}
                </span>
              )}
            </div>
            <span className="text-[10px] text-[#525955] tracking-wide uppercase">
              Incl. of all taxes
            </span>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={handleAddToCart}
            className={`px-3.5 py-2 text-xs font-semibold tracking-wider uppercase rounded-xl transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shadow-xs ${
              addedJustNow
                ? 'bg-[#2E5C32] text-white'
                : 'bg-[#1A3826] hover:bg-[#122619] text-[#FAF7F0]'
            }`}
            aria-label={`Add ${product.name} ${selectedSize.size} to cart`}
          >
            {addedJustNow ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#C5A467]" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-[#C5A467]" />
                <span>Add</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
};
