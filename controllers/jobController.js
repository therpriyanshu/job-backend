import Job from "../models/Job.js";

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json({ success: true, jobs }); // ✅ wrap in { jobs: [...] }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createJob = async (req, res) => {
  try {
    const job = new Job({
      title: req.body.title,
      company: req.body.company,
      salary: req.body.salary,
      location: req.body.location,
      description: req.body.description,
      jobType: req.body.jobType,
      experience: req.body.experience,
      skillsRequired: req.body.skillsRequired.split(","),
      recruiterId: req.user.id,
    });

    await job.save();

    return res.status(201).json({
      success: true,
      message: "Job created successfully!",
      job,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};
