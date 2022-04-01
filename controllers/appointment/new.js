import Appointment from "../../models/appointment.js";
import User from "../../models/user.js";
import Doctor from "../../models/doctor.js";
import mongoose from "mongoose";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function newAppointment(req, res) {
  try {
    const { doctor, patient, start, end } = req.body;

    const existingAppointments = await Appointment.find({
      doctor,
    });

    for (let i = 0; i < existingAppointments.length; i++) {
      if (
        existingAppointments[i] &&
        !existingAppointments[i].completed &&
        existingAppointments[i].verified === 1 &&
        ((existingAppointments[i].start >= start &&
          existingAppointments[i].start <= end) ||
          (existingAppointments[i].end >= start &&
            existingAppointments[i].end <= end))
      ) {
        return res.json({
          success: false,
          error: "Time interval is taken.",
        });
      }
    }

    const appointment = new Appointment({
      start,
      end,
      patient,
      doctor,
    });

    const savedAppointment = await appointment.save();

    const user = await User.findById(patient);
    user.appointments.push(mongoose.Types.ObjectId(savedAppointment._id));
    await user.save();

    const doctorFromDB = await Doctor.findById(doctor);
    doctorFromDB.patients.push(mongoose.Types.ObjectId(user._id));
    await doctorFromDB.save();

    res.json({
      success: true,
      message: "Appointment Request Sent Successfully.",
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      error: "Internal Server Error.",
    });
  }
}

export { newAppointment };
