const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookies = require('cookie-parser');

const app = express();

const dbo = require('./conn');

app.use(cookies());
app.use(express.json());
// middlewares for handling routes
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}))
app.use(require('./routes/urls'));
app.use(require('./routes/users'));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  dbo.connectToServer();
  console.log(`URL shortener server listening on port ${port}`);
});
