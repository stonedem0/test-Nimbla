const mongoose = require('mongoose');
const { Schema } = mongoose;

const invoiceSchema = new Schema({ 
  invoice_value: String,
  customer_name: String,
  description: String,
  createdAt: { type: Date, default: Date.now },

});

const Invoice = mongoose.model('Invoice', invoiceSchema);
module.exports = Invoice