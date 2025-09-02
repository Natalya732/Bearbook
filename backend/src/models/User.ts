import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    role: { type: String, default: "user" },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, required: false },
    username: {
      type: String,
      default: `email_${Date.now()}`,
      unique: true,
    },
    bio: { type: String, required: false },
    location: { type: String, required: false },
    github: { type: String, required: false },
    linkedIn: { type: String, required: false },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
