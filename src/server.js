import { config } from 'dotenv'
import express from 'express';
import { connectDB, disconnectDB } from './config/db.js';
//Routes
import movieRoutes from './Routes/movieRoutes.js'
import authRoutes from './Routes/authRoutes.js'

config();
const app = express();
const PORT = 5001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/movies',movieRoutes);
app.use('/auth', authRoutes);



app.listen(PORT, async ()=>{
    await connectDB();
    console.log(`Server running on port ${PORT}`);
})

//Handle unhandled promise  rejections (e.g., database connection errors)
process.on("unhandledRejection", (err)=>{
    console.error('Unhandled Rejection:', err);
    server.close(async ()=>{
        await disconnectDB();
        process.exit(1);
    });
})

//Handle uncaught exceptions
process.on("uncaughtException", async (err)=>{
    console.error('Uncaught Exception:', err);
    server.close(async ()=>{
        await disconnectDB();
        process.exit(1);
    });
})

//Graceful shutdown
process.on("SIGTERM", async ()=>{
    console.error('SIGTERM received, shutting down gracefully :', err);
    server.close(async ()=>{
        await disconnectDB();
        process.exit(1);
    });
})