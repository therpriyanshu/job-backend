import express from "express";
import {
  getAllUsers,
  approveJob,
  getAllRecruiters,
  deleteUser,
} from "../controllers/adminController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

// Admin only
router.get("/users", authMiddleware, roleMiddleware("admin"), getAllUsers);
router.get(
  "/recruiters",
  authMiddleware,
  roleMiddleware("admin"),
  getAllRecruiters
);
router.put(
  "/approve-job/:id",
  authMiddleware,
  roleMiddleware("admin"),
  approveJob
);
router.delete(
  "/users/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteUser
);

export default router;
