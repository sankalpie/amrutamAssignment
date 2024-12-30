const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patientName: { type: String, required: true },
    patientEmail: { type: String, required: true }, 
    doctorId: { type: String, required: true },
    dateTime: { type: Date, required: true },
    status: { type: String, enum: ['Scheduled', 'Missed', 'Rescheduled'], default: 'Scheduled' },
    notificationSent: { type: Boolean, default: false },
});

module.exports = mongoose.model('Appointment', appointmentSchema);
