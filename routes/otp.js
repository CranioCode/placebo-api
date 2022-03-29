import express from "express";
import { newOtp, verifyOtp } from "../controllers/auth/otp.js";

const router = express.Router({ mergeParams: true });

router.post("/new", newOtp);
router.post("/verify", verifyOtp);

export default router;
