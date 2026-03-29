import React, { useState } from 'react';

function ProductDetailPage({ product, addToCart, setShowDetail }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>

      {/* Go Back button */}
      <button
        onClick={() => setShowDetail(null)}
        style={{
          backgroundColor: '#FFD814',
          border: 'none',
          padding: '8px 20px',
          borderRadius: '20px',
          cursor: 'pointer',
          fontWeight: 'bold',
          marginBottom: '20px'
        }}>
        ← Wapas Jao
      </button>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '40px',
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        border: '1px solid #ddd'
      }}>

        {/* Left - Product Image */}
        <div style={{ textAlign: 'center' }}>
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: '100%',
              maxHeight: '400px',
              objectFit: 'contain',
              border: '1px solid #f0f0f0',
              borderRadius: '8px',
              padding: '20px'
            }}
          />
        </div>

        {/* Right - Product Info */}
        <div>
          <h2 style={{ fontSize: '22px', margin: '0 0 10px' }}>{product.name}</h2>

          {/* Rating */}
          <div style={{ color: '#FF9900', fontSize: '18px', marginBottom: '10px' }}>
            ★★★★☆
            <span style={{ color: '#666', fontSize: '14px', marginLeft: '8px' }}>
              (1,243 ratings)
            </span>
          </div>

          <hr style={{ border: '1px solid #f0f0f0', margin: '15px 0' }} />

          {/* Price */}
          <div style={{ marginBottom: '15px' }}>
            <span style={{ fontSize: '14px', color: '#666' }}>M.R.P: </span>
            <span style={{
              fontSize: '14px',
              color: '#666',
              textDecoration: 'line-through'
            }}>
              ₹{Math.round(product.price * 1.2)}
            </span>
            <div style={{ color: '#B12704', fontWeight: 'bold', fontSize: '28px' }}>
              ₹{product.price}
            </div>
            <span style={{ color: '#007600', fontSize: '14px' }}>
              20% off | Free Delivery
            </span>
          </div>

          <hr style={{ border: '1px solid #f0f0f0', margin: '15px 0' }} />

          {/* Stock */}
          <p style={{ color: '#007600', fontWeight: 'bold', fontSize: '16px' }}>
            In Stock ✓
          </p>

          {/* Quantity */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
            <span style={{ fontWeight: 'bold' }}>Quantity:</span>
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              style={{
                padding: '4px 12px',
                fontSize: '18px',
                cursor: 'pointer',
                borderRadius: '4px',
                border: '1px solid #ddd'
              }}>-</button>
            <span style={{ fontWeight: 'bold', fontSize: '18px' }}>{quantity}</span>
            <button
              onClick={() => setQuantity(q => q + 1)}
              style={{
                padding: '4px 12px',
                fontSize: '18px',
                cursor: 'pointer',
                borderRadius: '4px',
                border: '1px solid #ddd'
              }}>+</button>
          </div>

          {/* Buttons */}
          <button
            onClick={handleAddToCart}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: added ? '#007600' : '#FFD814',
              border: 'none',
              borderRadius: '20px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '16px',
              marginBottom: '10px',
              color: added ? 'white' : 'black',
              transition: 'background-color 0.3s'
            }}>
            {added ? '✓ Cart mein add ho gaya!' : 'Add to Cart'}
          </button>

          <button style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#FF9900',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '16px',
            color: 'white'
          }}>
            Buy Now
          </button>

          <hr style={{ border: '1px solid #f0f0f0', margin: '20px 0' }} />

          {/* Description */}
          <div>
            <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>Product Description</h3>
            <ul style={{ color: '#444', lineHeight: '1.8', paddingLeft: '20px' }}>
              <li>High quality product with 1 year warranty</li>
              <li>Free delivery on orders above ₹499</li>
              <li>Easy 30 day return policy</li>
              <li>Secure packaging</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;