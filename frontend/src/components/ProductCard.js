import React from 'react';

function ProductCard({ product, addToCart, setShowDetail, toggleWishlist, isWishlisted }) {
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', backgroundColor: 'white', cursor: 'pointer', position: 'relative' }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
      <div onClick={() => toggleWishlist && toggleWishlist(product)}
        style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '20px', cursor: 'pointer' }}>
        {isWishlisted && isWishlisted(product.id) ? '❤️' : '🤍'}
      </div>
      <img src={product.image} alt={product.name} onClick={() => setShowDetail(product)}
        style={{ width: '100%', height: '200px', objectFit: 'contain' }} />
      <h3 onClick={() => setShowDetail(product)} style={{ fontSize: '14px', margin: '10px 0 5px', cursor: 'pointer' }}>{product.name}</h3>
      <div style={{ color: '#FF9900', fontSize: '14px', marginBottom: '5px' }}>★★★★☆</div>
      <p style={{ color: '#B12704', fontWeight: 'bold', fontSize: '18px' }}>₹{product.price}</p>
      <button onClick={() => addToCart(product)}
        style={{ width: '100%', padding: '8px', backgroundColor: '#FFD814', border: 'none', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;