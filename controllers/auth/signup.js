import bcrypt from "bcrypt";
import Doctor from "../../models/doctor.js";
import User from "../../models/user.js";
import { generateOtp } from "../../utils/otp.js";

/**
 * @description Creates a User with `verified: false`
 *
 * @param {import("express").Request} req Request object of the end-point
 * @param {import("express").Response} res Response object of the end-point
 */
async function signUp(req, res) {
  try {
    const { email, name, password, dob } = req.body;

    const { type } = req.params;

    const salt = await bcrypt.genSalt();
    const pfpUrl = `https://avatars.dicebear.com/api/identicon/${name}.svg`;

    if (type === "doctor") {
      const { regNo, dor } = req.body;

      const findDoctor = await Doctor.findOne({
        email,
      });

      if (findDoctor) {
        return res.json({
          success: false,
          error: "Doctor already exists.",
        });
      }

      const newDoctor = new Doctor({
        name,
        email,
        password: await bcrypt.hash(password, salt),
        dob,
        dateOfRegistration: dor,
        registrationNumber: regNo,
        profilePic: pfpUrl,
        otp: generateOtp(req),
        role: "doctor",
      });

      await newDoctor.save();
    } else {
      const findUser = await User.findOne({
        email,
      });

      if (findUser) {
        return res.json({
          success: false,
          error: "User already exists.",
        });
      }

      const newUser = new User({
        name,
        email,
        password: await bcrypt.hash(password, salt),
        dob,
        medicalHistory: [],
        appointments: [],
        testimonials: [],
        otp: generateOtp(req),
        role: "user",
      });

      await newUser.save();
    }

    return res.json({
      success: true,
      message: "Sign Up Successful.",
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      error: "Internal Server Error",
    });
  }
}

export { signUp };
