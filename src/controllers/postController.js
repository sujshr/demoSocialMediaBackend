import jwt from "jsonwebtoken";
import Post from "../models/Post.js";
import AllPost from "../models/AllPost.js";

let io;

const setIO = (socketIO) => {
  io = socketIO;
};

const createPost = async (req, res) => {
  try {
    const { status, imageUrl } = req.body;

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send("No token provided");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { username } = decoded;

    const createdAt = new Date().toISOString();
    const post = new Post({
      user: { username },
      post: {
        text: status,
        imageUrl: imageUrl || null,
      },
      postedBy: username,
    });

    const allPost = new AllPost({
      user: { username },
      post: {
        text: status,
        imageUrl: imageUrl || null,
      },
      numberOfTimesNeededToBeFiltered: 2,
    });

    await post.save();
    await allPost.save();

    if (io) {
      io.emit("postCreated", {
        user: { username },
        post: {
          text: status,
          imageUrl: imageUrl || null,
        },
        createdAt,
      });
    }

    res.status(201).send("Post created");
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getUserPosts = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send("No token provided");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { username, role } = decoded;

    if (role === "admin") {
      const allPosts = await Post.find().sort({ createdAt: -1 });
      return res.json({
        username,
        role,
        posts: allPosts,
      });
    }

    const userPosts = await Post.find({ "user.username": username }).sort({
      createdAt: -1,
    });
    res.json({
      username,
      role,
      posts: userPosts,
    });
  } catch (error) {
    console.error("Error in getUserPosts:", error);
    res.status(500).send(error.message);
  }
};

const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send("No token provided");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { username, role } = decoded;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).send("Post not found");
    }

    if (role !== "admin" && post.user.username !== username) {
      return res.status(403).send("Not authorized to delete this post");
    }

    await Post.findByIdAndDelete(postId);
    await AllPost.findOneAndDelete({
      "user.username": post.user.username,
      "post.text": post.post.text,
      "post.imageUrl": post.post.imageUrl,
    });

    if (io) {
      io.emit("postDeleted", { postId });
    }

    res.status(200).send("Post deleted successfully");
  } catch (error) {
    console.error("Error in deletePost:", error);
    res.status(500).send(error.message);
  }
};

export { createPost, getPosts, getUserPosts, deletePost, setIO };
