import React from 'react';

function Navbar({ cartCount, setShowCart, search, setSearch }) {
  return (
    <div style={{
      backgroundColor: '#131921',
      padding: '10px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: '20px'
    }}>
      <h1 style={{ color: 'white', fontSize: '24px', margin: 0, whiteSpace: 'nowrap' }}>
        amazon
      </h1>
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          flex: 1,
          padding: '10px',
          fontSize: '16px',
          borderRadius: '4px',
          border: 'none',
          outline: 'none'
        }}
      />
      <div
        onClick={() => setShowCart(true)}
        style={{
          color: 'white',
          fontSize: '14px',
          cursor: 'pointer',
          fontWeight: 'bold',
          whiteSpace: 'nowrap'
        }}>
        🛒 Cart ({cartCount})
      </div>
    </div>
  );
}

export default Navbar;