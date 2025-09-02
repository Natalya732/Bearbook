import express from "express";
import {
  createPost,
  updatePost,
  deletePost,
} from "../controllers/PostController.js";

const router = express.Router();

router.post("/create", createPost);
router.put("/update/:id", updatePost);
router.delete("/delete/:id", deletePost);

export default router;
