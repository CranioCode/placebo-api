import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  dob: Number,
  rating: {
    total: Number,
    users: Number,
  },
  patients: [mongoose.Schema.Types.ObjectId],
  charge: Number, // Base Charge Per Appointment
  specializations: [String],
  qualifications: [String],
  registrationNumber: String,
  dateOfRegistration: Number,
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
  address: String,
  phoneNumber: Number,
  verified: {
    type: Boolean,
    default: false,
  },
  otp: {
    value: String,
    expiry: Number,
  },

  role: {String},
});

const Doctor = mongoose.model("doctor", doctorSchema);

export default Doctor;
