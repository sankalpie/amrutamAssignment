import React from 'react';
import AppointmentList from './components/AppointmentList';
import RescheduleForm from './components/RescheduleForm';
import MissedNotificationButton from './components/MissedNotificationButton';

const App = () => (
    <div>
        <h1>Appointment Management</h1>
        <AppointmentList />
        <MissedNotificationButton />
        <RescheduleForm />
    </div>
);

export default App;
