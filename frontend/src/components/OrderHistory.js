import React from 'react';

function OrderHistory({ orders, setShowOrderHistory }) {
  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <button
        onClick={() => setShowOrderHistory(false)}
        style={{
          backgroundColor: '#FFD814',
          border: 'none',
          padding: '8px 20px',
          borderRadius: '20px',
          cursor: 'pointer',
          fontWeight: 'bold',
          marginBottom: '20px'
        }}>
        ← Go Back
      </button>

      <h2 style={{ marginBottom: '20px' }}>Your Orders</h2>

      {orders.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px',
          backgroundColor: 'white',
          borderRadius: '8px',
          border: '1px solid #ddd'
        }}>
          <p style={{ fontSize: '18px', color: '#666' }}>No orders yet!</p>
        </div>
      ) : (
        orders.map(order => (
          <div key={order.id} style={{
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '15px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid #f0f0f0',
              paddingBottom: '10px',
              marginBottom: '15px',
              flexWrap: 'wrap',
              gap: '10px'
            }}>
              <div>
                <p style={{ fontWeight: 'bold', fontSize: '16px' }}>
                  Order ID: {order.id}
                </p>
                <p style={{ color: '#666', fontSize: '14px' }}>
                  {new Date(order.createdAt).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{
                  backgroundColor: '#e6f4ea',
                  color: '#007600',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}>
                  ✓ {order.status}
                </span>
                <p style={{ fontWeight: 'bold', fontSize: '18px', marginTop: '5px' }}>
                  Total: ₹{order.total}
                </p>
              </div>
            </div>

            {order.items.map(item => (
              <div key={item.id} style={{
                display: 'flex',
                gap: '15px',
                alignItems: 'center',
                marginBottom: '10px'
              }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                />
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 'bold', margin: 0 }}>{item.name}</p>
                  <p style={{ color: '#666', margin: 0, fontSize: '14px' }}>
                    Qty: {item.quantity} × ₹{item.price}
                  </p>
                </div>
                <p style={{ fontWeight: 'bold' }}>₹{item.price * item.quantity}</p>
              </div>
            ))}

            <div style={{
              borderTop: '1px solid #f0f0f0',
              paddingTop: '10px',
              marginTop: '10px'
            }}>
              <p style={{ color: '#666', fontSize: '14px' }}>
                📦 Delivery to: {order.address}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default OrderHistory;