import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import ProductDetailPage from './components/ProductDetailPage';
import OrderHistory from './components/OrderHistory';
import './App.css';

const categories = ['All', 'Electronics', 'Fashion', 'Kitchen', 'Home', 'Sports'];

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showDetail, setShowDetail] = useState(null);
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://az-clone-backend.vercel.app/api/products')
      .then(res => res.json())
      .then(data => { setProducts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) return prev.filter(item => item.id !== product.id);
      return [...prev, product];
    });
  };

  const isWishlisted = (productId) => wishlist.some(item => item.id === productId);

  const addOrder = (order) => setOrders(prev => [order, ...prev]);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === 'All' || p.category === activeCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div style={{ backgroundColor: '#f3f3f3', minHeight: '100vh' }}>
      <Navbar
        cartCount={totalItems}
        setShowCart={setShowCart}
        search={search}
        setSearch={setSearch}
        setShowOrderHistory={setShowOrderHistory}
        orderCount={orders.length}
        setShowWishlist={setShowWishlist}
        wishlistCount={wishlist.length}
      />

      {showOrderHistory ? (
        <OrderHistory orders={orders} setShowOrderHistory={setShowOrderHistory} />
      ) : showCheckout ? (
        <CheckoutPage cart={cart} setCart={setCart} setShowCart={setShowCart} setShowCheckout={setShowCheckout} addOrder={addOrder} />
      ) : showCart ? (
        <CartPage cart={cart} setCart={setCart} setShowCart={setShowCart} setShowCheckout={setShowCheckout} />
      ) : showDetail ? (
        <ProductDetailPage product={showDetail} addToCart={addToCart} setShowDetail={setShowDetail} toggleWishlist={toggleWishlist} isWishlisted={isWishlisted} />
      ) : showWishlist ? (
        <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
          <button onClick={() => setShowWishlist(false)}
            style={{ backgroundColor: '#FFD814', border: 'none', padding: '8px 20px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', marginBottom: '20px' }}>
            ← Go Back
          </button>
          <h2 style={{ marginBottom: '20px' }}>Your Wishlist</h2>
          {wishlist.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #ddd' }}>
              <p style={{ fontSize: '18px', color: '#666' }}>Your wishlist is empty!</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
              {wishlist.map(product => (
                <ProductCard key={product.id} product={product} addToCart={addToCart} setShowDetail={setShowDetail} toggleWishlist={toggleWishlist} isWishlisted={isWishlisted} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          <div style={{ display: 'flex', gap: '10px', padding: '15px 20px', backgroundColor: 'white', borderBottom: '1px solid #ddd', overflowX: 'auto' }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                style={{ padding: '8px 20px', borderRadius: '20px', border: '1px solid #ddd', cursor: 'pointer', fontWeight: 'bold', whiteSpace: 'nowrap', backgroundColor: activeCategory === cat ? '#131921' : 'white', color: activeCategory === cat ? 'white' : 'black' }}>
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px', fontSize: '18px' }}>Loading products... ⏳</div>
          ) : filteredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px', fontSize: '18px', color: '#666' }}>😕 No products found!</div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px', padding: '20px' }}>
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} addToCart={addToCart} setShowDetail={setShowDetail} toggleWishlist={toggleWishlist} isWishlisted={isWishlisted} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;