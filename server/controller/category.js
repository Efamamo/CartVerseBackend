import { validationResult } from 'express-validator';
import { formatErrors } from '../lib/utils.js';
import { Category } from '../models/category.js';
import mongoose from 'mongoose';
export const addCategory = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: formatErrors(errors) });
    }

    const { name_english, name_amharic, description } = req.body;

    const newCategory = new Category({
      name_english,
      name_amharic,
      description,
    });

    await newCategory.save();

    return res.redirect('/dashboard/categories');
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'server error' });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid Category ID' });
    }

    const role = await Category.findByIdAndDelete(id);

    if (!role) {
      return res.status(404).json({ error: 'Category Not Found' });
    }

    res.redirect('/dashboard/categories');
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: formatErrors(errors) });
    }

    const { name_english, name_amharic, description } = req.body;
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    category.name_english = name_english;
    category.name_amharic = name_amharic;
    category.description = description;

    await category.save();

    return res.redirect('/dashboard/categories');
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'server error' });
  }
};
