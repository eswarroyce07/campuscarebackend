const Admission = require('../Models/AdmissionModel');

// POST /api/admissions — public
const submitAdmission = async (req, res) => {
  try {
    const { fullName, email, phone, gender, program, department } = req.body;
    if (!fullName || !email || !phone || !gender || !program || !department)
      return res.status(400).json({ message: 'All required fields must be filled.' });

    const admission = await Admission.create(req.body);
    res.status(201).json({ message: 'Application submitted successfully! We will contact you soon.', id: admission._id });
  } catch (err) {
    console.error('Admission submit error:', err);
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

// GET /api/admissions — admin
const getAdmissions = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.department) filter.department = req.query.department;
    const admissions = await Admission.find(filter).sort({ createdAt: -1 });
    res.json(admissions);
  } catch (err) {
    console.error('Get admissions error:', err);
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

// PUT /api/admissions/:id/status — admin
const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Pending', 'Approved', 'Rejected'].includes(status))
      return res.status(400).json({ message: 'Invalid status.' });

    const admission = await Admission.findByIdAndUpdate(
      req.params.id, { status }, { new: true }
    );
    if (!admission) return res.status(404).json({ message: 'Application not found.' });
    res.json(admission);
  } catch (err) {
    console.error('Update admission status error:', err);
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

// DELETE /api/admissions/:id — admin
const deleteAdmission = async (req, res) => {
  try {
    const admission = await Admission.findByIdAndDelete(req.params.id);
    if (!admission) return res.status(404).json({ message: 'Application not found.' });
    res.json({ message: 'Application deleted.' });
  } catch (err) {
    console.error('Delete admission error:', err);
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

module.exports = { submitAdmission, getAdmissions, updateStatus, deleteAdmission };
