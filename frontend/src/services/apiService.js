const API_URL = 'https://amrutamassignment-rmfk.onrender.com/api/appointments';

const apiService = {
    // Fetch all appointments
    getAppointments: async () => {
        const response = await fetch(API_URL);
        return response.json();
    },
    // Reschedule an appointment
    rescheduleAppointment: async (appointmentId, newDateTime) => {
        const response = await fetch(`${API_URL}/reschedule`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ appointmentId, newDateTime }),
        });
        return response.json();
    },
    // Notify missed appointments
    notifyMissedAppointments: async () => {
        const response = await fetch(`${API_URL}/notify-missed`, {
            method: 'POST',
        });
        return response.json();
    },
};

export default apiService;