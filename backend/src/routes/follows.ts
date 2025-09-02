import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import {
  followUser,
  unFollowUser,
  getFollowers,
  getUsersToFollow,
  getPostsOfFollowingUsers,
} from "../controllers/FollowsController.js";

const router = express.Router();

// All follows routes require authentication
router.use(authenticateToken);

router.post("/follow", followUser);
router.delete("/unfollow/:followerId/:followingId", unFollowUser);
router.get("/followers/:followingId", getFollowers);
router.get("/suggestions/:userId", getUsersToFollow);
router.get("/posts/:userId", getPostsOfFollowingUsers);

export default router;
