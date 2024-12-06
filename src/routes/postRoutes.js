import express from "express";
import {
  createPost,
  getPosts,
  getUserPosts,
  deletePost,
} from "../controllers/postController.js";

const router = express.Router();

router.post("/create", createPost);
router.get("/getUserPosts", getUserPosts);
router.delete("/deletePost/:postId", deletePost);
router.get("/", getPosts);

export default router;
