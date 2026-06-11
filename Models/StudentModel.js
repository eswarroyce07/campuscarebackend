const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    name:       { type: String, required: true, trim: true },
    email:      { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone:      { type: String, trim: true },
    department: { type: String, required: true, trim: true },
    course:     { type: String, trim: true },
    year:       { type: Number, min: 1, max: 5 },
    rollNumber: { type: String, unique: true, sparse: true, trim: true },
    status:     { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Student', studentSchema);
