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
    const { email, name, password, dob, phoneNumber, address } = req.body;

    const { type } = req.params;

    const salt = await bcrypt.genSalt();
    const pfpUrl = `https://avatars.dicebear.com/api/identicon/${name}.svg`;

    if (type === "doctor") {
      const {
        charge,
        specializations,
        qualifications,
        highlights,
        description,
        yearOfStartingCareer,
      } = req.body;

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
        charge,
        specializations,
        qualifications,
        highlights,
        description,
        yearOfStartingCareer,
        phoneNumber,
        profilePic: pfpUrl,
        address,
        otp: generateOtp(req),
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
        phoneNumber,
        address,
        appointments: [],
        testimonials: [],
        otp: generateOtp(req),
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
