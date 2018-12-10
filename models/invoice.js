const mongoose = require('mongoose');
const { Schema } = mongoose;
console.log


const invoiceSchema = new Schema({
  user_id:{ type: Schema.Types.ObjectId, ref: 'User' },
  invoice_value: Number,
  customer_name: String,
  description: String,
  pay_date: String,
  paid_status: String,
  createdAt: { type: Date, default: Date.now },

});

const Invoice = mongoose.model('Invoice', invoiceSchema);
module.exports = Invoice