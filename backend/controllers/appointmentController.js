const Appointment = require('../models/appointmentModel');
const { sendNotification } = require('../utils/notificationService');
const { resolveConflicts } = require('../utils/conflictResolver');
const nodemailer = require('nodemailer');

exports.detectMissedAppointments = async (req, res) => {
    try {
        const now = new Date();
        const missedAppointments = await Appointment.find({
            dateTime: { $lt: new Date(now - 15 * 60000) },
            status: 'Scheduled',
        });

        for (const appt of missedAppointments) {
            appt.status = 'Missed';
            await appt.save();
        }

        res.status(200).json({ message: 'Missed appointments updated.', missedAppointments });
    } catch (error) {
        res.status(500).json({ message: 'Error detecting missed appointments.', error });
    }
};

exports.notifyMissedAppointments = async (req, res) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        
        const now = new Date();
        // console.log(now);
        const missedAppointments = await Appointment.find({
            dateTime: { $lt: new Date(now - 15 * 60000) },
            status: 'Missed',
            notificationSent: false,
        });
        console.log(missedAppointments);
        for (const appt of missedAppointments) {
            console.log(appt);
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: appt.patientEmail,
                subject: 'Missed Appointment Notification',
                text: `Dear ${appt.patientName}, you missed your appointment scheduled on ${appt.dateTime}. Please reschedule.`,
            };

            await transporter.sendMail(mailOptions);
            appt.notificationSent = true;
            await appt.save();
        }

        res.status(200).json({ message: 'Notifications sent.', missedAppointments });
    } catch (error) {
        console.error("Error occurred:", error.message);
        console.error(error.stack);
        res.status(500).json({ message: 'Error sending notifications.', error });
    }
};

exports.rescheduleAppointment = async (req, res) => {
    const { appointmentId, newDateTime } = req.body;
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

    const isConflict = await resolveConflicts(appointment.doctorId, newDateTime);
    if (isConflict) return res.status(400).json({ message: 'Time slot unavailable' });

    appointment.dateTime = newDateTime;
    appointment.status = 'Rescheduled';
    await appointment.save();
    sendNotification(appointment, 'Your appointment has been rescheduled.');

    res.status(200).json({ message: 'Appointment rescheduled successfully' });
};

exports.getAvailableSlots = async (req, res) => {
    const { doctorId } = req.params;
    const now = new Date();
    const appointments = await Appointment.find({ doctorId, dateTime: { $gte: now } });

    const bookedSlots = appointments.map((appt) => appt.dateTime);
    const availableSlots = generateSlots(now).filter((slot) => !bookedSlots.includes(slot));

    res.status(200).json({ availableSlots });
};
