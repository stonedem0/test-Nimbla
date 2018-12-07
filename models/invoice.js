const mongoose = require('mongoose');
const { Schema } = mongoose;

const invoiceSchema = new Schema({ 
  invoice_value: Number,
  customer_name: String,
  description: String,
  paid_status: String,
  createdAt: { type: Date, default: Date.now },

});

const Invoice = mongoose.model('Invoice', invoiceSchema);
module.exports = Invoice