const mongoose = require("mongoose");
const Sauce = require("../models/sauce");
let multer = require("multer");
let upload = multer();

// liste des sauces
exports.list = (req, res, next) => {
  Sauce.find()
    .exec()
    .then((sauces) => {
      // if (sauces.length > 0) {
      // res.json({ sauces });
      res.send(sauces); // retour tableau
      // } else {
      //   res.status(404).json({ message: "No entries found" });
      // }
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

// create sauce
exports.create = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "La sauce a été ajouté !" }))
    .catch((error) => res.status(400).json({ error }));
};
