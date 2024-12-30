import React from 'react';
import AppointmentList from './components/AppointmentList';
import RescheduleForm from './components/RescheduleForm';
import MissedNotificationButton from './components/MissedNotificationButton';

const App = () => (
    <div>
        <h1 style={{textAlign:'center'}}>Appointment Management Amrutam</h1>
        <AppointmentList />
        <MissedNotificationButton />
        <RescheduleForm />
    </div>
);

export default App;
