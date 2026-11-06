import React, { useState } from 'react';
import { useShop, OrderRecord } from '../context/ShopContext';

interface CheckoutViewProps {
  onBackToShop: () => void;
  onOrderSuccess: (order: OrderRecord) => void;
}

interface FormErrors {
  customerName?: string;
  email?: string;
  phone?: string;
  address?: string;
  pincode?: string;
  coupon?: string;
}

export function CheckoutView({ onBackToShop, onOrderSuccess }: CheckoutViewProps) {
  const { cart, cartSubtotal, updateQuantity, removeFromCart, placeOrder } = useShop();

  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [discountRate, setDiscountRate] = useState(0);
  const [errors, setErrors] = useState<FormErrors>({});

  const nameRegex = /^[A-Za-z\s.]{3,50}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^[6-9]\d{9}$/;
  const pincodeRegex = /^[1-9][0-9]{5}$/;
  const couponRegex = /^(STUDENT10|WEBTECH20)$/i;

  const handleApplyCoupon = () => {
    const cleanCode = couponInput.trim().toUpperCase();
    if (!cleanCode) {
      setErrors((prev) => ({ ...prev, coupon: 'Please enter a coupon code.' }));
      return;
    }
    if (!couponRegex.test(cleanCode)) {
      setErrors((prev) => ({
        ...prev,
        coupon: 'Invalid format. Try STUDENT10 or WEBTECH20.'
      }));
      setAppliedCoupon('');
      setDiscountRate(0);
      return;
    }

    setErrors((prev) => ({ ...prev, coupon: undefined }));
    setAppliedCoupon(cleanCode);
    setDiscountRate(cleanCode === 'WEBTECH20' ? 0.2 : 0.1);
  };

  const discountAmount = Math.round(cartSubtotal * discountRate);
  const deliveryCharge = cartSubtotal > 0 && cartSubtotal - discountAmount < 999 ? 60 : 0;
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + deliveryCharge);

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!nameRegex.test(customerName.trim())) {
      newErrors.customerName = 'Enter a valid full name (letters only, min 3 characters).';
    }
    if (!emailRegex.test(email.trim())) {
      newErrors.email = 'Enter a valid email address (example: name@college.edu).';
    }
    if (!phoneRegex.test(phone.trim())) {
      newErrors.phone = 'Enter a valid 10-digit Indian mobile number starting with 6-9.';
    }
    if (address.trim().length < 10) {
      newErrors.address = 'Please enter complete hostel or street address (min 10 chars).';
    }
    if (!pincodeRegex.test(pincode.trim())) {
      newErrors.pincode = 'Enter a valid 6-digit postal pincode.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    if (!validateForm()) {
      return;
    }

    const orderRecord: OrderRecord = {
      orderId: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      customerName: customerName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      address: address.trim(),
      pincode: pincode.trim(),
      paymentMethod,
      items: [...cart],
      subtotal: cartSubtotal,
      discount: discountAmount,
      deliveryCharge,
      totalAmount: finalTotal,
      date: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
    };

    placeOrder(orderRecord);
    onOrderSuccess(orderRecord);
  };

  if (cart.length === 0) {
    return (
      <div className="bg-white border border-stone-200 rounded-md p-8 text-center max-w-xl mx-auto my-8">
        <h2 className="text-xl font-bold text-stone-900">Your Shopping Cart is Empty</h2>
        <p className="text-sm text-stone-600 mt-2">
          Add textbooks, stationery, or electronics from the catalog before proceeding to checkout.
        </p>
        <button
          type="button"
          onClick={onBackToShop}
          className="mt-5 px-4 py-2 text-sm font-medium bg-stone-900 text-white rounded hover:bg-stone-800 cursor-pointer"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-white border border-stone-200 rounded-md p-6">
          <div className="flex items-center justify-between pb-4 border-b border-stone-200">
            <h2 className="text-lg font-bold text-stone-900">1. Review Cart Items ({cart.length})</h2>
            <button
              type="button"
              onClick={onBackToShop}
              className="text-xs font-medium text-stone-600 hover:text-stone-900 underline cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>

          <div className="divide-y divide-stone-200 mt-2">
            {cart.map(({ product, quantity }) => (
              <div key={product.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-stone-500">{product.code} · {product.brand}</div>
                  <div className="text-sm font-semibold text-stone-900">{product.name}</div>
                  <div className="text-xs text-stone-600 num-text mt-0.5">
                    Rs. {product.price.toLocaleString('en-IN')} each
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-stone-300 rounded">
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="px-2.5 py-1 text-sm text-stone-700 hover:bg-stone-100 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-xs font-medium num-text">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="px-2.5 py-1 text-sm text-stone-700 hover:bg-stone-100 cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <div className="w-24 text-right text-sm font-semibold text-stone-900 num-text">
                    Rs. {(product.price * quantity).toLocaleString('en-IN')}
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromCart(product.id)}
                    className="text-xs text-red-700 hover:underline ml-1 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="bg-white border border-stone-200 rounded-md p-6">
          <h2 className="text-lg font-bold text-stone-900 pb-4 border-b border-stone-200">
            2. Delivery &amp; Customer Verification
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Yash Ganatra"
                className="w-full px-3 py-2 text-sm border border-stone-300 rounded focus:outline-none focus:border-stone-700"
              />
              {errors.customerName && (
                <p className="text-xs text-red-700 mt-1">{errors.customerName}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@college.edu"
                className="w-full px-3 py-2 text-sm border border-stone-300 rounded focus:outline-none focus:border-stone-700"
              />
              {errors.email && (
                <p className="text-xs text-red-700 mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                10-Digit Mobile Number *
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="9876543210"
                className="w-full px-3 py-2 text-sm border border-stone-300 rounded num-text focus:outline-none focus:border-stone-700"
              />
              {errors.phone && (
                <p className="text-xs text-red-700 mt-1">{errors.phone}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Delivery Address (Hostel / Flat / Street) *
              </label>
              <textarea
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Room 204, Block B Hostel, Main University Road"
                className="w-full px-3 py-2 text-sm border border-stone-300 rounded focus:outline-none focus:border-stone-700"
              />
              {errors.address && (
                <p className="text-xs text-red-700 mt-1">{errors.address}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Postal Pincode (6 Digits) *
              </label>
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="380015"
                className="w-full px-3 py-2 text-sm border border-stone-300 rounded num-text focus:outline-none focus:border-stone-700"
              />
              {errors.pincode && (
                <p className="text-xs text-red-700 mt-1">{errors.pincode}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Payment Mode
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-stone-300 rounded bg-white focus:outline-none focus:border-stone-700"
              >
                <option value="COD">Cash on Delivery (COD)</option>
                <option value="UPI">UPI at Delivery</option>
                <option value="CARD">Campus Card / NetBanking</option>
              </select>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onBackToShop}
              className="px-4 py-2 text-xs font-medium border border-stone-300 rounded text-stone-700 hover:bg-stone-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-medium bg-stone-900 text-white rounded hover:bg-stone-800 cursor-pointer"
            >
              Place Order (Rs. {finalTotal.toLocaleString('en-IN')})
            </button>
          </div>
        </form>
      </div>

      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white border border-stone-200 rounded-md p-6">
          <h3 className="text-base font-bold text-stone-900 pb-3 border-b border-stone-200">
            Order Bill Summary
          </h3>

          <div className="mt-4">
            <label className="block text-xs font-medium text-stone-700 mb-1">
              Promo Code (Try STUDENT10 or WEBTECH20)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                placeholder="Enter code"
                className="flex-1 px-3 py-1.5 text-sm border border-stone-300 rounded uppercase num-text focus:outline-none focus:border-stone-700"
              />
              <button
                type="button"
                onClick={handleApplyCoupon}
                className="px-3 py-1.5 text-xs font-medium bg-stone-800 text-white rounded hover:bg-stone-700 whitespace-nowrap shrink-0 cursor-pointer"
              >
                Apply
              </button>
            </div>
            {errors.coupon && (
              <p className="text-xs text-red-700 mt-1">{errors.coupon}</p>
            )}
            {appliedCoupon && (
              <p className="text-xs text-emerald-700 mt-1">
                Code {appliedCoupon} applied ({discountRate * 100}% discount).
              </p>
            )}
          </div>

          <div className="mt-5 space-y-2.5 text-sm border-t border-stone-200 pt-4">
            <div className="flex justify-between text-stone-600">
              <span>Items Subtotal</span>
              <span className="num-text">Rs. {cartSubtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Coupon Discount</span>
              <span className="num-text text-emerald-700">
                -Rs. {discountAmount.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Delivery Charges (Free over Rs. 999)</span>
              <span className="num-text">
                {deliveryCharge === 0 ? 'FREE' : `Rs. ${deliveryCharge}`}
              </span>
            </div>
            <div className="flex justify-between text-base font-bold text-stone-900 border-t border-stone-200 pt-3">
              <span>Total Payable</span>
              <span className="num-text">Rs. {finalTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
