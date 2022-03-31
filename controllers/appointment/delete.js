import Appointment from "../../models/appointment.js";
import User from "../../models/user.js";
import Doctor from "../../models/doctor.js";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function deleteAppointmentById(req, res) {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.json({
        success: false,
        error: "Appointment Not Found",
      });
    }

    if (
      req.user._id !== appointment.doctor &&
      req.user._id !== appointment.patient
    ) {
      return res.json({
        success: false,
        error: "Unauthorized access.",
      });
    }

    const user = await User.findById(appointment.patient);
    const doctor = await Doctor.findById(appointment.doctor);

    user.appointments = user.appointments.filter(
      (appointment) => appointment !== id
    );
    await user.save();

    doctor.appointments = doctor.appointments.filter(
      (appointment) => appointment !== id
    );
    doctor.patients = doctor.patients.filter((patient) => patient !== user._id);
    await doctor.save();

    await Appointment.findByIdAndDelete(id);
    res.json({
      success: true,
      message: "Appointment Deleted Successfully.",
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      error: "Internal Server Error.",
    });
  }
}

export { deleteAppointmentById };
