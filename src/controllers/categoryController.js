const Category = require('../models/Category');

exports.createCategory = async (req, res, next) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Название категории обязательно.' });
        }
        const newCategory = await Category.create({ name });
        res.status(201).json(newCategory);
    } catch (err) {
        next(err);
    }
};

exports.getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        next(err);
    }
};

exports.getCategoryById = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Категория не найдена.' });
        }
        res.json(category);
    } catch (err) {
        next(err);
    }
};

exports.updateCategory = async (req, res, next) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Название категории обязательно для обновления.' });
        }
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            { name },
            { new: true, runValidators: true }
        );
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Категория не найдена.' });
        }
        res.json(updatedCategory);
    } catch (err) {
        next(err);
    }
};

exports.deleteCategory = async (req, res, next) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Категория не найдена.' });
        }
        res.json({ message: 'Категория успешно удалена.' });
    } catch (err) {
        next(err);
    }
};
