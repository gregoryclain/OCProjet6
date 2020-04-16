const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

// gestion cors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

// Connexion à la BDD
const dbPass = process.env.DB_PASSWORD;
const dbUrl = process.env.DB_URL;
const dbUser = process.env.DB_USER;
mongoose
  .connect("mongodb+srv://" + dbUser + ":" + dbPass + dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !!!"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(bodyParser.json());

// import des routes
// const siteRoutes = require("./routes/site");
const authRoutes = require("./routes/auth");

// ajout des routes dans l'app
// app.use("/api/site", siteRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;
