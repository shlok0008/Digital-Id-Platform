require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Route imports
const bioDataRoutes = require('./routes/bioData');
const buyerCardRoutes = require('./routes/buyerCard');
const professionalRoutes = require('./routes/professional');
const studentRoutes = require('./routes/student');
const sellerRoutes = require('./routes/seller');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api/biodata', bioDataRoutes);
app.use('/api/buyercards', buyerCardRoutes);
app.use('/api/professionals', professionalRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/sellers', sellerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));