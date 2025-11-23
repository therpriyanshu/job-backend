import mongoose from "mongoose";

const recruiterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    company: { type: String },

    role: { type: String, default: "recruiter" },
  },
  { timestamps: true }
);

export default mongoose.model("Recruiter", recruiterSchema);
