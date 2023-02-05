const express = require('express');
const record = express.Router();
const crypto = require('crypto');
const dbo = require('./conn');

record.route('/redirect').get((req, res) => {
  res.redirect(302, 'https://nitap.ac.in');
})

record.route('/gen').post((req, res) => {
  const { url } = req.body;
  crypto.randomBytes(15, (err, buffer) => {
    if (err) {
      res.json(err).sendStatus(500);
    } else {
      const query = {url: url};
      const update = {
        shortUrl: buffer.toString('hex'),
        url: url,
      };

      dbo.getDb().collection('urls').updateOne(query, update, {upsert: true})
      .then(result => {
        console.log(result);
        res.json({ url: url, shortUrl: shortUrl }).sendStatus(200);
      })
      .catch(err => {
        throw err;
      })
    }
  })
})

record.route('/:id').get((req, res) => {
  dbo.getDb().collection('urls').findOne({
    shortenedUrl: req.params.id
  }).then(result => {
    res.redirect(302, result.url);
  })
})

record.route('/').get((req, res) => {
  res.send('Hello, World');
  console.log(process.env.DB_URI);
})

module.exports = record;
