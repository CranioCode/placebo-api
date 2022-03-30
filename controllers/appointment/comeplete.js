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

    if (req.user._id !== appointment.doctor) {
      return res.json({
        success: false,
        error: "Unauthorized access.",
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
