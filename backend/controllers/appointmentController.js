const Appointment = require('../models/appointmentModel');
const nodemailer = require('nodemailer');

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

    const isConflict= await Appointment.findOne({doctorId:appointment.doctorId,dateTime:newDateTime}); //// finds if there is already a booking for the users current doctor at the time that the user has newly selected
    (isConflict)?(isConflict=true):(isConflict=false);
    if (isConflict) return res.status(400).json({ message: 'Time slot unavailable' });

    appointment.dateTime = newDateTime;
    appointment.status = 'Rescheduled';
    await appointment.save();

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: appointment.patientEmail,
        subject: 'Appointment Notification',
        text: "Your appointment has been rescheduled.",
    };
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Appointment rescheduled successfully' });
};