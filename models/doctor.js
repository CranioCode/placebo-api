import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: String,
  email: String,
  dob: Number,
  rating: String,
  patients: [mongoose.Schema.Types.ObjectId],
  charge: Number,
  specializations: [String],
  qualifications: [String],
  highlights: [String],
  testimonials: [mongoose.Schema.Types.ObjectId],
  description: String,
  yearOfStartingCareer: Number,
  appointments: [mongoose.Schema.Types.ObjectId],
  availability: {
    type: String,
    enum: ["UNAVAILABLE", "AVAILABLE"],
    default: "AVAILABLE",
  },
  profilePic: String,
  signature: String,
  address: String,
  phoneNumber: Number,
  doctorVerified: Boolean,
  verified: Boolean,
  otp: {
    value: String,
    expiry: Number,
  },
});

const Doctor = mongoose.model("doctor", doctorSchema);

export default Doctor;
