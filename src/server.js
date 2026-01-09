import express from 'express';
import { config } from 'dotenv'
import { connect, deconnect } from './config/db.js';
import movieRoutes from './Routes/movieRoutes.js'
const PORT = 5001;

config();
connect();
const app = express();
app.use('/movies',movieRoutes)



app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})