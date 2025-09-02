import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: { type: String, required: true },
    image: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
