const dotenv = require('dotenv');
const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
const Listing = require('../models/Listing');

dotenv.config();
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, err => {
  if (err) console.error(err);
});

const [month, day, year] = new Date().toLocaleDateString('en-US').split('/');

const formatDate = date => (Number(date) < 10 ? `0${date}` : date);
const today = `${formatDate(month)}%2F${formatDate(day)}%2F${year}`;

const link = `https://www.law.com/dailybusinessreview/foreclosures/?county=MIA&startDate=${today}`;

const scrape = async url => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const results = await page.evaluate(() => obj.searchresults.result);

    await page.close();
    await browser.close();
    return results;
  } catch (err) {
    console.error(err);
  }
};

const saveResults = async () => {
  const results = await scrape(link);

  results.map(o => {
    const instance = {
      casenumber: o.CASENUMBER,
      defendant: o.DEFENDANT,
      saleDate: o.SALEDATE,
      address: o.ADDRESS,
      city: o.CITY,
      zip: o.ZIP,
      state: o.STATE,
      assessedValue: o.ASSESSEDVALUE,
      finaladjustment: o.FINALADJUSTMENT
    };
    const newListItem = new Listing(instance);

    newListItem.save(err => {
      if (err) console.error(err);
    });
  });
};

module.exports = saveResults;
