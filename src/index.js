import express from 'express';
import dotenv from 'dotenv';
const dot = dotenv.config();
// Import routes
import indexRoute from './routes/index.route.js';
import employeesRoutes from './routes/users.route.js';
//Definiendo variables
const app = express();
const port = process.env.PORT || 3001;
//Middlewares
app.use( express.json() ); //Leer datos de entrada
//Rutas
app.use( '/app', indexRoute );
app.use( '/users', employeesRoutes );

app.listen(port, () => {
    console.log(`---------- Server running on port ${port} -------------`);
});
