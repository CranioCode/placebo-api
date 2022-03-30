import Doctor from "../../models/doctor.js";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function getDoctorByName(req, res) {
  try {
    const { name } = req.query;

    const doctors = await Doctor.find({
      name,
    });

    return res.json({
      success: true,
      message: doctors,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      error: "Internal Server Error.",
    });
  }
}

export { getDoctorByName };
