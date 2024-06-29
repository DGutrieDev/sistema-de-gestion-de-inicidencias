const { Diagnosticos, DiagnosticosIncidencias, Incidencias, Incidencia_Asignada, UsuariosRoles, Incidencia_imagen, Imagenes } = require('../models/global_models');
const { codDiagnostico } = require('../Services/CodesGenerate_Service');
const sequelize = require('../../sequelize_config');


async function crearDiagnostico(req, res) {
    try {
        const { incidencia } = req.params;
        const { usuario, observaciones, estimacion, requiere_compra, diagnostico } = req.body;
        const n = await Diagnosticos.count() + 1;
        const rol = await UsuariosRoles.findOne({ where: { CT_id_usuario: usuario, CT_cod_Rol: 4 } });
        if (!rol) {
            return res.status(400).json({ message: "El usuario no es un técnico" });
        }
        const diag = await Diagnosticos.create({
            CT_cod_diagnostico: codDiagnostico(incidencia, n),
            CT_observaciones: observaciones,
            CT_tiempo_estimado: estimacion,
            CT_requiere_compra: requiere_compra,
            CT_diagnostico: diagnostico,
        });
        if (diag) {
            registroDiagnostico(incidencia, diag.CT_cod_diagnostico, usuario);
        }
        return res.status(201).json({ message: "Diagnostico creado" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
}

async function mostrarDiagnosticoIncidencia(req, res) {
    try {
        const { cod_incidencia } = req.params;
        const diagnoticos = await DiagnosticosIncidencias.findAll({ where: { CT_cod_incidencia: cod_incidencia } });
        if (diagnoticos.length === 0) {
            return res.status(404).json({ message: "No se encontraron diagnósticos" });
        }
        return res.status(200).json(diagnoticos);
    } catch (error) {
        return res.status(500).json({ message: "Error en el servidor" });
    }
}

async function obtenerIncidenciasAsignadas(req, res) {
    try {
        const { usuario } = req.params;
        const incidencias = await Incidencia_Asignada.findAll({
            where: { CT_cod_usuario: usuario },
            include: [
                {
                    model: Incidencias,
                    include: [
                        {
                            model: Incidencia_imagen,
                            include: [
                                {
                                    model: Imagenes
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        if (incidencias.length === 0) {
            return res.status(200).json({ message: "No se encontraron incidencias asignadas" });
        }
        const data = formatData(incidencias);
        return res.status(200).json({data});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
}

async function modificarEstadoIncidencia(req, res) {
    try {
        const { incidencia } = req.params;
        const { estado } = req.body;
        const diag = await DiagnosticosIncidencias.count({ where: { CT_cod_incidencia: incidencia } });
        if (diag === 0 && estado === "6") {
            return res.status(400).json({ message: "No se puede finalizar una incidencia sin diagnóstico" });
        }
        const inc = await Incidencias.update({ CT_estado: estado }, { where: { CT_cod_incidencia: incidencia } });
        if (inc) {
            return res.status(200).json({ message: "Estado de la incidencia modificado" });
        }
        return res.status(404).json({ message: "No se encontró la incidencia" });
    } catch (error) {
        return res.status(500).json({ message: "Error en el servidor" });
    }

}

async function registroDiagnostico(incidencia, diagnostico, usuario) {
    try {
        await DiagnosticosIncidencias.create({
            CT_cod_diagnostico: diagnostico,
            CT_cod_incidencia: incidencia,
            CT_id_usuario: usuario,
        });
    } catch (error) {
        console.log(error);
    }
}

function formatData(incidencias) {
    return incidencias.map(incidencia => {
        const { T_Incidencia } = incidencia;
        return {
            CT_cod_incidencia: T_Incidencia.CT_cod_incidencia,
            CT_titulo: T_Incidencia.CT_titulo,
            CT_descripcion: T_Incidencia.CT_descripcion,
            CT_lugar: T_Incidencia.CT_lugar,
            CF_Fecha_Hora: T_Incidencia.CF_Fecha_Hora,
            CT_Estado: T_Incidencia.CT_Estado,
            Imagenes: T_Incidencia.T_incidencia_imagens.map(imagen => imagen.T_Imagene.CI_imagen),
        };
    });
}

module.exports = {
    crearDiagnostico,
    mostrarDiagnosticoIncidencia,
    obtenerIncidenciasAsignadas,
    modificarEstadoIncidencia
}