const mongoose = require('mongoose');
const Listing = require('../models/Listing');
const fmtData = require('./format');
require('dotenv').config({ path: '../.env' });

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, err => {
  if (err) console.error(err);
});

const saveResults = async () => {
  const results = await fmtData();

  const saveToDB = results.map(obj => {
    const item = new Listing(obj);

    return item.save(err => {
      if (err.code === 11000) {
        console.log('duplicate prevented');
      }
    });
  });
  return saveToDB;
};

module.exports = saveResults;
