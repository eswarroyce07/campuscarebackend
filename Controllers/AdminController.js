const Admission = require('../Models/AdmissionModel');
const jwt = require('jsonwebtoken');
const Student = require('../Models/StudentModel');
const Faculty = require('../Models/FacultyModel');
const Notice  = require('../Models/NoticeModel');
const Contact = require('../Models/ContactModel');

// POST /api/admin/login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'Email and password are required.' });

    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD)
      return res.status(401).json({ message: 'Invalid admin credentials.' });

    const token = jwt.sign(
      { email, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );
    res.json({ token, admin: { email, role: 'admin', name: 'Administrator' } });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

// GET /api/admin/dashboard
const getDashboard = async (req, res) => {
  try {
    const [totalStudents, totalFaculty, totalNotices, pendingContacts, pendingAdmissions] = await Promise.all([
      Student.countDocuments(),
      Faculty.countDocuments(),
      Notice.countDocuments({ isActive: true }),
      Contact.countDocuments({ status: 'Pending' }),
      Admission.countDocuments({ status: 'Pending' }),
    ]);

    const departments = await Student.distinct('department');

    const [recentStudents, recentNotices, recentContacts, recentAdmissions] = await Promise.all([
      Student.find().sort({ createdAt: -1 }).limit(3).select('name department createdAt'),
      Notice.find().sort({ createdAt: -1 }).limit(3).select('title category createdAt'),
      Contact.find({ status: 'Pending' }).sort({ createdAt: -1 }).limit(2).select('firstName lastName email createdAt'),
      Admission.find({ status: 'Pending' }).sort({ createdAt: -1 }).limit(2).select('fullName program createdAt'),
    ]);

    const recentActivities = [
      ...recentStudents.map((s) => ({
        type: 'student',
        icon: '🎓',
        label: `New student added: ${s.name}`,
        sub: s.department,
        time: s.createdAt,
      })),
      ...recentNotices.map((n) => ({
        type: 'notice',
        icon: '📢',
        label: `Notice posted: ${n.title}`,
        sub: n.category,
        time: n.createdAt,
      })),
      ...recentContacts.map((c) => ({
        type: 'contact',
        icon: '📬',
        label: `New query from: ${c.firstName} ${c.lastName}`,
        sub: c.email,
        time: c.createdAt,
      })),
      ...recentAdmissions.map((a) => ({
        type: 'admission',
        icon: '📝',
        label: `New admission: ${a.fullName}`,
        sub: a.program,
        time: a.createdAt,
      })),
    ]
      .sort((a, b) => new Date(b.time) - new Date(a.time))
      .slice(0, 6);

    res.json({
      totalStudents,
      totalFaculty,
      totalDepartments: departments.length,
      totalNotices,
      pendingContacts,
      pendingAdmissions,
      recentActivities,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

module.exports = { adminLogin, getDashboard };
