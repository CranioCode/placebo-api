import express from "express";
import passport from "passport";
import { login } from "../controllers/auth/login.js";
import { signUp } from "../controllers/auth/signup.js";
import otpRouter from "./otp.js";

const router = express.Router({ mergeParams: true });

router.use("/otp/:type", otpRouter);

// :type -> user, doctor
router.post("/login/:type", passport.authenticate("local"), login);
router.post("/signup/:type", signUp);

export default router;
