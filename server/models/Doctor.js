import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  specialization: String,
  license: String,
  patients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient'
  }],
  schedule: [{
    date: Date,
    slots: [{
      time: String,
      isBooked: {
        type: Boolean,
        default: false
      },
      patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
      }
    }]
  }]
});

export const Doctor = mongoose.model('Doctor', doctorSchema);