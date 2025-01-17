const express = require('express');
const {  rescheduleAppointment, notifyMissedAppointments } = require('../controllers/appointmentController');
const router = express.Router();

// Route to fetch all appointments
router.get('/', async (req, res) => {
    const Appointment = require('../models/appointmentModel');
    try {
        const appointments = await Appointment.find();
        res.status(200).json(appointments);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching appointments', error: err });
    }
});

router.post('/reschedule', rescheduleAppointment);

// Send notifications for missed appointments
router.post('/notify-missed', notifyMissedAppointments);

module.exports = router;
