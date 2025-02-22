const Product = require('../models/Product');

exports.createProduct = async (req, res, next) => {
    try {
        const { name, description, category, stock, price } = req.body;
        if (!name || !description || !category || stock == null || price == null) {
            return res.status(400).json({ message: 'Все поля обязательны для заполнения.' });
        }
        const newProduct = await Product.create({ name, description, category, stock, price });
        res.status(201).json(newProduct);
    } catch (err) {
        next(err);
    }
};

exports.getProducts = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;
        const products = await Product.find().skip(offset).limit(limit);
        res.json(products);
    } catch (err) {
        next(err);
    }
};

exports.getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Товар не найден.' });
        res.json(product);
    } catch (err) {
        next(err);
    }
};

exports.updateProduct = async (req, res, next) => {
    try {
        const { name, description, category, stock, price } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, description, category, stock, price },
            { new: true, runValidators: true }
        );
        if (!updatedProduct) return res.status(404).json({ message: 'Товар не найден.' });
        res.json(updatedProduct);
    } catch (err) {
        next(err);
    }
};

exports.deleteProduct = async (req, res, next) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: 'Товар не найден.' });
        res.json({ message: 'Товар успешно удалён.' });
    } catch (err) {
        next(err);
    }
};
