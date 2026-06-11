const Contact = require('../Models/ContactModel');

// POST /api/contact — existing public endpoint, unchanged
const submitContact = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, department, message } = req.body;
    if (!firstName || !lastName || !email || !department || !message)
      return res.status(400).json({ message: 'All required fields must be filled.' });

    await Contact.create({ firstName, lastName, email, phone, department, message });
    res.status(201).json({ message: "Message received! We'll get back to you within 24 hours." });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

// GET /api/contact — admin
const getContacts = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    const contacts = await Contact.find(filter).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

// PUT /api/contact/:id/resolve — admin
const resolveContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: 'Resolved' },
      { new: true }
    );
    if (!contact) return res.status(404).json({ message: 'Query not found.' });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

// DELETE /api/contact/:id — admin
const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Query not found.' });
    res.json({ message: 'Query deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

module.exports = { submitContact, getContacts, resolveContact, deleteContact };
