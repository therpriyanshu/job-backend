import express from "express";
import {
  registerUser,
  loginUser,
  recruiterRegister,
  loginRecruiter,
} from "../controllers/authController.js";
import { adminLogin } from "../controllers/adminController.js";

const router = express.Router();

router.post("/recruiter/register", recruiterRegister);
router.post("/recruiter/login", loginRecruiter);

router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/admin/login", adminLogin);

export default router;
