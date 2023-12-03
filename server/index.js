const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookies = require('cookie-parser');

const app = express();

const dbo = require('./conn');

app.use(cors({
  origin: process.env.ALLOWED_CROSS_ORIGINS.split(' '),
  credentials: true
}))
app.use(cookies());
app.use(express.json());

app.set('view engine', 'ejs');

const port = process.env.PORT || 5000;
app.listen(port, () => {
  dbo.connectToServer();
  console.log(`URL shortener server listening on port ${port}`);
});

// routes
app.use(require('./routes/urls'));
app.use(require('./routes/users'));