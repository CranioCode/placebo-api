import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dosageLimit: {
    type: {
      number: Number,
      time: Number,
    },
  },
  usage: String, // Medicine Used For
  sideEffects: [String],
});

const Medicine = mongoose.model("medicine", medicineSchema);

export default Medicine;
