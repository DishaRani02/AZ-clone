import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

function CheckoutPage({ cart, setCart, setShowCart, setShowCheckout, addOrder }) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', city: '', pincode: ''
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [sending, setSending] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = async () => {
    if (!form.name || !form.email || !form.address || !form.city || !form.pincode) {
      alert('Please fill all fields!');
      return;
    }

    setSending(true);
    const id = 'ORD' + Date.now();

    const itemsList = cart.map(item =>
      `${item.name} x${item.quantity} = ₹${item.price * item.quantity}`
    ).join('\n');

    try {
      await emailjs.send(
        'service_j87alnk',
        'template_nnc839v',
        {
          to_name: form.name,
          to_email: form.email,
          order_id: id,
          total: `₹${total}`,
          address: `${form.address}, ${form.city} - ${form.pincode}`,
          items: itemsList,
        },
        '136JVxy_FG1oK_-BR'
      );
    } catch (err) {
      console.log('Email error:', err);
    }

    const newOrder = {
      id: id,
      items: cart,
      address: `${form.address}, ${form.city} - ${form.pincode}`,
      total: total,
      status: 'Confirmed',
      createdAt: new Date()
    };

    addOrder(newOrder);
    setOrderId(id);
    setOrderPlaced(true);
    setCart([]);
    setSending(false);
  };

  if (orderPlaced) {
    return (
      <div style={{ maxWidth: '600px', margin: '60px auto', textAlign: 'center', backgroundColor: 'white', padding: '40px', borderRadius: '8px', border: '1px solid #ddd' }}>
        <div style={{ fontSize: '60px' }}>🎉</div>
        <h2 style={{ color: '#007600' }}>Order Placed Successfully!</h2>
        <p style={{ fontSize: '18px' }}>Order ID: <strong>{orderId}</strong></p>
        <p style={{ color: '#666' }}>A confirmation email has been sent to <strong>{form.email}</strong></p>
        <p>Delivery Address: {form.address}, {form.city} - {form.pincode}</p>
        <button
          onClick={() => { setShowCheckout(false); setShowCart(false); }}
          style={{ backgroundColor: '#FFD814', border: 'none', padding: '12px 40px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', marginTop: '20px' }}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <button onClick={() => setShowCheckout(false)}
        style={{ backgroundColor: '#FFD814', border: 'none', padding: '8px 20px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', marginBottom: '20px' }}>
        ← Back to Cart
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
          <h3>Delivery Address</h3>
          {[
            { label: 'Full Name', name: 'name', type: 'text' },
            { label: 'Email', name: 'email', type: 'email' },
            { label: 'Phone Number', name: 'phone', type: 'tel' },
            { label: 'Street Address', name: 'address', type: 'text' },
            { label: 'City', name: 'city', type: 'text' },
            { label: 'Pincode', name: 'pincode', type: 'text' },
          ].map(field => (
            <div key={field.name} style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd', fontSize: '14px', boxSizing: 'border-box' }}
              />
            </div>
          ))}
        </div>

        <div>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '15px' }}>
            <h3>Order Summary</h3>
            {cart.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid #f0f0f0' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
                  <div>
                    <p style={{ margin: 0, fontSize: '13px', fontWeight: 'bold' }}>{item.name}</p>
                    <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>Qty: {item.quantity}</p>
                  </div>
                </div>
                <p style={{ fontWeight: 'bold', margin: 0 }}>₹{item.price * item.quantity}</p>
              </div>
            ))}
            <div style={{ borderTop: '2px solid #ddd', paddingTop: '10px', textAlign: 'right' }}>
              <h3>Total: ₹{total}</h3>
            </div>
          </div>

          <button onClick={placeOrder} disabled={sending}
            style={{ width: '100%', backgroundColor: sending ? '#ccc' : '#FFD814', border: 'none', padding: '15px', borderRadius: '8px', cursor: sending ? 'not-allowed' : 'pointer', fontWeight: 'bold', fontSize: '18px' }}>
            {sending ? 'Placing Order...' : 'Place Order 🛒'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
