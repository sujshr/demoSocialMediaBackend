import mongoose from "mongoose";

const allPostSchema = new mongoose.Schema({
  user: {
    username: { type: String, required: true },
  },
  post: {
    text: { type: String, default: null },
    imageUrl: { type: String, default: null },
  },
  numberOfTimesNeededToBeFiltered: { type: Number, default: 2 },
});

const AllPost = mongoose.model("AllPost", allPostSchema);

export default AllPost;
