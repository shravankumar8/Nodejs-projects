import mongoose from " mongoose ";

// Connect to MongoDB

// Define MedicalRecord schema
const medicalRecordSchema = new mongoose.Schema({
  patientName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  diagnosis: {
    type: String,
    required: true,
  },
  medications: [
    {
      name: String,
      dosage: String,
      frequency: String,
    },
  ],
  treatments: [
    {
      name: String,
      date: Date,
      description: String,
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Create MedicalRecord model
export const MedicalRecord = mongoose.model(
  "MedicalRecord",
  medicalRecordSchema
);

// Export the model for use in other files
