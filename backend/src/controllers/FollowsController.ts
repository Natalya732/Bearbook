import Follows from "../models/Follows.js";
import type { Request, Response } from "express";
import User from "../models/User.js";
import Posts from "../models/Posts.js";

export const followUser = async (req: Request, res: Response) => {
  try {
    const { followerId, followingId } = req.body;
    const userId = req.user?.id; // From JWT token

    // Check if user is trying to follow themselves
    if (followerId === followingId) {
      return res.status(400).json({ message: "Cannot follow yourself" });
    }

    // Check if user is trying to follow on behalf of someone else
    if (followerId !== userId) {
      return res.status(403).json({ message: "Access denied - can only follow on your own behalf" });
    }

    if (!followerId || !followingId) {
      return res.status(400).json({ message: "Invalid user ids" });
    }

    // Check if already following
    const existingFollow = await Follows.findOne({ follower: followerId, following: followingId });
    if (existingFollow) {
      return res.status(400).json({ message: "Already following this user" });
    }

    const follow = new Follows({
      follower: followerId,
      following: followingId,
    });
    await follow.save();
    res.status(201).json(follow);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const unFollowUser = async (req: Request, res: Response) => {
  try {
    const { followerId, followingId } = req.params;
    const userId = req.user?.id; // From JWT token

    // Check if user is trying to unfollow on behalf of someone else
    if (followerId !== userId) {
      return res.status(403).json({ message: "Access denied - can only unfollow on your own behalf" });
    }

    const follow = await Follows.findOneAndDelete({
      follower: followerId,
      following: followingId,
    });
    if (!follow) {
      return res.status(404).json({ message: "Follow not found" });
    }
    res.status(200).json({ message: "Unfollowed successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getFollowers = async (req: Request, res: Response) => {
  try {
    const { followingId } = req.params;
    const followers = await Follows.find({ following: followingId });
    res.status(200).json(followers);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getUsersToFollow = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user?.id; // From JWT token

    // Check if user is requesting data for themselves
    if (userId !== currentUserId) {
      return res.status(403).json({ message: "Access denied - can only get posts for yourself" });
    }

    // Get all users that the current user is following
    const following = await Follows.find({ follower: userId });
    const followingIds = following.map((follow) => follow.following);

    // Get users that the current user is NOT following (excluding themselves)
    const usersNotFollowed = await User.find({
      _id: {
        $nin: [...followingIds, userId],
      },
    }).select("-password"); // Exclude password field

    res.status(200).json(usersNotFollowed);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getPostsOfFollowingUsers = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const following = await Follows.find({ follower: userId });
    const followingIds = following.map((follow) => follow.following);
    const posts = await Posts.find({ userId: { $in: followingIds } });
    if (!posts) {
      return res.status(404).json({ message: "No posts found" });
    }
    res.status(200).json(posts);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
