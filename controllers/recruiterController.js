import Recruiter from "../models/Recruiter.js";
import Job from "../models/Job.js";
import Application from "../models/Application.js";

export const getRecruiterProfile = async (req, res) => {
  try {
    const recruiter = await Recruiter.findById(req.user.id);
    res.json(recruiter);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const postJob = async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      recruiterId: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Job posted successfully",
      job,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getPostedJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ recruiterId: req.user.id });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getApplicants = async (req, res) => {
  try {
    const apps = await Application.find({ jobId: req.params.jobId }).populate(
      "userId"
    );
    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
