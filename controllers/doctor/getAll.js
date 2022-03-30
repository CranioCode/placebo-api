import Doctor from "../../models/doctor.js";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */

async function getAllDoctors(req, res) {
  try {
    const doctors = await Doctor.find();

    res.json({
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

export { getAllDoctors };
