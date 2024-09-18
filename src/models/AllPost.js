const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
});

const postSchema = new mongoose.Schema({
  created_at: { type: String, required: true },
  text: { type: String, required: true },
});

const allPostSchema = new mongoose.Schema({
  user: { type: userSchema, required: true },
  post: { type: postSchema, required: true },
  filtered: { type: Boolean, required: true },
});

module.exports = mongoose.model("AllPost", allPostSchema);
