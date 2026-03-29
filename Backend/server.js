const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Amazon Clone Backend chal raha hai!' });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server ${PORT} pe chal raha hai`);
});