import React, { useEffect, useState } from 'react';
import apiService from '../services/apiService';

const AppointmentList = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            const data = await apiService.getAppointments();
            setAppointments(data);
        };
        fetchAppointments();
    }, []);

    return (
        <div>
            <h2>Appointments</h2>
            <ul>
                {appointments.map((appt) => (
                    <li key={appt._id}>
                        {appt.patientName} - {new Date(appt.dateTime).toLocaleString()} - {appt.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AppointmentList;
