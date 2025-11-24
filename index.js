const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5002;
require('dotenv').config();

app.use(cors());
app.use(express.json());

const connectDB = require('./config/connection.js');
connectDB();

// API routes
const transactionRoutes = require('./routes/transactionRoutes');
app.use('/transactions', transactionRoutes);

const settingsRoutes = require('./routes/settingsRoutes');
app.use('/settings', settingsRoutes);

const categoriesRoutes = require('./routes/categoriesRoutes');
app.use('/categories', categoriesRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Finance Tracker Backend API' });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

