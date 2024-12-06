import mongoose from "mongoose";

const unfilteredPostSchema = new mongoose.Schema({
  user: {
    username: { type: String, required: true },
  },
  post: {
    text: { type: String, default: null },
    imageUrl: { type: String, default: null },
  },
  numberOfTimesNeededToBeFiltered: { type: Number, default: 1 },
});

const UnfilteredPost = mongoose.model("UnfilteredPost", unfilteredPostSchema);

export default UnfilteredPost;
