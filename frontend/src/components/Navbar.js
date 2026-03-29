import React from 'react';

function Navbar({ cartCount, setShowCart, search, setSearch, setShowOrderHistory, orderCount, setShowWishlist, wishlistCount }) {
  return (
    <div style={{ backgroundColor: '#131921', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
      <h1 style={{ color: 'white', fontSize: '24px', margin: 0, whiteSpace: 'nowrap' }}>amazon</h1>
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ flex: 1, minWidth: '150px', padding: '10px', fontSize: '16px', borderRadius: '4px', border: 'none', outline: 'none' }}
      />
      <div onClick={() => setShowOrderHistory(true)} style={{ color: 'white', fontSize: '14px', cursor: 'pointer', whiteSpace: 'nowrap' }}>
        📦 Orders ({orderCount})
      </div>
      <div onClick={() => setShowWishlist(true)} style={{ color: 'white', fontSize: '14px', cursor: 'pointer', whiteSpace: 'nowrap' }}>
        ❤️ Wishlist ({wishlistCount})
      </div>
      <div onClick={() => setShowCart(true)} style={{ color: 'white', fontSize: '14px', cursor: 'pointer', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
        🛒 Cart ({cartCount})
      </div>
    </div>
  );
}

export default Navbar;