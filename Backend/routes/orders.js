const express = require('express');
const router = express.Router();

let orders = [];

// Order place karo
router.post('/', (req, res) => {
  const { cart, address, total } = req.body;

  if (!cart || cart.length === 0) {
    return res.status(400).json({ message: 'Cart khali hai!' });
  }

  const newOrder = {
    id: 'ORD' + Date.now(),
    items: cart,
    address: address,
    total: total,
    status: 'Confirmed',
    createdAt: new Date()
  };

  orders.push(newOrder);
  res.json({ success: true, order: newOrder });
});

// Sabhi orders dekho
router.get('/', (req, res) => {
  res.json(orders);
});

// Ek order dekho
router.get('/:id', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ message: 'Order nahi mila' });
  res.json(order);
});

module.exports = router;