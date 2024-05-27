import Product from '../models/product.js';

export const createProduct = async (req, res) => {
  const { name, description, price } = req.body;
  try {
    const product = await Product.create({ name, description, price, user: req.user._id });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create product' });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ user: req.user._id });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product || product.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ error: 'unauthorized' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    product.name = name;
    product.description = description;
    product.price = price;
    await product.save();

    res.json(product);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update product' });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete product' });
  }
};

export const deleteAllProducts = async (req, res) => {
  try {
    await Product.deleteMany({});
    res.json({ message: 'All products deleted successfully' });
  } catch (error) {
    console.error('Error deleting all products:', error);
    res.status(500).json({ error: 'Failed to delete all products' });
  }
};
