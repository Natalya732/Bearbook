import express from "express";

import {
  deleteUser,
  getUser,
  loginUser,
  registerUser,
  updateUser,
} from "../controllers/UserController.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/get/:id", getUser);
router.patch("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);


export default router;
