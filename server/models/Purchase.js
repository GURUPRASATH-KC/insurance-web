const mongoose = require('mongoose');

const PurchaseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  planName: {
    type: String,
    required: true
  },
  insurer: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  coverage: {
    type: String,
    required: true
  },
  members: {
    type: Number,
    required: true
  },
  purchaseDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Purchase', PurchaseSchema);
