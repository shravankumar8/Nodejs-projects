import mongoose from " mongoose ";
const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  diagnosedwith: { type: String, required: true },
  address: {
    type: string,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ["M", "F", "O"],
    required: true,
  },
  bloodgroup: {
    type: String,
    enum: ["B", "A", "O"],
    required: true,
  },
  hospitalbranch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
  },
});
export const Patient = mongoose.model("Patient", patientSchema);
