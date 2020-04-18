const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const sauceSchema = mongoose.Schema({
  userId: { type: String },
  name: { type: String },
  manufacturer: { type: String },
  description: { type: String },
  mainingredient: { type: String },
  imageUrl: { type: String },
  heat: { type: Number },
  likes: { type: Number },
  dislikes: { type: Number },
  usersliked: [],
  usersdisliked: [],
});

sauceSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Sauce", sauceSchema);
