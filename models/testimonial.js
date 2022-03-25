import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
  body: String,
  author: mongoose.Schema.Types.ObjectId,
  doctor: mongoose.Schema.Types.ObjectId,
  date: Number,
});

const Testimonial = mongoose.model("testimonial", testimonialSchema);

export default Testimonial;
