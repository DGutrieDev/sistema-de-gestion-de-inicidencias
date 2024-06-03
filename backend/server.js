require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT
const CORS = require("cors");
app.use(CORS());
app.use(express.json());


const verifyToken = require('./src/Auth/authMiddleware');
const loginRoute = require('./src/Controllers/LoginController');
const RutasUsuarios = require('./src/Routes/UsuariosRoutes');
const RutasIncidencias = require('./src/Routes/IncidenciasRoutes');
const RutasDiagnostico = require('./src/Routes/DiagnosticoRoutes');

app.use('/api', loginRoute);
app.use('/api/usuarios', verifyToken, RutasUsuarios);
app.use('/api/incidencias', verifyToken, RutasIncidencias);
app.use('/api/diagnostico', verifyToken, RutasDiagnostico);


app.listen(PORT, () => {
    console.log('Server listen PORT ', PORT);
});