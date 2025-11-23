import User from "../models/User.js";
import Application from "../models/Application.js";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const data = req.body;

    if (req.file) data.resume = req.file.filename;

    const user = await User.findByIdAndUpdate(req.user.id, data, { new: true });

    res.json({ message: "Profile updated", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const apps = await Application.find({ userId: req.user.id }).populate(
      "jobId"
    );
    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
