import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import {
  deleteUser,
  getUser,
  loginUser,
  logout,
  registerUser,
  updateUser,
} from "../controllers/UserController.js";

const router = express.Router();

// Public routes (no authentication required)
router.post("/signup", registerUser);
router.post("/login", loginUser);

// Protected routes (authentication required)
router.post("/logout", authenticateToken, logout);
router.get("/get/:id", authenticateToken, getUser);
router.patch("/update/:id", authenticateToken, updateUser);
router.delete("/delete/:id", authenticateToken, deleteUser);


export default router;
