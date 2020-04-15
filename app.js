const express = require("express");
const mongoose = require("mongoose");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

// import des routes
// const siteRoutes = require("./routes/site");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

module.exports = app;
