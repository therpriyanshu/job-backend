import express from "express";
import {
  getProfile,
  updateProfile,
  getAppliedJobs,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import uploadMiddleware from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Protected routes
router.get("/profile", authMiddleware, getProfile);
router.put(
  "/profile",
  authMiddleware,
  uploadMiddleware.single("resume"),
  updateProfile
);
router.get("/applications", authMiddleware, getAppliedJobs);

export default router;
