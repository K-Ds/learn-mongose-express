const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  title: String,
  content: String,
});

module.exports = mongoose.model("Post", Schema);
