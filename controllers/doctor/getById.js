import Doctor from "../../models/doctor.js";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */

async function getDoctorById(req, res) {
  try {
    const id = req?.params?.id;

    const doctor = await Doctor.findById(id);

    if (!doctor) {
      return res.json({
        success: false,
        error: "Doctor not found.",
      });
    }

    return res.json({
      success: true,
      message: doctor,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      error: "Internal Server Error.",
    });
  }
}

export { getDoctorById };
