import React from 'react';
import apiService from '../services/apiService';

const MissedNotificationButton = () => {
    const handleNotify = async () => {
        const response = await apiService.notifyMissedAppointments();
        alert(response.message);
    };

    return (
        <button onClick={handleNotify} style={{ padding: '10px', backgroundColor: '#0073e6', color: 'white' }}>
            Notify Missed Appointments
        </button>
    );
};

export default MissedNotificationButton;
