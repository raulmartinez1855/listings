const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, err => {
  if (err) console.error(err);
});

const Schema = mongoose.Schema;
const ListingSchema = new Schema({
  caseNumber: { type: String, unique: true },
  dateCreated: String,
  name: String,
  address: String,
  notice: String
});

const Listing = mongoose.model('Listing', ListingSchema);

module.exports = Listing;
