import { config } from 'dotenv'
config();

import express from 'express';
import { connectDB, disconnectDB } from './config/db.js';
//Routes
import movieRoutes from './Routes/movieRoutes.js'
import authRoutes from './Routes/authRoutes.js'

const PORT = 5001;

connectDB();

const app = express();
app.use('/movies',movieRoutes);
app.use('/auth', authRoutes);



app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})

//Handle unhandled promise  rejections (e.g., database connection errors)
process.on("unhandledRejection", (err)=>{
    console.erro('Unhandled Rejection:', err);
    server.close(async ()=>{
        await disconnectDB();
        process.exit(1);
    });
})

//Handle uncaught exceptions
process.on("uncaughtException", async (err)=>{
    console.erro('Uncaught Exception:', err);
    server.close(async ()=>{
        await disconnectDB();
        process.exit(1);
    });
})

//Graceful shutdown
process.on("SIGTERM", async ()=>{
    console.erro('SIGTERM received, shutting down gracefully :', err);
    server.close(async ()=>{
        await disconnectDB();
        process.exit(1);
    });
})