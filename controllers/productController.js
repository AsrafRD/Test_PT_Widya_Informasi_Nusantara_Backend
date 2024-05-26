import Product from "../models/product.js";

export const createProduct = async (req, res) => {
  const { name, description, price } = req.body;
  const product = await Product.create({
    name, description, price, userId: req.user.id
  });

  res.status(201).json(product);
};

export const getProducts = async (req, res) => {
  const products = await Product.findAll({ where: { userId: req.user.id } });
  res.json(products);
};

export const getProduct = async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product || product.userId !== req.user.id) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.json(product);
};

export const updateProduct = async (req, res) => {
  const { name, description, price } = req.body;
  const product = await Product.findByPk(req.params.id);

  if (!product || product.userId !== req.user.id) {
    return res.status(404).json({ error: 'Product not found' });
  }

  product.name = name;
  product.description = description;
  product.price = price;

  await product.save();
  res.json(product);
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findByPk(req.params.id);

  if (!product || product.userId !== req.user.id) {
    return res.status(404).json({ error: 'Product not found' });
  }

  await product.destroy();
  res.json({ message: 'Product deleted' });
};
