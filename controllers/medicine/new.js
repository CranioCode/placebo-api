import Medicine from "../../models/medicine.js";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function newMedicine(req, res) {
  try {
    const { name, dosage, description, usage, sideEffects } = req.body;

    const medicineExists = await Medicine.findOne({
      name,
    });

    if (medicineExists) {
      return res.json({
        success: false,
        error: "Medicine with name already exists.",
      });
    }

    const medicine = new Medicine({
      name,
      dosageLimit: dosage,
      usage,
      description,
      sideEffects,
    });

    await medicine.save();

    res.json({
      success: true,
      message: "Medicine created successfully.",
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      error: "Internal Server Error.",
    });
  }
}

export { newMedicine };
