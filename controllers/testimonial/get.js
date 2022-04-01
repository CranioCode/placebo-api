import Testimonial from "../../models/testimonial.js";

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function getTestimonial(req, res) {
  try {
    const { id } = req.params;

    const testimonial = await Testimonial.findById(id);

    if (!testimonial) {
      return res.json({
        success: false,
        error: "Testimonial doesn't exist4",
      });
    }

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
