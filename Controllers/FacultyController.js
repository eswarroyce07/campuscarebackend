const Faculty = require('../Models/FacultyModel');

// GET /api/faculty
const getFaculty = async (req, res) => {
  try {
    const { search, department, status } = req.query;
    const filter = {};
    if (department) filter.department = department;
    if (status)     filter.status = status;
    if (search) {
      filter.$or = [
        { name:       { $regex: search, $options: 'i' } },
        { email:      { $regex: search, $options: 'i' } },
        { employeeId: { $regex: search, $options: 'i' } },
      ];
    }
    const faculty = await Faculty.find(filter).sort({ createdAt: -1 });
    res.json(faculty);
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

// POST /api/faculty
const createFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.create(req.body);
    res.status(201).json(faculty);
  } catch (err) {
    if (err.code === 11000)
      return res.status(400).json({ message: 'Email or Employee ID already exists.' });
    res.status(400).json({ message: err.message });
  }
};

// PUT /api/faculty/:id
const updateFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true,
    });
    if (!faculty) return res.status(404).json({ message: 'Faculty not found.' });
    res.json(faculty);
  } catch (err) {
    if (err.code === 11000)
      return res.status(400).json({ message: 'Email or Employee ID already exists.' });
    res.status(400).json({ message: err.message });
  }
};

// DELETE /api/faculty/:id
const deleteFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndDelete(req.params.id);
    if (!faculty) return res.status(404).json({ message: 'Faculty not found.' });
    res.json({ message: 'Faculty deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

module.exports = { getFaculty, createFaculty, updateFaculty, deleteFaculty };
