import express from 'express';
import { config } from 'dotenv'
import { connectDB, disconnectDB } from './config/db.js';
import movieRoutes from './Routes/movieRoutes.js'
const PORT = 5001;

config();
connectDB();

const app = express();
app.use('/movies',movieRoutes)



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