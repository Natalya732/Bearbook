import Posts from "../models/Posts.js";
import type { Request, Response } from "express";

export const createPost = async (req: Request, res: Response) => {
  try {
    const { userId, content, image } = req.body;
    const post = new Posts({ userId, content, image });
    await post.save();
    res.status(201).json(post);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { content, image } = req.body;
    const post = await Posts.findByIdAndUpdate(
      id,
      { content, image },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post updated successfully", post });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await Posts.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

