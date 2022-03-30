import Disease from "../../models/disease.js";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function getDiseaseBySymptom(req, res) {
  const { symptom } = req.query;

  try {
    const diseases = await Disease.find({
      symptoms: symptom,
    }).sort({
      severityIndex: 1,
    });

    return res.json({
      success: true,
      message: diseases,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      error: "Internal Server Error.",
    });
  }
}

export { getDiseaseBySymptom };
