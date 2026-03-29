import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import ProductDetailPage from './components/ProductDetailPage';
import './App.css';

const categories = ['All', 'Electronics', 'Fashion', 'Kitchen', 'Home', 'Sports'];

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showDetail, setShowDetail] = useState(null);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  // Backend se products lao
  useEffect(() => {
    fetch('https://az-clone-backend.vercel.app/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.log('Error:', err);
        setLoading(false);
      });
  }, []);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

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
      />

      {showCheckout ? (
        <CheckoutPage
          cart={cart}
          setCart={setCart}
          setShowCart={setShowCart}
          setShowCheckout={setShowCheckout}
        />
      ) : showCart ? (
        <CartPage
          cart={cart}
          setCart={setCart}
          setShowCart={setShowCart}
          setShowCheckout={setShowCheckout}
        />
      ) : showDetail ? (
        <ProductDetailPage
          product={showDetail}
          addToCart={addToCart}
          setShowDetail={setShowDetail}
        />
      ) : (
        <div>
          {/* Category Filter */}
          <div style={{
            display: 'flex',
            gap: '10px',
            padding: '15px 20px',
            backgroundColor: 'white',
            borderBottom: '1px solid #ddd',
            overflowX: 'auto'
          }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '20px',
                  border: '1px solid #ddd',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  backgroundColor: activeCategory === cat ? '#131921' : 'white',
                  color: activeCategory === cat ? 'white' : 'black',
                  whiteSpace: 'nowrap'
                }}>
                {cat}
              </button>
            ))}
          </div>

          {/* Loading */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px', fontSize: '18px' }}>
              Loading products... ⏳
            </div>
          ) : filteredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px', fontSize: '18px', color: '#666' }}>
              😕 NO PRODUCTS FOUND!
            </div>
          ) : (
            
            <div className="products-grid">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                  setShowDetail={setShowDetail}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;