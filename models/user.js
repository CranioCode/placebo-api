import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  dob: Number,
  medicalHistory: [mongoose.Schema.Types.ObjectId],
  phoneNumber: Number,
  address: String,
  profilePic: String,
  appointments: [mongoose.Schema.Types.ObjectId],
  testimonials: [mongoose.Schema.Types.ObjectId],
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

const User = mongoose.model("user", userSchema);

export default User;
