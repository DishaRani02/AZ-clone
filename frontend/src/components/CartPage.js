import React from 'react';

function CartPage({ cart, setCart, setShowCart, setShowCheckout }) {

  const updateQuantity = (id, change) => {
    setCart(prev => prev.map(item =>
      item.id === id
        ? { ...item, quantity: item.quantity + change }
        : item
    ).filter(item => item.quantity > 0));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <button
        onClick={() => setShowCart(false)}
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

      <h2>Shopping Cart</h2>

      {cart.length === 0 ? (
        <p>Cart khali hai!</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              backgroundColor: 'white',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '10px',
              border: '1px solid #ddd'
            }}>
              <img src={item.image} alt={item.name}
                style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 'bold', margin: '0 0 5px' }}>{item.name}</p>
                <p style={{ color: '#B12704', fontWeight: 'bold', margin: 0 }}>₹{item.price}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button onClick={() => updateQuantity(item.id, -1)}
                  style={{ padding: '4px 12px', fontSize: '18px', cursor: 'pointer' }}>-</button>
                <span style={{ fontWeight: 'bold' }}>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)}
                  style={{ padding: '4px 12px', fontSize: '18px', cursor: 'pointer' }}>+</button>
              </div>
              <p style={{ fontWeight: 'bold', minWidth: '80px', textAlign: 'right' }}>
                ₹{item.price * item.quantity}
              </p>
            </div>
          ))}

          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            textAlign: 'right'
          }}>
            <h3>Total: ₹{total}</h3>
            <button
              onClick={() => setShowCheckout(true)}
              style={{
                backgroundColor: '#FFD814',
                border: 'none',
                padding: '12px 40px',
                borderRadius: '20px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '16px'
              }}>
              Checkout →
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;