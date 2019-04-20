const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, err => {
  if (err) console.error(err);
});

const Schema = mongoose.Schema;
const ListingSchema = new Schema({
  casenumber: { type: String, unique: true },
  defendant: String,
  saleDate: String,
  address: String,
  city: String,
  zip: String,
  state: String,
  assessedValue: String,
  finaladjustment: String
});

const Listing = mongoose.model('Listing', ListingSchema);

module.exports = Listing;
