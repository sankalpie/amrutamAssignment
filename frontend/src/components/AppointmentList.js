import React, { useEffect, useState } from 'react';
import apiService from '../services/apiService';

const AppointmentList = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const data = await apiService.getAppointments();
                setAppointments(data);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        };

        fetchAppointments();
    }, []);

    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>Appointments</h2>
            <div
                style={{
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {appointments.length > 0 ? (
                        appointments.map((appt) => (
                            <li
                                key={appt._id}
                                style={{
                                    marginBottom: '10px',
                                    border: '1px solid #ddd',
                                    padding: '10px',
                                    borderRadius: '5px',
                                    backgroundColor: '#f9f9f9',
                                }}
                            >
                                <div>
                                    <strong>Patient Name:</strong> {appt.patientName}
                                </div>
                                <div>
                                    <strong>Appointment Time:</strong>{' '}
                                    {new Date(appt.dateTime).toLocaleString()}
                                </div>
                                <div>
                                    <strong>Status:</strong>{' '}
                                    <span
                                        style={{
                                            color: appt.status === 'Completed' ? 'green' : 'red',
                                        }}
                                    >
                                        {appt.status}
                                    </span>
                                </div>
                                <div>
                                    <strong>Appointment ID:</strong> {appt._id}
                                </div>
                            </li>
                        ))
                    ) : (
                        <p>No appointments found.</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default AppointmentList;
