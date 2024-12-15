const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const fitnessLogRoutes = require('./routes/fitnessLogRoutes');
const recommendationRoutes = require("./routes/recommendationRoutes");
dotenv.config();
const app = express();
const cors = require('cors');

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/fitnesslogs',fitnessLogRoutes);
app.use("/api/recommendations", recommendationRoutes);

// Define port
const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start server
const startServer = async () => {
    try {
        await connectDB();
        
        let currentPort = PORT;
        const server = app.listen(PORT, () => {
            console.log(`Server running on port ${currentPort}`);
        });

        server.on('error', (e) => {
            if (e.code === 'EADDRINUSE') {
                currentPort = PORT + 1;
                console.log(`Port ${PORT} is busy, trying port ${currentPort}...`);
                setTimeout(() => {
                    server.close();
                    server.listen(currentPort);
                }, 1000);
            }
        });

        server.on('listening', () => {
            console.log(`Server is now actively listening on port ${currentPort}`);
            console.log(`API available at http://localhost:${currentPort}/api/users`);
        });

    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
