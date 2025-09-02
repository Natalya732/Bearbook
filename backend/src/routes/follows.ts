import express from "express";
import {
  followUser,
  unFollowUser,
  getFollowers,
} from "../controllers/FollowsController.js";

const router = express.Router();

router.post("/create", followUser);
router.put("/update/:id", unFollowUser);
router.delete("/delete/:id", getFollowers);

export default router;
