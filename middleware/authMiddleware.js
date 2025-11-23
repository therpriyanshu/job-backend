import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Recruiter from "../models/Recruiter.js";
import Admin from "../models/Admin.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let account = null;

    if (decoded.role === "admin") {
      account = await Admin.findById(decoded.id).select("-password");
    } else if (decoded.role === "recruiter") {
      account = await Recruiter.findById(decoded.id).select("-password");
    } else {
      account = await User.findById(decoded.id).select("-password");
    }

    if (!account) {
      return res.status(401).json({ message: "Account not found" });
    }

    req.user = account;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;
