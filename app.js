const express = require('express');
const req = require('express/lib/request');
const mongoose = require('mongoose');
const { getBook, getBookFromId, postBook } = require('./src/controller/bookController');
const app = express();
const port = 3000;
const { connectDB } = require("./src/models/connect")
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const appStart = () => {
  app.use('/', getBook)
  app.listen(port, async () => {
    await connectDB()
    console.log(`Example app listening on port ${port}`);
  });
}
appStart()

