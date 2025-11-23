import express from "express";
import {
  getRecruiterProfile,
  postJob,
  getPostedJobs,
  getApplicants,
} from "../controllers/recruiterController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

// Recruiter Only
router.get(
  "/profile",
  authMiddleware,
  roleMiddleware("recruiter"),
  getRecruiterProfile
);
router.post("/job", authMiddleware, roleMiddleware("recruiter"), postJob);
router.get("/jobs", authMiddleware, roleMiddleware("recruiter"), getPostedJobs);
router.get(
  "/applicants/:jobId",
  authMiddleware,
  roleMiddleware("recruiter"),
  getApplicants
);

export default router;
