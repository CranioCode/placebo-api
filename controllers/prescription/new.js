import Prescription from "../../models/prescription.js";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function newPrescription(req, res) {
  try {
    const { patient, ailment, remarks } = req.body;

    const prescription = new Prescription({
      patient,
      doctor: req.user._id,
      ailment,
      remarks,
    });

    await prescription.save();

    res.json({
      success: true,
      message: "Prescription created succesfully.",
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      error: "Internal Server Error",
    });
  }
}

export { newPrescription };
