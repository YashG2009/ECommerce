import React from 'react';
import { Product } from '../data/products';
import { ProductVisual } from './ProductVisual';

interface ProductCardProps {
  item: Product;
  inCartQty: number;
  isSaved: boolean;
  onAdd: (product: Product) => void;
  onToggleSave: (id: number) => void;
  onSelectProduct: (product: Product) => void;
}

export function ProductCard({
  item,
  inCartQty,
  isSaved,
  onAdd,
  onToggleSave,
  onSelectProduct
}: ProductCardProps) {
  const { id, name, category, price, rating, stock, brand, code, color, iconType } = item;

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs hover:shadow-md overflow-hidden flex flex-col justify-between transition-all duration-150 hover:-translate-y-0.5 relative">
      <div>
        <div className="relative">
          <div
            onClick={() => onSelectProduct(item)}
            className="cursor-pointer"
          >
            <ProductVisual iconType={iconType} color={color} code={code} />
          </div>

          <button
            type="button"
            onClick={() => onToggleSave(id)}
            aria-label={isSaved ? 'Remove from wishlist' : 'Add to wishlist'}
            className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center border shadow-xs transition-colors cursor-pointer ${
              isSaved
                ? 'bg-rose-50 border-rose-200 text-rose-600'
                : 'bg-white/90 border-slate-200 text-slate-400 hover:text-rose-500 hover:bg-white'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={isSaved ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="2"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </button>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span className="font-medium text-indigo-600">{category} · {brand}</span>
            <span className="num-text font-semibold text-amber-600">★ {rating.toFixed(1)}</span>
          </div>

          <h3
            onClick={() => onSelectProduct(item)}
            className="text-base font-bold text-slate-900 hover:text-indigo-600 cursor-pointer line-clamp-1"
          >
            {name}
          </h3>

          <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>

      <div className="px-4 pb-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <div>
          <div className="text-lg font-bold text-slate-900 num-text">
            Rs. {price.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] font-medium text-emerald-700">
            {stock > 0 ? `${stock} in stock` : 'Out of stock'}
          </div>
        </div>

        <button
          type="button"
          disabled={stock === 0}
          onClick={() => onAdd(item)}
          className="px-4 py-2 text-xs font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-slate-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
        >
          {inCartQty > 0 ? `Add More (${inCartQty})` : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
