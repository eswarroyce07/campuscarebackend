const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema(
  {
    title:          { type: String, required: true, trim: true },
    content:        { type: String, required: true, trim: true },
    category:       { type: String, enum: ['General', 'Academic', 'Exam', 'Event', 'Holiday', 'Urgent'], default: 'General' },
    targetAudience: { type: String, enum: ['All', 'Students', 'Faculty'], default: 'All' },
    isActive:       { type: Boolean, default: true },
    postedBy:       { type: String, default: 'Admin' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Notice', noticeSchema);
