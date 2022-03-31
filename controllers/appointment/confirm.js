import Appointment from "../../models/appointment.js";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function confirmAppointment(req, res) {
  try {
    const { id } = req.params;
    const { confirmationStatus } = req.body;
    // confirmationStatus == 1, -1 (1 for OK, -1 for ignore)

    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.json({
        success: false,
        error: "Appointment not found.",
      });
    }

    if (!req.user._id.equals(appointment.doctor)) {
      return res.json({
        success: false,
        error: "Unauthorized access.",
      });
    }

    if (!appointment) {
      return res.json({
        success: false,
        error: "Appointment Not Found.",
      });
    }

    appointment.verified = confirmationStatus;
    await appointment.save();

    res.json({
      success: true,
      message: "Appointment Status updated.",
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      error: "Internal Server Error.",
    });
  }
}

export { confirmAppointment };
