import express from 'express';
import movieRoutes from './Routes/movieRoutes.js'
const PORT = 5001;

const app = express();
app.use('/movies',movieRoutes)



app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})