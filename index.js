require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Listing = require('./models/Listing');
const saveResults = require('./seeds/foreclosures-seeds');
const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;

app.use(cors());

router.get('/api', async (req, res) => {
  const pageNo = Number(req.query.pageNo) || 1;
  const pageSize = Number(req.query.pageSize) || 10;
  const query = {
    skip: pageSize * (pageNo - 1),
    limit: pageSize
  };
  Listing.countDocuments({}, (err, numRecords) => {
    if (err) return err;

    Listing.find({}, {}, query, (err, data) => {
      if (err) return err;
      const totalPages = Math.ceil(numRecords / pageSize);
      return res.json({ pageNo, totalPages, data });
    });
  });
});

router.get('/seed', async (req, res) => {
  if (req.query.idApiKey !== process.env.API_KEY) {
    res.send('nope');
  }
  const results = await saveResults();
  await res.json({ found: results.length });
});

app.use('/', router);
app.listen(port);
