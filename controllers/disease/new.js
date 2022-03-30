import Disease from "../../models/disease.js";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function addNewDisease(req, res) {
  try {
    const { name, symptoms, severityIndex, description, solutions, warning } =
      req.body;

    const disease = new Disease({
      name,
      symptoms,
      severityIndex,
      description,
      solutions,
      warning,
    });

    await disease.save();

    res.json({
      success: true,
      message: disease,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      error: "Internal Server Error.",
    });
  }
}

export { addNewDisease };
