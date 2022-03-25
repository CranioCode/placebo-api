import { newHashString } from "./string";

function generateOtp() {
  let otp = newHashString();
  let expiryDuration = 5 * 60 * 1000; // 5 mins in milliseconds
  let expiryDate = new Date().getTime() + expiryDuration;
  this.otp.value = otp;
  this.otp.expiry = expiryDate;
}

export { generateOtp };
