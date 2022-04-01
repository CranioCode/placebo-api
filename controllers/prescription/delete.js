import Prescription from "../../models/prescription.js";
import User from "../../models/user.js";

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function deletePrescription(req, res) {
  try {
    const { id } = req.params;

    const prescription = await Prescription.findById(id);

    if (!prescription) {
      return res.json({
        success: false,
        error: "Prescription not found",
      });
    }

    if (prescription.doctor !== req.user.user._id) {
      return res.json({
        success: false,
        error: "Unauthorized access.",
      });
    }

    const user = await User.findById(prescription.patient);
    user.medicalHistory = user.medicalHistory.filter(
      (history) => history !== prescription._id
    );
    await user.save();

    await Prescription.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Prescription deleted successfully.",
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      error: "Internal Server Error",
    });
  }
}

export { deletePrescription };
