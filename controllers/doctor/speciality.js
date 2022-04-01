import Doctor from "../../models/doctor.js";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function getSpeciality(req, res) {
  try {
    const doctors = await Doctor.find({
      specializations: req.query.name,
    });

    return res.json({
      success: true,
      message: doctors,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: true,
      error: "Internal Server Error.",
    });
  }
}

export { getSpeciality };
