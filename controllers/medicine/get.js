import Medicine from "../../models/medicine.js";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function getMedicineById(req, res) {
  try {
    const { id } = req.params;

    const medicine = await Medicine.findById(id);

    if (!medicine) {
      return res.json({
        success: false,
        error: "Invalid Medicine ID",
      });
    }

    res.json({
      success: true,
      message: medicine,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      error: "Internal Server Error",
    });
  }
}

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */

async function getMedicineByName(req, res) {
  try {
    const { name } = req.query;

    const medicine = await Medicine.findOne({
      name,
    });

    if (!medicine) {
      return res.json({
        success: false,
        error: "Medicine not found",
      });
    }

    res.json({
      success: true,
      message: medicine,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      error: "Internal Server Error.",
    });
  }
}

export { getMedicineById, getMedicineByName };
