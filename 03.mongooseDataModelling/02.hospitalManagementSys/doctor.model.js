import mongoose from " mongoose ";
const hospitalHoursSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});
const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },

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
  salary: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
});
export const Doctor = mongoose.model("Doctor", doctorSchema);
