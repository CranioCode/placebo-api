import mongoose from "mongoose";

const diseaseSchema = new mongoose.Schema({
  name: String,
  symptoms: [String],
  severityIndex: Number,
  description: String,
  solutions: [String],
  warning: String,
});

const Disease = mongoose.model("disease", diseaseSchema);

export default Disease;
