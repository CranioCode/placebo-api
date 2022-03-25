import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  patient: mongoose.Schema.Types.ObjectId,
  doctor: mongoose.Schema.Types.ObjectId,
  imageUrl: String,
  ailment: [String],
  remarks: [String],
});

const Prescription = mongoose.Model("prescription", prescriptionSchema);

export default Prescription;
