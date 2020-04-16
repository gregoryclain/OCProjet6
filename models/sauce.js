const mongoose = require("mongoose");

const sauceSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  config: [],
  sauce: String,
  image: String,
});

module.exports = mongoose.model("Sauce", sauceSchema);
