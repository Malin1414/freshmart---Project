const { Schema, model } = require('mongoose');

const OrderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ type: String }],
  total: { type: Number, required: true },
  status: { type: String, enum: ['Processing', 'In Transit', 'Delivered', 'Cancelled'], default: 'Processing' },
  address: { type: String, required: true },
  payment: { type: String, required: true },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = model('Order', OrderSchema);
