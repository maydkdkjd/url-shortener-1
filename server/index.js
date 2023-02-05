const express = require('express');
require('dotenv').config();
const cors = require('cors');

var bodyParser = require('body-parser');
const app = express();

// parse application/json
app.use(bodyParser.json())

const dbo = require('./conn');

// middlewares for handling routes
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true
}))
app.use(require('./routes'));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  dbo.connectToServer();
  console.log(`URL shortener server listening on port ${port}`);
});
