require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./src/routes/auth');
const taskRoutes = require('./src/routes/task');
const userRoutes = require('./src/routes/user');
const config = require('./src/config');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5002;

mongoose.connect(config.mongodbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error('MongoDB connection error:', err));
