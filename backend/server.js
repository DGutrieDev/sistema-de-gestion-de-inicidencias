require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT
const CORS = require("cors");
app.use(CORS());
app.use(express.json());


const loginRoute = require('./src/Routes/LoginRoutes');
const verifyToken = require('./src/Auth/authMiddleware');
const RutasUsuarios = require('./src/Routes/UsuariosRoutes');
const RutasIncidencias = require('./src/Routes/IncidenciasRoutes');
const RutasDiagnostico = require('./src/Routes/DiagnosticoRoutes');

app.use('/api', loginRoute);
app.use('/api/usuarios', RutasUsuarios);
app.use('/api/incidencias', RutasIncidencias);
app.use('/api/diagnostico', RutasDiagnostico);


app.listen(PORT, () => {
    console.log('Server listen PORT ', PORT);
});