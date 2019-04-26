const mongoose = require('mongoose');
const Listing = require('../models/Listing');
const fmtData = require('./format');
require('dotenv').config({ path: '../.env' });

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, err => {
  if (err) console.error(err);
});

const saveResults = async () => {
  const results = await fmtData();

  await results.map(obj => {
    const item = new Listing(obj);

    item.save(err => {
      if (err) console.error(err);
    });
  });
};

saveResults();
