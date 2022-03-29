import { sendMail } from "./mailer.js";
import { newHashString } from "./string.js";

/**
 *  Generates OTP and Expiry Date and sends mail.
 *
 * @param {import("express").Request} req
 * @returns {
 *  value: string,
 *  expiry: number,
 * }
 */
function generateOtp(req) {
  let otp = newHashString();
  let expiryDuration = 5 * 60 * 1000; // 5 mins in milliseconds

  sendOtpMail(req, otp, expiryDuration);

  return {
    value: otp,
    expiry: expiryDuration + new Date().getTime(),
  };
}

/**
 * Sends OTP mail.
 *
 * @param {import("express").Request} req
 * @param {string} otp
 * @param {number} expiryDuration
 */
async function sendOtpMail(req, otp, expiryDuration) {
  try {
    const { name, email } = req.body;

    const subject = `Please Verify Your Otp | Placebo`;

    const html = `
      <p>
        <h3>Dear ${name},</h3>
      Thank you for joining Placebo.
      To verify your account, please verify your OTP.
      </p>
      <p>OTP : <b>${otp}</b></p>
      <p>Duration: ${expiryDuration / (60 * 1000)} min</p>
    `;

    await sendMail({ email, subject, html });
  } catch (err) {
    console.log(err);
  }
}

export { generateOtp, sendOtpMail };
