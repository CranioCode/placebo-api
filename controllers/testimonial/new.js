import Testimonial from "../../models/testimonial.js";
import Doctor from "../../models/doctor.js";
import User from "../../models/user.js";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function newTestimonial(req, res) {
  try {
    const { body } = req.body;
    const { doctorId } = req.params;

    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.json({
        success: false,
        error: "Doctor doesn't exist.",
      });
    }

    const user = await User.findById(req.user._id);

    const testimonialExists = await Testimonial.findOne({
      author: req.user._id,
      doctor: doctorId,
    });

    if (testimonialExists) {
      return res.json({
        success: false,
        error: "Testimonial already exists",
      });
    }

    const testimonial = new Testimonial({
      body,
      author: req.user._id,
      doctor: doctorId,
      date: new Date().getTime(),
    });

    const savedTesimonial = await testimonial.save();

    doctor.testimonials.push(savedTesimonial._id);
    await doctor.save();

    user.testimonials.push(savedTesimonial._id);
    await user.save();

    return res.json({
      success: true,
      message: testimonial,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      error: "Internal Server Error.",
    });
  }
}

export { newTestimonial };
