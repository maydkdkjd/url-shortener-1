const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const dbo = require('./conn');

// middlewares for handling routes
app.use(require('./routes'));

app.listen(port, () => {
  dbo.connectToServer();
  console.log(`URL shortener server listening on port ${port}`);
});
