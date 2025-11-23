import User from "../models/User.js";
import Recruiter from "../models/Recruiter.js";
import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
    });

    res
      .status(201)
      .json({ success: true, message: "Registration successful", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user =
      (await User.findOne({ email })) ||
      (await Recruiter.findOne({ email })) ||
      (await Admin.findOne({ email }));

    if (!user) return res.status(404).json({ message: "Account not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Incorrect password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const recruiterRegister = async (req, res) => {
  try {
    const { name, email, password, company } = req.body;

    const exists = await Recruiter.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Recruiter already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const recruiter = await Recruiter.create({
      name,
      email,
      password: hashed,
      company,
      role: "recruiter",
    });

    const token = jwt.sign(
      { id: recruiter._id, role: "recruiter" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({ message: "Recruiter registered", token, recruiter });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const loginRecruiter = async (req, res) => {
  try {
    const { email, password } = req.body;

    const recruiter = await Recruiter.findOne({ email });
    if (!recruiter) return res.status(400).json({ message: "Invalid email" });

    const isMatch = await bcrypt.compare(password, recruiter.password);
    if (!isMatch) return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign(
      { id: recruiter._id, role: "recruiter" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Recruiter logged in",
      token,
      recruiter,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
