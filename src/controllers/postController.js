const jwt = require("jsonwebtoken");
const Post = require("../models/Post");
const AllPost = require("../models/AllPost");

let io;

const setIO = (socketIO) => {
  io = socketIO;
};

const createPost = async (req, res) => {
  try {
    const { status } = req.body;

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send("No token provided");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { username } = decoded;

    const post = new Post({
      status,
      postedBy: username,
    });

    const createdAt = new Date().toISOString();
    const allPost = new AllPost({
      user: { username },
      post: {
        created_at: createdAt,
        text: status,
      },
      numberOfTimesNeededToBeFiltered: 2,
    });

    await post.save();
    await allPost.save();

    if (io) {
      io.emit("postCreated", {
        postedBy: username,
        createdAt: createdAt,
        status: status,
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

module.exports = { createPost, getPosts, setIO };
