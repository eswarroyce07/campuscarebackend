const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({
  fullName:    { type: String, required: true, trim: true },
  email:       { type: String, required: true, trim: true, lowercase: true },
  phone:       { type: String, required: true, trim: true },
  dob:         { type: String, trim: true },
  gender:      { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  program:     { type: String, required: true, trim: true },
  department:  { type: String, required: true, trim: true },
  tenthMarks:  { type: String, trim: true },
  twelfthMarks:{ type: String, trim: true },
  address:     { type: String, trim: true },
  status:      { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
}, { timestamps: true });

module.exports = mongoose.model('Admission', admissionSchema);
