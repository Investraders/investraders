import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Tag, Star, ChevronLeft, ChevronRight, X, ExternalLink } from 'lucide-react';

function ProductCard({ product, websiteUrl, onClick }) {
  const [imgFailed, setImgFailed] = useState(false);

  // Generate a deterministic gradient based on category name
  const gradients = [
    'linear-gradient(135deg,#1e3a5f,#0f1e3a)',
    'linear-gradient(135deg,#2d1b4e,#0f1e3a)',
    'linear-gradient(135deg,#1a3a2a,#0f1e3a)',
    'linear-gradient(135deg,#3a1a1a,#0f1e3a)',
    'linear-gradient(135deg,#1a2a3a,#0a1428)',
  ];
  const gradientIndex = (product.category?.charCodeAt(0) || 0) % gradients.length;
  const bg = gradients[gradientIndex];

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(product)}
      className="cursor-pointer rounded-xl overflow-hidden border flex flex-col"
      style={{ background: bg, borderColor: 'rgba(251,146,60,0.2)', minHeight: 180 }}
    >
      {/* Image area */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden" style={{ minHeight: 110 }}>
        {product.image_url && !imgFailed ? (
          <img
            src={product.image_url}
            alt={product.category}
            onError={() => setImgFailed(true)}
            className="w-full h-full object-cover"
            style={{ maxHeight: 120 }}
          />
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full py-4 gap-2">
            <ShoppingBag className="w-8 h-8 text-orange-400/40" />
            <span className="text-orange-300/30 text-[10px] font-semibold uppercase tracking-wider">{product.category}</span>
          </div>
        )}
        {product.price_range && (
          <span className="absolute top-2 right-2 text-[10px] text-emerald-400 font-bold border border-emerald-400/30 rounded-full px-1.5 py-0.5 bg-black/40 backdrop-blur-sm">
            {product.price_range}
          </span>
        )}
      </div>

      {/* Card footer */}
      <div className="px-3 py-2.5 border-t" style={{ borderColor: 'rgba(251,146,60,0.12)', background: 'rgba(0,0,0,0.25)' }}>
        <div className="flex items-center gap-1.5">
          <Tag className="w-3 h-3 text-amber-400 shrink-0" />
          <span className="text-white text-[11px] font-semibold truncate">{product.category}</span>
        </div>
        {product.featured_items?.length > 0 && (
          <p className="text-blue-300/50 text-[10px] mt-0.5 truncate">{product.featured_items.slice(0, 2).join(' · ')}</p>
        )}
      </div>
    </motion.div>
  );
}

function ProductModal({ product, websiteUrl, onClose }) {
  if (!product) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="rounded-2xl overflow-hidden shadow-2xl w-full max-w-sm"
          style={{ background: 'linear-gradient(160deg,#0a0f1e,#0f1e3a)', border: '1px solid rgba(251,146,60,0.3)' }}
        >
          {/* Header image / placeholder */}
          <div className="relative h-48 flex items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(135deg,#1e3a5f,#0f1e3a)' }}>
            {product.image_url ? (
              <img src={product.image_url} alt={product.category} className="w-full h-full object-cover" />
            ) : (
              <ShoppingBag className="w-16 h-16 text-orange-400/30" />
            )}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/50 flex items-center justify-center text-white/70 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] to-transparent" />
          </div>

          {/* Content */}
          <div className="p-5 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-white font-bold text-lg leading-tight">{product.category}</h3>
              {product.price_range && (
                <span className="shrink-0 text-emerald-400 font-bold text-sm border border-emerald-400/30 rounded-full px-3 py-1 bg-emerald-400/10">
                  {product.price_range}
                </span>
              )}
            </div>

            {product.description && (
              <p className="text-blue-300/70 text-sm leading-relaxed">{product.description}</p>
            )}

            {product.featured_items?.length > 0 && (
              <div>
                <p className="text-[10px] font-bold text-amber-300 uppercase tracking-wider mb-2">Featured Products</p>
                <div className="flex flex-wrap gap-1.5">
                  {product.featured_items.map((item, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full border"
                      style={{ background: 'rgba(245,158,11,0.1)', borderColor: 'rgba(245,158,11,0.25)', color: '#fcd34d' }}
                    >
                      <Star className="w-2.5 h-2.5" />{item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {websiteUrl && (
              <a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full mt-1 py-2.5 rounded-full text-sm font-semibold transition-colors"
                style={{ background: 'rgba(245,158,11,0.15)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.3)' }}
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4" /> Shop on Website
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function ProductGallery({ products, websiteUrl, brandName, tagline }) {
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(0);
  const PER_PAGE = 4;
  const totalPages = Math.ceil(products.length / PER_PAGE);
  const visible = products.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  return (
    <div className="rounded-xl border overflow-hidden" style={{ background: 'rgba(251,146,60,0.05)', borderColor: 'rgba(251,146,60,0.2)' }}>
      {/* Gallery Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'rgba(251,146,60,0.15)', background: 'rgba(0,0,0,0.2)' }}>
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-4 h-4 text-orange-400" />
          <span className="text-sm font-bold text-orange-300 uppercase tracking-wider">Product Gallery</span>
          <span className="text-[10px] text-orange-400/50 font-semibold ml-1">{products.length} categories</span>
        </div>
        {websiteUrl && (
          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 font-semibold"
          >
            <ExternalLink className="w-3 h-3" /> Shop
          </a>
        )}
      </div>

      {/* Tagline */}
      {tagline && (
        <p className="px-4 pt-3 pb-0 text-amber-300/60 text-xs italic">"{tagline}"</p>
      )}

      {/* Grid */}
      <div className="p-4 grid grid-cols-2 gap-3">
        {visible.map((product, i) => (
          <ProductCard key={i} product={product} websiteUrl={websiteUrl} onClick={setSelected} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 pb-4">
          <button
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
            className="w-7 h-7 rounded-full flex items-center justify-center border border-white/10 text-white/50 hover:text-white hover:border-white/30 disabled:opacity-30"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-[10px] text-blue-300/50">{page + 1} / {totalPages}</span>
          <button
            onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            className="w-7 h-7 rounded-full flex items-center justify-center border border-white/10 text-white/50 hover:text-white hover:border-white/30 disabled:opacity-30"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Product Detail Modal */}
      {selected && (
        <ProductModal product={selected} websiteUrl={websiteUrl} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}