const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ productStoreCode: -1 });
    res.render('product/index', { products });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Form to create a new product
router.get('/new', (req, res) => {
  res.render('product/new');
});

// Insert a new product
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body.product);
    await product.save();
    res.redirect('/products');
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/products');
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
