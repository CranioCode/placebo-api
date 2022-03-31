import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  completed: {
    type: Boolean,
    default: false,
  },
  start: Number,
  end: Number,
  doctor: mongoose.Schema.Types.ObjectId,
  patient: mongoose.Schema.Types.ObjectId,
  reason: String,
  verified: {
    type: Number,
    default: 0,
  },
});

const Appointment = mongoose.model("appointment", appointmentSchema);

export default Appointment;
