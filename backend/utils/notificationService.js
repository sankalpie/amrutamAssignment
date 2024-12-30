const nodemailer = require('nodemailer');

exports.sendNotification = async (appointment, message) => {
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
        text: message,
    };

    await transporter.sendMail(mailOptions);
};
