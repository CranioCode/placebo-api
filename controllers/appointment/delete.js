import Appointment from "../../models/appointment.js";

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
