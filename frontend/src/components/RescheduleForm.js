import React, { useState } from 'react';
import apiService from '../services/apiService';

const RescheduleForm = () => {
    const [appointmentId, setAppointmentId] = useState('');
    const [newDateTime, setNewDateTime] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await apiService.rescheduleAppointment(appointmentId, newDateTime);
            setSuccess(response.message);
            setAppointmentId('');
            setNewDateTime('');
        } catch (err) {
            setError('Failed to reschedule appointment. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Reschedule Appointment</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label htmlFor="appointmentId" style={styles.label}>
                        Appointment ID:
                    </label>
                    <input
                        type="text"
                        id="appointmentId"
                        value={appointmentId}
                        onChange={(e) => setAppointmentId(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="newDateTime" style={styles.label}>
                        New Date & Time:
                    </label>
                    <input
                        type="datetime-local"
                        id="newDateTime"
                        value={newDateTime}
                        onChange={(e) => setNewDateTime(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <button type="submit" style={styles.button} disabled={loading}>
                    {loading ? 'Rescheduling...' : 'Reschedule'}
                </button>
            </form>
            {error && <p style={styles.error}>{error}</p>}
            {success && <p style={styles.success}>{success}</p>}
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '450px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        // marginRight:'20px'
    },
    heading: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    formGroup: {
        marginBottom: '15px',
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold',
        color: '#555',
    },
    input: {
        width: '100%',
        maxWidth:'430px',
        padding: '10px',
        fontSize: '14px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        outline: 'none',
    },
    button: {
        padding: '10px 15px',
        fontSize: '16px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    buttonHover: {
        backgroundColor: '#0056b3',
    },
    error: {
        marginTop: '10px',
        color: 'red',
        textAlign: 'center',
    },
    success: {
        marginTop: '10px',
        color: 'green',
        textAlign: 'center',
    },
};

export default RescheduleForm;
