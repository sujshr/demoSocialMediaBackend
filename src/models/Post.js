const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    status: { type: String, required: true },
    postedBy: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
