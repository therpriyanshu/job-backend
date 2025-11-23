import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    email: { type: String, required: true },
    resume: { type: String },

    status: {
      type: String,
      enum: ["Submitted", "Viewed", "Selected", "Rejected"],
      default: "Submitted",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);
