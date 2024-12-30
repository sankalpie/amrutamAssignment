const Appointment = require('../models/appointmentModel');

exports.resolveConflicts = async (doctorId, dateTime) => {
    const conflict = await Appointment.findOne({ doctorId, dateTime });
    return conflict ? true : false;
};
