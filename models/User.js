import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    phone: { type: String },
    location: { type: String },
    experience: { type: String },
    skills: [{ type: String }],

    resume: { type: String }, // resume file name
    github: { type: String },
    linkedin: { type: String },

    role: { type: String, default: "user" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
