const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sellerSchema = new Schema({
  sellerName: {
    type: String,
    required: true,
  },
  timeSlots: {
    type: Array,
    required: true,
  }
},{collection:'Sellers'});

const Seller = mongoose.model('Seller', sellerSchema);
module.exports = Seller;