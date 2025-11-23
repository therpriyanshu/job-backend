import express from "express";
import {
  getJobs,
  getJobById,
  createJob,
} from "../controllers/jobController.js";
import { applyJob } from "../controllers/applicationController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Job Routes
router.get("/", getJobs);
router.get("/:id", getJobById);

// CREATE JOB (Backend test)
router.post("/create", authMiddleware, createJob);

// Apply to Job
router.post("/:jobId/apply", authMiddleware, applyJob);

export default router;
