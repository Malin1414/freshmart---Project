const { Schema, model } = require('mongoose');

const NewsletterSchema = new Schema({
  email: { type: String, required: true, unique: true }
}, { timestamps: true });

module.exports = model('Newsletter', NewsletterSchema);
