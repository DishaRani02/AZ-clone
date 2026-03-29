const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Get all products
app.get('/api/products', async (req, res) => {
  let query = supabase.from('products').select('*, categories(name)');
  
  if (req.query.search) {
    query = query.ilike('name', `%${req.query.search}%`);
  }
  
  if (req.query.category && req.query.category !== 'All') {
    const { data: cat } = await supabase.from('categories').select('id').eq('name', req.query.category).single();
    if (cat) query = query.eq('category_id', cat.id);
  }

  const { data, error } = await query;
  if (error) return res.status(500).json({ error });
  res.json(data);
});

// Get single product
app.get('/api/products/:id', async (req, res) => {
  const { data, error } = await supabase.from('products').select('*').eq('id', req.params.id).single();
  if (error) return res.status(404).json({ error });
  res.json(data);
});

// Place order
app.post('/api/orders', async (req, res) => {
  const { cart, address, total, userName, userEmail } = req.body;

  // Create user
  const { data: user } = await supabase.from('users').insert([
    { name: userName, email: userEmail, address: address }
  ]).select().single();

  // Create order
  const { data: order } = await supabase.from('orders').insert([
    { user_id: user.id, total: total, shipping_address: address, status: 'Confirmed' }
  ]).select().single();

  // Create order items
  const orderItems = cart.map(item => ({
    order_id: order.id,
    product_id: item.id,
    quantity: item.quantity,
    unit_price: item.price
  }));

  await supabase.from('order_items').insert(orderItems);

  res.json({ success: true, order });
});

// Get orders
app.get('/api/orders', async (req, res) => {
  const { data, error } = await supabase.from('orders').select('*');
  if (error) return res.status(500).json({ error });
  res.json(data);
});

app.get('/', (req, res) => {
  res.json({ message: 'Amazon Clone backend running!' });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server ${PORT} working`);
});