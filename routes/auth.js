import express from "express";
import passport from "passport";
import { login, getUser, signUp, logout } from "../controllers/auth/index.js";
import otpRouter from "./otp.js";

const router = express.Router({ mergeParams: true });

router.use("/otp/:type", otpRouter);

// :type -> user, doctor
router.post("/login/:type", passport.authenticate("local"), login);
router.post("/signup/:type", signUp);
router.post("/logout", logout);
router.get("/", getUser);

export default router;
