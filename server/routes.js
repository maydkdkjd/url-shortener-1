const express = require('express');
const record = express.Router();
const crypto = require('crypto');
const dbo = require('./conn');

record.route('/urls/add').post(function (req, res) {
  const url = req.body.targetUrl;
  crypto.randomBytes(15, (err, buffer) => {
    if (err) throw err;

    // const query = { url: url };
    const newUrl = {
      shortUrl: buffer.toString('hex').slice(0, 15),
      url: url,
    };

    dbo.getDb().collection('urls').insertOne({
      ...newUrl,
      lastModified: new Date()  
    })
    .then((result) => {
      console.log(result);
      res.json(newUrl);
    })
    .catch(err => {
      throw err;
    })
  })
})

record.route('/urls').get((req, res) => {
  dbo.getDb().collection('urls').find().sort({lastModified: -1})
  .toArray()
  .then(result => {
    res.json(result);
  })
  .catch(err => {
    throw err;
  })
})

record.route('/urls/delete').post((req, res) => {
  dbo.getDb().collection('urls').deleteOne({
    shortUrl: req.body.shortUrl
  }).then((result) => {
    console.log(result);
    res.json({success: true});
  }).catch(err => {
    throw err;
  })
})

record.route('/urls/update').post((req, res) => {
  const query = {shortUrl: req.body.shortUrl};
  const update = {url: req.body.url.trim(), lastModified: new Date()};

  dbo.getDb().collection('urls').updateOne(query, {$set: update})
  .then(result => {
    console.log(result);
    res.json({success: true});
  })
  .catch(err => {
    throw err;
  })

  // dbo.getDb().collection('urls').updateOne({
  //   shortUrl: req.body.shortUrl
  // }, {$set: {url: req.body.url}}).then((result) => {
  //   console.log(result);
  //   res.json({success: true});
  // }).catch(err => {
  //   throw err;
  // })
})


record.route('/u/:id').get((req, res) => {
  dbo.getDb().collection('urls').findOne({
    shortUrl: req.params.id
  }).then(result => {
    if (result) {
      res.redirect(302, result.url);
    } else {
      res.json({err: 'Not found'}).sendStatus(404);
    }
  })
})

module.exports = record;
