const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const Student = require('../models/Student'); // ✅ required to fetch phone number
const sendSMS = require('../utils/sendSMS');  // ✅ custom SMS utility

// ✅ GET attendance by date
router.get('/by-date', async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ message: 'Date is required' });
    }

    const records = await Attendance.find({ date })
      .populate('studentId'); // ✅ match your schema field name

    res.json(records);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch attendance', error: err.message });
  }
});

// ✅ POST mark attendance (supports both student and studentId)
router.post('/mark', async (req, res) => {
  const { date, records } = req.body;
  if (!date || !Array.isArray(records)) {
    return res.status(400).json({ message: 'Invalid payload' });
  }

  try {
    const saved = await Promise.all(
      records.map(async r => {
        const studentRef = r.studentId || r.student;

        const attendance = await Attendance.findOneAndUpdate(
          { studentId: studentRef, date },
          { studentId: studentRef, date, status: r.status },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        // ✅ Send SMS if student is marked Absent
        if (r.status === 'Absent') {
          const student = await Student.findById(studentRef);
          if (student?.phone) {
            await sendSMS(
              student.phone,
              `Dear Parent, ${student.name} (Roll: ${student.rollNumber}) was absent on ${date}.`
            );
          }
        }

        return attendance;
      })
    );

    res.json({ message: 'Attendance marked successfully. SMS sent for absent students.', saved });
  } catch (err) {
    res.status(500).json({ message: 'Error marking attendance', error: err.message });
  }
});

// ✅ Test SMS route
router.get('/test-sms', async (req, res) => {
  try {
    await sendSMS('+91XXXXXXXXXX', 'Test message from attendance system');
    res.json({ message: 'SMS test sent' });
  } catch (err) {
    res.status(500).json({ message: 'SMS test failed', error: err.message });
  }
});

module.exports = router;