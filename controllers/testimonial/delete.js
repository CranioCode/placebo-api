import Doctor from "../../models/doctor.js";
import Testimonial from "../../models/testimonial.js";
import User from "../../models/user.js";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function deleteTestimonial(req, res) {
  try {
    const { id } = req.body;

    const testimonial = await Testimonial.findById(id);

    if (testimonial.author !== req.user._id) {
      return res.json({
        success: false,
        error: "Unauthorized action.",
      });
    }

    const author = await User.findById(testimonial.author);
    const doctor = await Doctor.findById(testimonial.doctor);

    author.testimonials = author.testimonials.filter((itm) => itm !== id);
    doctor.testimonials = doctor.testimonials.filter((itm) => itm !== id);

    await author.save();
    await doctor.save();
    await Testimonial.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Testimonial deleted successfully.",
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      error: "Internal Server Error.",
    });
  }
}

export { deleteTestimonial };
