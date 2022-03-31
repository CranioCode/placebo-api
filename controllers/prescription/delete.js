import Prescription from "../../models/prescription.js";

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
