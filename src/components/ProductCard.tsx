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
    <div className="bg-white border border-stone-200 rounded-md overflow-hidden flex flex-col justify-between transition-transform duration-150 hover:-translate-y-0.5">
      <div>
        <div
          onClick={() => onSelectProduct(item)}
          className="cursor-pointer"
        >
          <ProductVisual iconType={iconType} color={color} code={code} />
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
            <span>{category} · {brand}</span>
            <span className="num-text">★ {rating.toFixed(1)}</span>
          </div>

          <h3
            onClick={() => onSelectProduct(item)}
            className="text-base font-semibold text-stone-900 hover:text-teal-800 cursor-pointer line-clamp-1"
          >
            {name}
          </h3>

          <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>

      <div className="px-4 pb-4 pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
        <div>
          <div className="text-base font-bold text-stone-900 num-text">
            Rs. {price.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-stone-500">
            {stock > 0 ? `${stock} in stock` : 'Out of stock'}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onToggleSave(id)}
            className={`px-2.5 py-1.5 text-xs border rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              isSaved
                ? 'border-amber-600 text-amber-800 bg-amber-50'
                : 'border-stone-300 text-stone-600 hover:bg-stone-100'
            }`}
          >
            {isSaved ? 'Saved' : 'Save'}
          </button>

          <button
            type="button"
            disabled={stock === 0}
            onClick={() => onAdd(item)}
            className="px-3 py-1.5 text-xs font-medium bg-stone-900 text-white rounded hover:bg-stone-800 disabled:bg-stone-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {inCartQty > 0 ? `Add (+${inCartQty})` : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
