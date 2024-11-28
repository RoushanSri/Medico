import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  type: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  values: [{
    name: String,
    value: mongoose.Schema.Types.Mixed,
    unit: String,
    normalRange: String,
    status: {
      type: String,
      enum: ['normal', 'high', 'low']
    }
  }],
  diagnosis: String,
  notes: String,
  attachments: [{
    name: String,
    url: String,
    type: String
  }]
});

export default mongoose.model('Report', reportSchema);