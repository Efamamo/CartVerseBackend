import { validationResult } from 'express-validator';
import { formatErrors } from '../lib/utils.js';
import fs from 'fs';
import { Product } from '../models/product.js';
import mongoose from 'mongoose';
import { AdminUser } from '../models/admin.js';
import Purchase from '../models/purchase.js';

import { Category } from '../models/category.js';
import { v4 } from 'uuid';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getProductById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid Product ID' });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: 'Product Not Found' });
    }

    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

export const addProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      if (req.files.main_image) {
        fs.unlink(req.files.image.path, (err) => {
          console.log(err);
        });
      }

      if (req.files.sub_image) {
        fs.unlink(req.files.sub_images.path, (err) => {
          console.log(err);
        });
      }
      return res.status(400).send({ errors: formatErrors(errors) });
    }

    const { name, price, amount, description, category } = req.body;
    const { id } = req.user;

    const imageURL = req.files.main_image;
    if (!imageURL) {
      return res.status(400).send({
        errors: {
          image: 'image is required',
        },
      });
    }

    const newProduct = new Product({
      name,
      price,
      amount,
      description,
      category,
      owner: id,
      main_image: req.files.main_image[0].path, // First image for the main image
      sub_images: req.files.sub_images
        ? req.files.sub_images.map((file) => file.path)
        : [],
    });

    await newProduct.save();

    res.redirect('/dashboard/products');
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await AdminUser.findById(req.user.id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid Product ID' });
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ error: 'Product Not Found' });
    }

    if (product.owner.equals(user.id) || user.is_superuser) {
      await Product.findByIdAndDelete(id);
    }

    res.redirect('/dashboard/products');
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid Product ID' });
    }

    const user = await AdminUser.findById(req.user.id);

    const updateData = {};
    const allowedFields = [
      'name',
      'price',
      'amount',
      'description',
      'category',
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    let product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: 'Product Not Found' });
    }

    if (product.owner.equals(user._id) || user.is_superuser) {
      product = await Product.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });
      return res.redirect('/dashboard/products');
    }

    return res.redirect(`/dashboard/products/${id}/edit`);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

export const updateProductImages = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid Product ID' });
    }

    const imageURL = req.files.image;
    if (!imageURL) {
      return res.status(400).send({
        errors: {
          image: 'image is required',
        },
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: 'Product Not Found' });
    }

    product.main_image = imageURL[0].path;

    const subImageUrl = req.files.sub_images;
    if (subImageUrl) {
      product.sub_images = subImageUrl[0].path;
    }

    await product.save();
    res.json(product);
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const categories = async (req, res) => {
  console.log('categories');
  try {
    const categories = await Category.find();
    return res.json(categories);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e });
  }
};

export const checkout = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: formatErrors(errors) });
  }

  const { items, phoneNumber, email, address } = req.body;

  const { id } = req.user;

  const error = [];
  const purchaseItems = [];
  let total = 0;
  for (const item of items) {
    const { id, amount } = item;

    const i = await Product.findById(id);
    if (!i) {
      error.push(`item with id ${id} not found`);
    }
    if (i.amount < amount) {
      error.push(`amount: there are only ${i.amount} ${i.name}s`);
    }
    purchaseItems.push({ amount, product: id });
    total += amount * i.price;
  }

  if (error.length !== 0) {
    return res.status(400).send({ errors });
  }

  const tx = `chewatatest-${v4()}`;
  for (let p of purchaseItems) {
    const purchase = new Purchase({
      user: id,
      address,
      tx_ref: tx,
      product: p.product,
      amount: p.amount,
      paymentStatus: 'PENDING',
    });

    await purchase.save();
  }

  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${process.env.CHAPA_SECRET_KEY}`);
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    amount: total,
    currency: 'ETB',
    email: email,
    phone_number: phoneNumber,
    tx_ref: tx,
    callback_url: 'https://webhook.site/077164d6-29cb-40df-ba29-8a00e59a7e60',
    return_url: `http://localhost:3003/dashboard/purchases/${tx}`,
    'customization[title]': 'Payment for my favourite merchant',
    'customization[description]': 'I love online payments',
    'meta[hide_receipt]': 'true',
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
  };

  const response = await fetch(
    'https://api.chapa.co/v1/transaction/initialize',
    requestOptions
  );

  const result = await response.json();

  if (result.status === 'success') {
    return res.json(result.data.checkout_url);
  } else {
    return res.json(500).json('server error');
  }
};
