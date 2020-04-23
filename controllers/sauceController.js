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
    likes: 0,
    dislikes: 0,
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "La sauce a été ajouté !" }))
    .catch((error) => res.status(400).json({ error }));
};

// show sauce
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

// like / dislike sauce
exports.like = (req, res, next) => {
  const like = req.body.like;
  const userId = req.body.userId;
  const sauceID = req.params.id;

  Sauce.findOne({ _id: sauceID }).then((sauce) => {
    let isInLikes = sauce.usersliked.includes(userId);
    let isInDisLikes = sauce.usersdisliked.includes(userId);

    switch (like) {
      case 0:
        console.log("il annule");
        // on l'enleve du tableau usersliked
        if (isInLikes) {
          sauce.usersliked.forEach((id, index) => {
            if (id == userId) {
              sauce.usersliked.splice(index, 1);
              sauce.likes--;
            }
          });
        }

        // on l'enleve du tableau usersdisliked
        if (isInDisLikes) {
          sauce.usersdisliked.forEach((id, index) => {
            if (id == userId) {
              sauce.usersdisliked.splice(index, 1);
              sauce.dislikes--;
            }
          });
        }

        break;
      case -1:
        console.log("il n'aime pas");
        // on l'enleve du tableau usersliked
        if (isInLikes) {
          sauce.usersliked.forEach((id, index) => {
            if (id == userId) {
              sauce.usersliked.splice(index, 1);
              sauce.likes--;
            }
          });
        }
        // ajout dans tableau usersdisliked seulement s'il n'est pas dans tableau
        if (!isInDisLikes) {
          sauce.usersdisliked.push(userId);
          sauce.dislikes++;
        }

        break;
      case 1:
        console.log("il aime");
        // on l'enleve du tableau usersdisliked
        if (isInDisLikes) {
          sauce.usersdisliked.forEach((id, index) => {
            if (id == userId) {
              sauce.usersdisliked.splice(index, 1);
              sauce.dislikes--;
            }
          });
        }

        // ajout dans tableau usersliked seulement s'il n'est pas dans tableau
        if (!isInLikes) {
          sauce.usersliked.push(userId);
          sauce.likes++;
        }
        break;
    }

    Sauce.findOneAndUpdate({ _id: sauceID }, sauce, { new: true })
      .then((result) => {
        res.status(200).json(sauce.likes - sauce.dislikes);
      })
      .catch((error) => res.status(500).json({ error }));
  });
};

exports.delete = (req, res, next) => {
  console.log("req.params.id", req.params.id);
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      // fs.unlink(`images/${filename}`, () => {
      Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Objet supprimé !" }))
        .catch((error) => res.status(400).json({ error }));
      // });
    })
    .catch((error) => res.status(500).json({ error }));
};
