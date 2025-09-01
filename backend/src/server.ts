import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";

dotenv.config();

const app = express();
const server = createServer(app);
const PORT = process.env.PORT ?? 5000;

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());

// Connect to MongoDB
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI ?? "";
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully ✅");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

// To Start Server

const startServer = async () => {
  server.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT} ✅`);
    await connectDB();
  });
};

startServer().catch(console.error);
