import React, { useState, useCallback } from 'react';
import { productList, Product } from './data/products';
import { ShopProvider, useShop, OrderRecord } from './context/ShopContext';
import { ProductCard } from './components/ProductCard';
import { ProductVisual } from './components/ProductVisual';
import { BulkEstimator } from './components/BulkEstimator';
import { CheckoutView } from './components/CheckoutView';

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

  const [activePage, setActivePage] = useState<'shop' | 'saved' | 'bulk' | 'orders' | 'checkout'>('shop');
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [maxPrice, setMaxPrice] = useState(1500);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [latestOrder, setLatestOrder] = useState<OrderRecord | null>(null);

  const categories = ['All', 'Books', 'Electronics', 'Stationery', 'Accessories'];

  const handleBulkAdd = useCallback(
    (product: Product, count: number) => {
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

  const getCartQty = (id: number) => {
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
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900">
      <header className="bg-white border-b border-stone-200 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-8">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              setActivePage('shop');
              setSelectedProduct(null);
            }}
            className="text-lg font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0"
          >
            CampusStore
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
            <button
              type="button"
              onClick={() => {
                setActivePage('shop');
                setSelectedProduct(null);
              }}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activePage === 'shop' ? 'text-stone-900 underline underline-offset-4' : ''
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
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activePage === 'saved' ? 'text-stone-900 underline underline-offset-4' : ''
              }`}
            >
              Saved ({savedIds.length})
            </button>
            <button
              type="button"
              onClick={() => {
                setActivePage('bulk');
                setSelectedProduct(null);
              }}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activePage === 'bulk' ? 'text-stone-900 underline underline-offset-4' : ''
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
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activePage === 'orders' ? 'text-stone-900 underline underline-offset-4' : ''
              }`}
            >
              Orders ({orders.length})
            </button>
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => {
                setActivePage('checkout');
                setSelectedProduct(null);
              }}
              className="px-4 py-2 text-xs font-medium text-white bg-stone-900 rounded hover:bg-stone-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer num-text"
            >
              Cart ({cartCount}) · Rs. {cartSubtotal.toLocaleString('en-IN')}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-8">
        {selectedProduct ? (
          <div className="bg-white border border-stone-200 rounded-md p-6 mb-8">
            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              className="text-xs font-medium text-stone-600 hover:text-stone-900 underline mb-4 cursor-pointer"
            >
              &larr; Back to Products
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
              <div className="md:col-span-5 flex flex-col justify-center border border-stone-200 rounded overflow-hidden">
                <ProductVisual
                  iconType={selectedProduct.iconType}
                  color={selectedProduct.color}
                  code={selectedProduct.code}
                />
              </div>

              <div className="md:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="text-xs text-stone-500">
                    {selectedProduct.category} · {selectedProduct.brand} · Code {selectedProduct.code}
                  </div>
                  <h1 className="text-2xl font-bold text-stone-900 mt-1">
                    {selectedProduct.name}
                  </h1>
                  <div className="text-sm text-stone-600 mt-1 num-text">
                    Rating: ★ {selectedProduct.rating.toFixed(1)} / 5.0 · Availability: {selectedProduct.stock} units
                  </div>
                  <p className="text-sm text-stone-700 mt-4 leading-relaxed">
                    {selectedProduct.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-stone-500 block">Unit Price</span>
                    <span className="text-2xl font-bold text-stone-900 num-text">
                      Rs. {selectedProduct.price.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => toggleSaved(selectedProduct.id)}
                      className="px-4 py-2 text-xs font-medium border border-stone-300 rounded text-stone-700 hover:bg-stone-100 cursor-pointer"
                    >
                      {savedIds.includes(selectedProduct.id) ? 'Saved in List' : 'Save for Later'}
                    </button>
                    <button
                      type="button"
                      onClick={() => addToCart(selectedProduct)}
                      className="px-5 py-2 text-xs font-medium bg-stone-900 text-white rounded hover:bg-stone-800 cursor-pointer"
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
            <section className="bg-white border border-stone-200 rounded-md p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8">
                <div className="text-xs text-stone-500">
                  University Books, Lab Electronics &amp; Daily Stationery
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-stone-900 mt-1 tracking-tight">
                  Essential Course Books &amp; Lab Supplies at Student Prices
                </h1>
                <p className="text-sm text-stone-600 mt-2 max-w-2xl leading-relaxed">
                  Browse prescribed reference textbooks, scientific calculators, notebooks, and accessories. Free campus delivery on orders above Rs. 999 or use code <span className="font-mono font-medium text-stone-900">STUDENT10</span> at checkout.
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-2.5 justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('Books')}
                  className="px-4 py-2.5 text-xs font-medium bg-stone-900 text-white rounded hover:bg-stone-800 text-center cursor-pointer"
                >
                  Browse Reference Books
                </button>
                <button
                  type="button"
                  onClick={() => setActivePage('bulk')}
                  className="px-4 py-2.5 text-xs font-medium border border-stone-300 text-stone-800 rounded hover:bg-stone-100 text-center cursor-pointer"
                >
                  Open Bulk Order Calculator
                </button>
              </div>
            </section>

            <section className="bg-white border border-stone-200 rounded-md p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-5">
                  <label className="block text-xs font-medium text-stone-600 mb-1">
                    Search by Title, Brand, or Keyword
                  </label>
                  <input
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Search e.g. JavaScript, Casio, Notebook..."
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded focus:outline-none focus:border-stone-700"
                  />
                </div>

                <div className="md:col-span-4">
                  <label className="block text-xs font-medium text-stone-600 mb-1 num-text">
                    Max Price Filter: Rs. {maxPrice}
                  </label>
                  <input
                    type="range"
                    min={200}
                    max={1500}
                    step={50}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-stone-900 cursor-pointer"
                  />
                </div>

                <div className="md:col-span-3">
                  <label className="block text-xs font-medium text-stone-600 mb-1">
                    Sort Items By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded bg-white focus:outline-none focus:border-stone-700"
                  >
                    <option value="default">Default Order</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Customer Rating</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-100">
                <div className="flex flex-wrap items-center gap-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-stone-900 text-white'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-3 text-xs text-stone-600">
                  <span className="num-text">Showing {filteredProducts.length} of {productList.length} items</span>
                  {(searchText !== '' || selectedCategory !== 'All' || maxPrice < 1500 || sortBy !== 'default') && (
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="text-stone-900 underline cursor-pointer"
                    >
                      Reset Filters
                    </button>
                  )}
                </div>
              </div>
            </section>

            {filteredProducts.length === 0 ? (
              <div className="bg-white border border-stone-200 rounded-md p-8 text-center">
                <p className="text-base font-semibold text-stone-800">No matching products found</p>
                <p className="text-xs text-stone-600 mt-1">
                  Try increasing the maximum price range or clearing your search text.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-4 px-4 py-2 text-xs font-medium bg-stone-900 text-white rounded hover:bg-stone-800 cursor-pointer"
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
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <div>
                <h1 className="text-xl font-bold text-stone-900">Saved Items ({savedProducts.length})</h1>
                <p className="text-xs text-stone-600 mt-0.5">
                  Items bookmarked for upcoming semesters or lab requirements.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActivePage('shop')}
                className="px-3 py-1.5 text-xs font-medium border border-stone-300 rounded hover:bg-stone-100 cursor-pointer"
              >
                Back to Catalog
              </button>
            </div>

            {savedProducts.length === 0 ? (
              <div className="bg-white border border-stone-200 rounded-md p-8 text-center">
                <p className="text-sm text-stone-600">You have not saved any items yet.</p>
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
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <div>
                <h1 className="text-xl font-bold text-stone-900">Order History &amp; Receipts</h1>
                <p className="text-xs text-stone-600 mt-0.5">
                  Summary of submitted orders stored in browser localStorage.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActivePage('shop')}
                className="px-3 py-1.5 text-xs font-medium bg-stone-900 text-white rounded hover:bg-stone-800 cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>

            {latestOrder && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-md p-4 text-sm text-emerald-950">
                <span className="font-bold">Order {latestOrder.orderId} Confirmed!</span> Thank you, {latestOrder.customerName}. Your receipt is recorded below.
              </div>
            )}

            {orders.length === 0 ? (
              <div className="bg-white border border-stone-200 rounded-md p-8 text-center">
                <p className="text-sm text-stone-600">No orders placed yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((ord) => (
                  <div key={ord.orderId} className="bg-white border border-stone-200 rounded-md p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-200">
                      <div>
                        <span className="text-sm font-bold text-stone-900 num-text">{ord.orderId}</span>
                        <span className="text-xs text-stone-500 ml-2">· Placed on {ord.date}</span>
                      </div>
                      <div className="text-xs text-stone-700 num-text">
                        Payment: {ord.paymentMethod} · Total: <span className="font-bold">Rs. {ord.totalAmount.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    <div className="text-xs text-stone-600 mt-3">
                      <span className="font-medium text-stone-800">Deliver To:</span> {ord.customerName} ({ord.phone}, {ord.email}) — {ord.address}, PIN {ord.pincode}
                    </div>

                    <div className="mt-3 overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="border-b border-stone-200 text-stone-500">
                            <th className="py-2 pr-4 font-medium">Code</th>
                            <th className="py-2 pr-4 font-medium">Item Name</th>
                            <th className="py-2 pr-4 font-medium num-text">Qty</th>
                            <th className="py-2 font-medium text-right num-text">Amount</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                          {ord.items.map(({ product, quantity }) => (
                            <tr key={product.id}>
                              <td className="py-2 pr-4 num-text text-stone-500">{product.code}</td>
                              <td className="py-2 pr-4 text-stone-800">{product.name}</td>
                              <td className="py-2 pr-4 num-text">{quantity}</td>
                              <td className="py-2 text-right num-text font-medium">
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

      <footer className="bg-white border-t border-stone-200 mt-12">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>CampusStore — Academic Books, Electronics &amp; Stationery Portal</div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setActivePage('shop')}
              className="hover:text-stone-900 cursor-pointer"
            >
              Catalog
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => setActivePage('bulk')}
              className="hover:text-stone-900 cursor-pointer"
            >
              Bulk Calculator
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => setActivePage('checkout')}
              className="hover:text-stone-900 cursor-pointer"
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
