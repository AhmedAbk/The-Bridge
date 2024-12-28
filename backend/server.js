const express = require('express');
const cors = require('cors');
const connectDB = require('./dbConfig/db');
const courseRoutes = require('./Routes/coursesRoute');

const app = express();
 
app.use(cors());
app.use(express.json());

//connexion
connectDB();
 
// Routes
app.use('/api/courses', courseRoutes);
 

const PORT = 5000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
