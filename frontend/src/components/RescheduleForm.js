import React, { useState } from 'react';
import apiService from '../services/apiService';

const RescheduleForm = () => {
    const [appointmentId, setAppointmentId] = useState('');
    const [newDateTime, setNewDateTime] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await apiService.rescheduleAppointment(appointmentId, newDateTime);
        alert(response.message);
    };

    return (
        <div>
            <h2>Reschedule Appointment</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Appointment ID:</label>
                    <input
                        type="text"
                        value={appointmentId}
                        onChange={(e) => setAppointmentId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>New Date & Time:</label>
                    <input
                        type="datetime-local"
                        value={newDateTime}
                        onChange={(e) => setNewDateTime(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Reschedule</button>
            </form>
        </div>
    );
};

export default RescheduleForm;
