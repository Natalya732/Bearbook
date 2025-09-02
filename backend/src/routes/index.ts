import express from "express";
import userRoutes from "./user.js";
import followsRoutes from "./follows.js";
import postRoutes from "./posts.js";
// import commentRoutes from "./comments.js";
// Add more route imports as needed

const router = express.Router();

// Mount all routes
router.use("/users", userRoutes);
router.use("/follows", followsRoutes);
router.use("/posts", postRoutes);
// router.use("/comments", commentRoutes);
// Add more route mounting as needed

export default router;

