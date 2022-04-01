import Appointment from "../../models/appointment.js";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function completedAppointment(req, res) {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findById(id);

    if (!req.user._id.equals(appointment.doctor)) {
      return res.json({
        success: false,
        error: "Unauthorized access.",
      });
    }

    if (appointment.verified === 0) {
      return res.json({
        success: false,
        error: "Please verify the appointment.",
      });
    }

    if (appointment.verified === -1) {
      return res.json({
        success: false,
        error: "Appointment was rejected.",
      });
    }

    if (appointment.completed === true) {
      return res.json({
        success: true,
        error: "Appointment already completed.",
      });
    }

    appointment.completed = true;
    await appointment.save();

    res.json({
      success: true,
      message: "Appointment completed successfully.",
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      error: "Internal Server Error.",
    });
  }
}

export { completedAppointment };
