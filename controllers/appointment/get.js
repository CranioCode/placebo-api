import Appointment from "../../models/appointment.js";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function getAppointmentById(req, res) {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.json({
        success: false,
        error: "Appointment not found.",
      });
    }

    res.json({
      success: true,
      message: appointment,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      error: "Internal Server Error.",
    });
  }
}

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function getAppointmentsByDoctor(req, res) {
  try {
    const { id } = req.params;

    const appointments = await Appointment.find({
      doctor: id,
      verified: 1,
      completed: false,
      end: {
        $gt: new Date().getTime(),
      },
    });

    res.json({
      success: true,
      message: appointments,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      error: "Internal Server Error.",
    });
  }
}

export { getAppointmentById, getAppointmentsByDoctor };
