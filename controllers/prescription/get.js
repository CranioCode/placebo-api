import Prescription from "../../models/prescription.js";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function getPrescriptionById(req, res) {
  try {
    const { id } = req.params;

    const prescription = await Prescription.findById(id);

    if (!prescription) {
      return res.json({
        success: false,
        error: "Prescription not found.",
      });
    }

    res.json({
      success: true,
      message: prescription,
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
async function getPrescriptionByUser(req, res) {
  try {
    const { id } = req.params;

    const prescriptions = await Prescription.find({
      patient: id,
    });

    res.json({
      success: true,
      message: prescriptions,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      error: "Internal Server Error.",
    });
  }
}

export { getPrescriptionById, getPrescriptionByUser };
