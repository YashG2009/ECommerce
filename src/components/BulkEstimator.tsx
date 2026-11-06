import React from 'react';
import { Product } from '../data/products';

interface BulkEstimatorProps {
  products: Product[];
  onAddBulkToCart: (product: Product, count: number) => void;
}

interface BulkEstimatorState {
  selectedId: number;
  unitCount: number;
  studentDiscount: boolean;
  addedMessage: string;
}

export class BulkEstimator extends React.Component<BulkEstimatorProps, BulkEstimatorState> {
  constructor(props: BulkEstimatorProps) {
    super(props);
    this.state = {
      selectedId: props.products[0]?.id || 1,
      unitCount: 5,
      studentDiscount: true,
      addedMessage: ''
    };
  }

  handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ selectedId: Number(e.target.value), addedMessage: '' });
  };

  handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(1, Math.min(20, Number(e.target.value) || 1));
    this.setState({ unitCount: val, addedMessage: '' });
  };

  handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ studentDiscount: e.target.checked, addedMessage: '' });
  };

  handleAddAll = () => {
    const { products, onAddBulkToCart } = this.props;
    const { selectedId, unitCount } = this.state;
    const chosen = products.find((p) => p.id === selectedId);
    if (chosen) {
      onAddBulkToCart(chosen, unitCount);
      this.setState({ addedMessage: `Added ${unitCount} units of ${chosen.name} to cart.` });
    }
  };

  render() {
    const { products } = this.props;
    const { selectedId, unitCount, studentDiscount, addedMessage } = this.state;

    const currentProduct = products.find((p) => p.id === selectedId) || products[0];
    const baseTotal = currentProduct.price * unitCount;
    const bulkRate = unitCount >= 10 ? 0.12 : unitCount >= 5 ? 0.06 : 0;
    const studentRate = studentDiscount ? 0.05 : 0;
    const discountAmount = Math.round(baseTotal * (bulkRate + studentRate));
    const finalEstimate = baseTotal - discountAmount;

    return (
      <section className="bg-white border border-stone-200 rounded-md p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-200">
          <div>
            <h2 className="text-lg font-bold text-stone-900">Class &amp; Lab Bulk Order Calculator</h2>
            <p className="text-sm text-stone-600 mt-0.5">
              Estimate pricing for study groups or lab batches before adding items to your cart.
            </p>
          </div>
          <span className="text-xs text-stone-500 num-text">
            5+ units: 6% off · 10+ units: 12% off
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5 items-end">
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1.5">
              Select Item
            </label>
            <select
              value={selectedId}
              onChange={this.handleProductChange}
              className="w-full px-3 py-2 text-sm border border-stone-300 rounded bg-white text-stone-900 focus:outline-none focus:border-stone-600"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} (Rs. {p.price})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1.5">
              Quantity (1 to 20)
            </label>
            <input
              type="number"
              min={1}
              max={20}
              value={unitCount}
              onChange={this.handleCountChange}
              className="w-full px-3 py-2 text-sm border border-stone-300 rounded bg-white text-stone-900 num-text focus:outline-none focus:border-stone-600"
            />
          </div>

          <div className="flex items-center gap-2 pb-2">
            <input
              id="studentIdCheck"
              type="checkbox"
              checked={studentDiscount}
              onChange={this.handleCheckboxChange}
              className="w-4 h-4 accent-stone-900 cursor-pointer"
            />
            <label htmlFor="studentIdCheck" className="text-sm text-stone-700 cursor-pointer">
              Apply College ID Rebate (5%)
            </label>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div>
              <span className="text-stone-500">Regular Price: </span>
              <span className="font-medium text-stone-800 num-text">Rs. {baseTotal.toLocaleString('en-IN')}</span>
            </div>
            <div>
              <span className="text-stone-500">Estimated Savings: </span>
              <span className="font-medium text-emerald-700 num-text">-Rs. {discountAmount.toLocaleString('en-IN')}</span>
            </div>
            <div>
              <span className="text-stone-500">Net Estimate: </span>
              <span className="font-bold text-stone-900 num-text">Rs. {finalEstimate.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {addedMessage && (
              <span className="text-xs text-emerald-700 font-medium">{addedMessage}</span>
            )}
            <button
              type="button"
              onClick={this.handleAddAll}
              className="px-4 py-2 text-xs font-medium bg-stone-900 text-white rounded hover:bg-stone-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Add {unitCount} to Cart
            </button>
          </div>
        </div>
      </section>
    );
  }
}
