import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  dateOfBirth: Date,
  gender: String,
  bloodType: String,
  allergies: [String],
  emergencyContact: {
    name: String,
    relationship: String,
    phone: String
  },
  vitals: [{
    type: {
      type: String,
      enum: ['heart_rate', 'blood_pressure', 'temperature', 'weight']
    },
    value: mongoose.Schema.Types.Mixed,
    unit: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  medications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medication'
  }]
});

export const patient = mongoose.model('Patient',patientSchema);