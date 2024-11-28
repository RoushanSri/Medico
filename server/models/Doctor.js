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
      isBooked: Boolean,
      patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
      }
    }]
  }]
});

export default mongoose.model('Doctor', doctorSchema);