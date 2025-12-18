const { Schema, model } = require('mongoose');

const CategorySchema = new Schema({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true }
});

module.exports = model('Category', CategorySchema);
