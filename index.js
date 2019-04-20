const express = require('express');
const Listing = require('./models/Listing');
const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;
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

app.use('/', router);
app.listen(port);
