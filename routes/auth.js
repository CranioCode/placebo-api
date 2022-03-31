import express from "express";
import passport from "passport";
import { login, getUser, signUp, logout } from "../controllers/auth/index.js";
import { authenticated } from "../middlewares/auth.js";
import otpRouter from "./otp.js";

const router = express.Router({ mergeParams: true });

router.use("/otp/:type", otpRouter);

// :type -> user, doctor
router.post(
  "/login/:type",
  passport.authenticate("local", { failWithError: true }),
  login
);
router.post("/signup/:type", signUp);
router.post("/logout", authenticated, logout);
router.get("/", authenticated, getUser);

export default router;
