import React from 'react';
import apiService from '../services/apiService';

const MissedNotificationButton = () => {
    const handleNotify = async () => {
        const response = await apiService.notifyMissedAppointments();
        alert(response.message);
    };

    return (
        <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        <button onClick={handleNotify} style={{ padding: '10px', backgroundColor: '#0073e6', color: 'white', marginBottom:'20px'}}>
            Notify Missed Appointments
        </button>
        </div>
    );
};

export default MissedNotificationButton;
