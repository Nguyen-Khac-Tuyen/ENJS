const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const app = express();

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/productDB', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
const productRoutes = require('./routes/productRoutes');
app.use('/products', productRoutes);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
