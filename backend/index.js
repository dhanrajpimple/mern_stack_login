const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes'); // Adjust the path based on your file structure
const cors = require('cors');



app.use(bodyParser.json());
const mongoose = require('mongoose');
const connectToDatabase  = require("./mongoose");
const port = process.env.PORT || 3002;
require('dotenv').config()
app.use(cors({ origin: 'http://localhost:3000' }));

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`)
})
connectToDatabase();
