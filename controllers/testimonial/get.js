import Testimonial from "../../models/testimonial.js";

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function getTestimonial(req, res) {
  try {
    const { id } = req.params;

    const testimonial = Testimonial.findById(id);

    return res.json({
      success: true,
      message: testimonial,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      error: "Internal Server Error",
    });
  }
}

export { getTestimonial };
