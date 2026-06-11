const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstName:  { type: String, required: true, trim: true },
  lastName:   { type: String, required: true, trim: true },
  email:      { type: String, required: true, trim: true },
  phone:      { type: String, trim: true },
  department: { type: String, required: true },
  message:    { type: String, required: true },
  status:     { type: String, enum: ['Pending', 'Resolved'], default: 'Pending' },
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
