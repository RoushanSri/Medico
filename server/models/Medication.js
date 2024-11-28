import mongoose from 'mongoose';

const medicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dosage: {
    type: String,
    required: true
  },
  frequency: {
    type: String,
    required: true
  },
  time: String,
  prescribedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor'
  },
  prescribedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient'
  },
  startDate: Date,
  endDate: Date,
  instructions: String,
  active: {
    type: Boolean,
    default: true
  }
});

export default mongoose.model('Medication', medicationSchema);