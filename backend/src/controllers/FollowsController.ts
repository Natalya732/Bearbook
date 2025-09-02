import Follows from "../models/Follows.js";
import type { Request, Response } from "express";
import User from "../models/User.js";

export const followUser = async (req: Request, res: Response) => {
  try {
    const { followerId, followingId } = req.body;
    if (!followerId || !followingId) {
      return res.status(400).json({ message: "Invalid user ids" });
    }
    const follow = new Follows({ follower: followerId, following: followingId });
    await follow.save();
    res.status(201).json(follow);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const unFollowUser = async (req: Request, res: Response) => {
  try {
    const { followerId, followingId } = req.params;
    const follow = await Follows.findOneAndDelete({ follower: followerId, following: followingId });
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
    
    // Get all users that the current user is following
    const following = await Follows.find({ follower: userId });
    const followingIds = following.map(follow => follow.following);
    
    // Get users that the current user is NOT following (excluding themselves)
    const usersNotFollowed = await User.find({ 
      _id: { 
        $nin: [...followingIds, userId] 
      } 
    }).select('-password'); // Exclude password field
    
    res.status(200).json(usersNotFollowed);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};