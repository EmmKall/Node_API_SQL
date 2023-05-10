import express from 'express';
import dotenv from 'dotenv';
const dot = dotenv.config();
// Import routes
import indexRoute from './routes/index.route.js';
import employeesRoutes from './routes/empoyees.route.js';
//Definiendo variables
const app = express();
const port = process.env.PORT || 3001;
//Middlewares
//Rutas
app.use( '/app', indexRoute );
app.use( '/employees', employeesRoutes );

app.listen(port, () => {
    console.log(`---------- Server running on port ${port}`);
});