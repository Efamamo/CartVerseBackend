import { validationResult } from 'express-validator';
import { formatErrors } from '../lib/utils.js';
import { Category } from '../models/category.js';

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
