const express = require('express');
const mongoose = require('mongoose');
const appointmentRoutes = require('./routes/appointmentRoutes');
const dbConfig = require('./config/db');
const cors=require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use(cors());

// Database Connection
dbConfig();

app.use('/api/appointments', appointmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
