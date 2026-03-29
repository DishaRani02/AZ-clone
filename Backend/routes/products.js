const express = require('express');
const router = express.Router();
const products = require('../data/products');

// Sabhi products lao
router.get('/', (req, res) => {
  let result = products;

  // Search filter
  if (req.query.search) {
    result = result.filter(p =>
      p.name.toLowerCase().includes(req.query.search.toLowerCase())
    );
  }

  // Category filter
  if (req.query.category && req.query.category !== 'All') {
    result = result.filter(p => p.category === req.query.category);
  }

  res.json(result);
});

// Ek product lao
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: 'Product nahi mila' });
  res.json(product);
});

module.exports = router;