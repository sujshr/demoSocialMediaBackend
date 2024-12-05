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
          imageUrl: imageUrl || null, // Store image URL in AllPost model too
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

export { createPost, getPosts, setIO };
