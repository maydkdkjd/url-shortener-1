const express = require('express');
const record = express.Router();
const crypto = require('crypto');
const dbo = require('./conn');

record.route('/urls').post(function (req, res) {
  const url = req.body.targetUrl;
  crypto.randomBytes(15, (err, buffer) => {
    if (err) throw err;
    const query = { url: url };
    const update = {
      shortUrl: buffer.toString('hex').slice(0, 15),
      url: url,
    };

    console.log(update);

    dbo.getDb().collection('urls').updateOne(query, { $set: update }, { upsert: true })
      .then(result => {
        console.log(result);
        res.json(update).sendStatus(200);
      })
      .catch(err => {
        throw err;
      })
  })
})

record.route('/:id').get((req, res) => {
  dbo.getDb().collection('urls').findOne({
    shortUrl: req.params.id
  }).then(result => {
    if (result) {
      res.redirect(302, result.url);
    } else {
      // res.json({err: 'Not found'}).sendStatus(404);
      console.log('Not found');
    }
  })
})

record.route('/').get((req, res) => {
  res.send('Hello, World');
  console.log(process.env.DB_URI);
})

module.exports = record;
