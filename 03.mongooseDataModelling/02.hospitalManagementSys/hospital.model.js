import mongoose from " mongoose ";

const hospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },

  address: {
    type: string,
    required: true,
  },
  manager: {
    type: Number,
    required: true,
  },
  noofemployees: {
    type: Number,
    required: true,
  },
  hospitalbranch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
  },
  specializedin: [
    {
      type: String,
    },
  ],
  doctors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
  ],
});
export const Doctor = mongoose.model("Doctor", doctorSchema);
