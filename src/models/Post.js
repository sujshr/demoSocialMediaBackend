import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    user: {
      username: { type: String, required: true },
    },
    post: {
      text: { type: String, required: true },
      imageUrl: { type: String, default: null },
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
