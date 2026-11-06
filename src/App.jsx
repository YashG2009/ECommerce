import React, { useState, useCallback } from 'react';
import { productList } from './data/products.js';
import { ShopProvider, useShop } from './context/ShopContext.jsx';
import { ProductCard } from './components/ProductCard.jsx';
import { ProductVisual } from './components/ProductVisual.jsx';
import { BulkEstimator } from './components/BulkEstimator.jsx';
import { CheckoutView } from './components/CheckoutView.jsx';

function MainStore() {
  const {
    cart,
    savedIds,
    orders,
    addToCart,
    updateQuantity,
    toggleSaved,
    cartCount,
    cartSubtotal
  } = useShop();

  const [activePage, setActivePage] = useState('shop');
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [maxPrice, setMaxPrice] = useState(1500);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [latestOrder, setLatestOrder] = useState(null);

  const categories = ['All', 'Books', 'Electronics', 'Stationery', 'Accessories'];

  const handleBulkAdd = useCallback(
    (product, count) => {
      const existing = cart.find((c) => c.product.id === product.id);
      if (existing) {
        updateQuantity(product.id, existing.quantity + count);
      } else {
        addToCart(product);
        if (count > 1) {
          updateQuantity(product.id, count);
        }
      }
    },
    [cart, addToCart, updateQuantity]
  );

  const filteredProducts = productList
    .filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesPrice = item.price <= maxPrice;
      const query = searchText.trim().toLowerCase();
      const matchesSearch =
        query === '' ||
        item.name.toLowerCase().includes(query) ||
        item.brand.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query);

      return matchesCategory && matchesPrice && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return a.id - b.id;
    });

  const savedProducts = productList.filter((item) => savedIds.includes(item.id));

  const getCartQty = (id) => {
    const found = cart.find((c) => c.product.id === id);
    return found ? found.quantity : 0;
  };

  const resetFilters = () => {
    setSearchText('');
    setSelectedCategory('All');
    setSortBy('default');
    setMaxPrice(1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-2xs">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-8">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              setActivePage('shop');
              setSelectedProduct(null);
            }}
            className="text-xl font-extrabold tracking-tight text-indigo-600 whitespace-nowrap shrink-0"
          >
            CampusStore
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              type="button"
              onClick={() => {
                setActivePage('shop');
                setSelectedProduct(null);
              }}
              className={`hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activePage === 'shop' ? 'text-indigo-600 font-bold underline underline-offset-4' : ''
              }`}
            >
              Catalog
            </button>
            <button
              type="button"
              onClick={() => {
                setActivePage('saved');
                setSelectedProduct(null);
              }}
              className={`hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activePage === 'saved' ? 'text-indigo-600 font-bold underline underline-offset-4' : ''
              }`}
            >
              Wishlist ({savedIds.length})
            </button>
            <button
              type="button"
              onClick={() => {
                setActivePage('bulk');
                setSelectedProduct(null);
              }}
              className={`hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activePage === 'bulk' ? 'text-indigo-600 font-bold underline underline-offset-4' : ''
              }`}
            >
              Bulk Calculator
            </button>
            <button
              type="button"
              onClick={() => {
                setActivePage('orders');
                setSelectedProduct(null);
              }}
              className={`hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activePage === 'orders' ? 'text-indigo-600 font-bold underline underline-offset-4' : ''
              }`}
            >
              My Orders ({orders.length})
            </button>
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => {
                setActivePage('checkout');
                setSelectedProduct(null);
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer num-text shadow-xs"
            >
              Cart ({cartCount}) · Rs. {cartSubtotal.toLocaleString('en-IN')}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-8">
        {selectedProduct ? (
          <div className="bg-white border border-slate-200 rounded-xl p-6 mb-8 shadow-xs">
            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 underline mb-4 cursor-pointer"
            >
              &larr; Back to Products
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
              <div className="md:col-span-5 flex flex-col justify-center border border-slate-200 rounded-xl overflow-hidden">
                <ProductVisual
                  iconType={selectedProduct.iconType}
                  color={selectedProduct.color}
                  code={selectedProduct.code}
                />
              </div>

              <div className="md:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-semibold text-indigo-600">
                    {selectedProduct.category} · {selectedProduct.brand} · Code {selectedProduct.code}
                  </div>
                  <h1 className="text-2xl font-bold text-slate-900 mt-1">
                    {selectedProduct.name}
                  </h1>
                  <div className="text-sm text-slate-600 mt-1 num-text">
                    <span className="text-amber-600 font-semibold">★ {selectedProduct.rating.toFixed(1)} / 5.0</span> · Availability: <span className="text-emerald-700 font-medium">{selectedProduct.stock} units</span>
                  </div>
                  <p className="text-sm text-slate-700 mt-4 leading-relaxed">
                    {selectedProduct.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-slate-500 block">Unit Price</span>
                    <span className="text-2xl font-bold text-slate-900 num-text">
                      Rs. {selectedProduct.price.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => toggleSaved(selectedProduct.id)}
                      className={`px-4 py-2 text-xs font-semibold border rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                        savedIds.includes(selectedProduct.id)
                          ? 'bg-rose-50 border-rose-200 text-rose-600'
                          : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>{savedIds.includes(selectedProduct.id) ? '♥ Saved in Wishlist' : '♡ Add to Wishlist'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => addToCart(selectedProduct)}
                      className="px-5 py-2 text-xs font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer shadow-xs"
                    >
                      Add to Cart ({getCartQty(selectedProduct.id)} in cart)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {activePage === 'shop' && (
          <div className="space-y-8">
            <section className="bg-sky-200 border border-sky-300 rounded-none p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8">
                <div className="text-xs font-semibold text-sky-900">
                  University Books, Lab Electronics &amp; Daily Stationery
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mt-1 tracking-tight">
                  Essential Course Books &amp; Lab Supplies at Student Prices
                </h1>
                <p className="text-sm text-slate-800 mt-2 max-w-2xl leading-relaxed">
                  Browse prescribed reference textbooks, scientific calculators, notebooks, and accessories. Free campus delivery on orders above Rs. 999 or use code <span className="font-mono font-bold text-sky-950 bg-white px-1.5 py-0.5 border border-sky-400">STUDENT10</span> at checkout.
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-2.5 justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('Books')}
                  className="px-4 py-2.5 text-xs font-semibold bg-sky-800 text-white rounded-none hover:bg-sky-900 text-center cursor-pointer"
                >
                  Browse Reference Books
                </button>
                <button
                  type="button"
                  onClick={() => setActivePage('bulk')}
                  className="px-4 py-2.5 text-xs font-semibold bg-white border border-sky-400 text-sky-950 rounded-none hover:bg-sky-50 text-center cursor-pointer"
                >
                  Open Bulk Order Calculator
                </button>
              </div>
            </section>

            <section className="bg-white border border-slate-200 rounded-xl p-5 space-y-4 shadow-xs">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-5">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Search by Title, Brand, or Keyword
                  </label>
                  <input
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Search e.g. JavaScript, Casio, Notebook..."
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <div className="md:col-span-4">
                  <label className="block text-xs font-semibold text-slate-700 mb-1 num-text">
                    Max Price Filter: <span className="text-indigo-600">Rs. {maxPrice}</span>
                  </label>
                  <input
                    type="range"
                    min={200}
                    max={1500}
                    step={50}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                </div>

                <div className="md:col-span-3">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Sort Items By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:border-indigo-600"
                  >
                    <option value="default">Default Order</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Customer Rating</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                <div className="flex flex-wrap items-center gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-indigo-600 text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-indigo-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-600">
                  <span className="num-text font-medium">Showing {filteredProducts.length} of {productList.length} items</span>
                  {(searchText !== '' || selectedCategory !== 'All' || maxPrice < 1500 || sortBy !== 'default') && (
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="text-rose-600 font-semibold underline cursor-pointer"
                    >
                      Reset Filters
                    </button>
                  )}
                </div>
              </div>
            </section>

            {filteredProducts.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-xl p-8 text-center shadow-xs">
                <p className="text-base font-bold text-slate-800">No matching products found</p>
                <p className="text-xs text-slate-600 mt-1">
                  Try increasing the maximum price range or clearing your search text.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-4 px-4 py-2 text-xs font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer"
                >
                  Show All Items
                </button>
              </div>
            ) : (
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((item) => (
                  <ProductCard
                    key={item.id}
                    item={item}
                    inCartQty={getCartQty(item.id)}
                    isSaved={savedIds.includes(item.id)}
                    onAdd={addToCart}
                    onToggleSave={toggleSaved}
                    onSelectProduct={(prod) => {
                      setSelectedProduct(prod);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  />
                ))}
              </section>
            )}

            <BulkEstimator products={productList} onAddBulkToCart={handleBulkAdd} />
          </div>
        )}

        {activePage === 'saved' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h1 className="text-xl font-bold text-slate-900">My Wishlist ({savedProducts.length})</h1>
                <p className="text-xs text-slate-600 mt-0.5">
                  Items you liked for upcoming semesters or lab requirements.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActivePage('shop')}
                className="px-4 py-2 text-xs font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer"
              >
                Back to Catalog
              </button>
            </div>

            {savedProducts.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-xl p-8 text-center shadow-xs">
                <p className="text-sm text-slate-600">You have not added any items to your wishlist yet. Click the heart icon on any product to save it.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedProducts.map((item) => (
                  <ProductCard
                    key={item.id}
                    item={item}
                    inCartQty={getCartQty(item.id)}
                    isSaved={true}
                    onAdd={addToCart}
                    onToggleSave={toggleSaved}
                    onSelectProduct={(prod) => setSelectedProduct(prod)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activePage === 'bulk' && (
          <div className="space-y-6">
            <BulkEstimator products={productList} onAddBulkToCart={handleBulkAdd} />
          </div>
        )}

        {activePage === 'checkout' && (
          <CheckoutView
            onBackToShop={() => setActivePage('shop')}
            onOrderSuccess={(ord) => {
              setLatestOrder(ord);
              setActivePage('orders');
            }}
          />
        )}

        {activePage === 'orders' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h1 className="text-xl font-bold text-slate-900">Order History &amp; Receipts</h1>
                <p className="text-xs text-slate-600 mt-0.5">
                  Summary of submitted orders stored in browser localStorage.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActivePage('shop')}
                className="px-4 py-2 text-xs font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>

            {latestOrder && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-sm text-emerald-950">
                <span className="font-bold">Order {latestOrder.orderId} Confirmed!</span> Thank you, {latestOrder.customerName}. Your receipt is recorded below.
              </div>
            )}

            {orders.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-xl p-8 text-center shadow-xs">
                <p className="text-sm text-slate-600">No orders placed yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((ord) => (
                  <div key={ord.orderId} className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200">
                      <div>
                        <span className="text-sm font-bold text-indigo-700 num-text">{ord.orderId}</span>
                        <span className="text-xs text-slate-500 ml-2">· Placed on {ord.date}</span>
                      </div>
                      <div className="text-xs text-slate-700 num-text">
                        Payment: {ord.paymentMethod} · Total: <span className="font-bold text-slate-900">Rs. {ord.totalAmount.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    <div className="text-xs text-slate-600 mt-3">
                      <span className="font-semibold text-slate-800">Deliver To:</span> {ord.customerName} ({ord.phone}, {ord.email}) — {ord.address}, PIN {ord.pincode}
                    </div>

                    <div className="mt-3 overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="border-b border-slate-200 text-slate-500">
                            <th className="py-2 pr-4 font-semibold">Code</th>
                            <th className="py-2 pr-4 font-semibold">Item Name</th>
                            <th className="py-2 pr-4 font-semibold num-text">Qty</th>
                            <th className="py-2 font-semibold text-right num-text">Amount</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {ord.items.map(({ product, quantity }) => (
                            <tr key={product.id}>
                              <td className="py-2 pr-4 num-text text-indigo-600 font-medium">{product.code}</td>
                              <td className="py-2 pr-4 text-slate-800 font-medium">{product.name}</td>
                              <td className="py-2 pr-4 num-text">{quantity}</td>
                              <td className="py-2 text-right num-text font-semibold">
                                Rs. {(product.price * quantity).toLocaleString('en-IN')}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>CampusStore — Academic Books, Electronics &amp; Stationery Portal</div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setActivePage('shop')}
              className="hover:text-indigo-600 cursor-pointer"
            >
              Catalog
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => setActivePage('bulk')}
              className="hover:text-indigo-600 cursor-pointer"
            >
              Bulk Calculator
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => setActivePage('checkout')}
              className="hover:text-indigo-600 cursor-pointer"
            >
              Checkout
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <MainStore />
    </ShopProvider>
  );
}
