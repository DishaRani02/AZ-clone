import React from 'react';

function ProductCard({ product, addToCart, setShowDetail }) {
  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        onClick={() => setShowDetail(product)}
      />
      <h3 onClick={() => setShowDetail(product)}>{product.name}</h3>
      <div style={{ color: '#FF9900', fontSize: '14px', marginBottom: '5px' }}>★★★★☆</div>
      <p className="product-price">₹{product.price}</p>
      <button
        className="add-to-cart-btn"
        onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;