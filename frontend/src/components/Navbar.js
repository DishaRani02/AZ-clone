import React from 'react';
import '../App.css';

function Navbar({ cartCount, setShowCart, search, setSearch, setShowOrderHistory, orderCount }) {
  return (
    <div className="navbar">
      <h1 className="navbar-logo">amazon</h1>
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="navbar-search"
      />
      <div
        onClick={() => setShowOrderHistory(true)}
        style={{
          color: 'white',
          fontSize: '14px',
          cursor: 'pointer',
          whiteSpace: 'nowrap'
        }}>
        📦 Orders ({orderCount})
      </div>
      <div onClick={() => setShowCart(true)} className="navbar-cart">
        🛒 Cart ({cartCount})
      </div>
    </div>
  );
}

export default Navbar;
