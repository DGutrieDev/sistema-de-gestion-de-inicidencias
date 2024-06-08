const sequelize = require('../../sequelize_config');
const Diagnostico = require('../models/Diagnosticos');
const Diagnostico_Incidencias = require('../models/Diagnostico_Incidencias');
const Incidencia = require('../models/Incidencias');
const { codDiagnostico } = require('../utils/Codes');

async function crearDiagnostico(req, res) {
    try {
        const { cod_incidencia } = req.params;
        const { usuario, observaciones, estimacion, diagnostico, requiere_compra } = req.body;
        const val = await Diagnostico.count();
        if (!usuario || !observaciones || !estimacion || !diagnostico) {
            return res.status(400).json({ Mensaje: 'Faltan campos requeridos' });
        }
        if (cod_incidencia) {
            const cod_diagnostico = codDiagnostico(cod_incidencia, val + 1);
            const diagnosticoNuevo = await Diagnostico.create({
                CT_cod_diagnostico: cod_diagnostico,
                CT_observaciones: observaciones,
                CT_tiempo_estimado: estimacion,
                CT_diagnostico: diagnostico || null,
                CT_Requiere_compra: requiere_compra || null,
            });
            await Diagnostico_Incidencias.create({
                CT_cod_incidencia: cod_incidencia,
                CT_cod_diagnostico: cod_diagnostico,
                CT_id_usuario: usuario,
                CT_cod_imagen: null,
            });
            res.status(201).json({ Mensaje: "Diagnostico Creado", diagnosticoNuevo });
        } else {
            res.status(400).json({ Mensaje: 'Incidencia no encontrada' });
        }
    } catch (err) {
        res.status(500).json({ Mensaje: 'Error al crear el diagnostico', error: err });
    }
}

async function obtenerDiagnosticosPorIncidencia(req, res) {
    try {
        const { cod_incidencia } = req.params;
        const diagnosticos = await Diagnostico_Incidencias.findAll({
            where: {
                CT_cod_incidencia: cod_incidencia,
            },
            include: {
                model: Diagnostico,
            },
        });
        if (diagnosticos.length === 0) {
            return res.status(404).json({ Mensaje: 'No se encontraron diagnosticos para la incidencia' });
        }
        res.status(200).json(diagnosticos);
    } catch (err) {
        res.status(500).json({ Mensaje: 'Error al obtener los diagnosticos', error: err });
    }
}

module.exports = { crearDiagnostico, obtenerDiagnosticosPorIncidencia};