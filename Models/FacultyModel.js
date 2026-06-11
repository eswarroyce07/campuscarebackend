const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema(
  {
    name:          { type: String, required: true, trim: true },
    email:         { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone:         { type: String, trim: true },
    department:    { type: String, required: true, trim: true },
    designation:   { type: String, trim: true },
    qualification: { type: String, trim: true },
    employeeId:    { type: String, unique: true, sparse: true, trim: true },
    status:        { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Faculty', facultySchema);
