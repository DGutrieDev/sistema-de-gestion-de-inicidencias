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
const RutasEstados = require('./src/Routes/EstadosRoutes');
const RutasAfectacion = require('./src/Routes/AfectacionRoutes');
const RutasRiesgos = require('./src/Routes/RiesgosRoutes');
const RutasCategoria = require('./src/Routes/CategoriaRoutes');
const RutasPrioridad = require('./src/Routes/PrioridadRoutes');

app.use('/api', loginRoute);
app.use('/api/estados', RutasEstados);
app.use('/api/riesgos', RutasRiesgos);
app.use('/api/usuarios', RutasUsuarios);
app.use('/api/prioridad', RutasPrioridad);
app.use('/api/categorias', RutasCategoria);
app.use('/api/afectacion', RutasAfectacion);
app.use('/api/incidencias', RutasIncidencias);
app.use('/api/diagnostico', RutasDiagnostico);


app.listen(PORT, () => {
    console.log('Server listen PORT ', PORT);
});