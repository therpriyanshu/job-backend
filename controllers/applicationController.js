import Application from "../models/Application.js";
import Job from "../models/Job.js";

export const applyJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.user.id;

    const already = await Application.findOne({ jobId, userId });
    if (already) return res.status(400).json({ message: "Already applied" });

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const app = await Application.create({
      jobId,
      userId,
      email: req.user.email,
      resume: req.user.resume,
    });

    res.status(201).json({ message: "Applied successfully", app });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
