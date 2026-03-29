import React from 'react';

function Navbar({ cartCount, setShowCart, search, setSearch, setShowOrderHistory, orderCount, setShowWishlist, wishlistCount }) {
  return (
    <div style={{ backgroundColor: '#131921', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
      <img 
    src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
    alt="Amazon"
    style={{ height: '30px', filter: 'brightness(0) invert(1)' }}
      />
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