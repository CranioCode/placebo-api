import User from "../../models/user.js";
import Doctor from "../../models/doctor.js";
import { newHashString } from "../../utils/string.js";
import { sendMail } from "../../utils/mailer.js";

/**
 * @description Generates a New OTP for the user
 * and sends it to the email.
 *
 * @param {import("express").Request} req Request object of the end-point
 * @param {import("express").Response} res Response object of the end-point
 */
async function newOtp(req, res) {
  try {
    const { email } = req.body;
    const { type } = req.params;

    let user;

    if (type === "doctor") {
      user = await Doctor.findOne({
        email,
      });
    } else {
      user = await User.findOne({
        email,
      });
    }

    const otp = newHashString();
    const expiry = 5 * 60 * 1000; // 5 min in milliseconds
    user.otp.value = otp;
    user.otp.expiry = expiry + new Date().getTime();

    await user.save();

    const subject = `Please Verify Your Otp | Placebo`;

    const html = `
      <p>
        <h3>Dear ${user.name},</h3>
      Please verify your OTP.
      </p>
      <p>OTP : <b>${otp}</b></p>
      <p>Duration: ${expiry / (60 * 1000)} min</p>
    `;

    await sendMail({ email, subject, html });

    res.json({
      success: true,
      message: "OTP Generated Successfully.",
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      error: "Internal Server Error.",
    });
  }
}

/**
 * @description Verifies the authenticity of the OTP
 * and verifies the user against it.
 *
 * @param {import("express").Request} req Request object of the end-point
 * @param {import("express").Response} res Response object of the end-point
 */
async function verifyOtp(req, res) {
  try {
    const { email, otp } = req.body;

    const { type } = req.params;

    let user;

    if (type === "doctor") {
      user = await Doctor.findOne({
        email,
      });
    } else {
      user = await User.findOne({
        email,
      });
    }

    // User Not Found
    if (!user) {
      res.json({
        success: false,
        error: "User not found",
      });
      return;
    }

    // User Already Verified
    if (user.verified) {
      res.json({
        success: false,
        error: "User already verified.",
      });
      return;
    }

    // OTP Expired
    if (user.otp.expiry < new Date()) {
      res.json({
        success: false,
        error: "OTP Expired.",
      });
      return;
    }

    // Incorrect OTP
    if (otp !== user.otp.value) {
      res.json({
        success: false,
        error: "Incorrect OTP.",
      });
      return;
    }

    // Everything Correct
    user.otp.value = "";
    user.otp.expiry = new Date(0);
    user.verified = true;

    user.save();

    res.json({
      success: true,
      message: "OTP Verification Successful.",
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      error: "Internal Server Error.",
    });
  }
}

export { newOtp, verifyOtp };
