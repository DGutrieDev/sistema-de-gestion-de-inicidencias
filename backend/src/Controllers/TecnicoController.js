const { Diagnosticos, DiagnosticosIncidencias, Incidencias, Incidencia_Asignada, UsuariosRoles } = require('../models/global_models');
const { codDiagnostico } = require('../Services/CodesGenerate_Service');


async function crearDiagnostico(req, res) {
    try {
        const { incidencia } = req.params;
        const { usuario, observaciones, estimacion, requiere_compra, diagnostico } = req.body;
        const n = await DiagnosticosIncidencias.count() + 1;
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
        const incidencias = await Incidencia_Asignada.findAll({ where: { CT_id_usuario: usuario } });
        if (incidencias.length === 0) {
            return res.status(404).json({ message: "No se encontraron incidencias asignadas" });
        }
        return res.status(200).json(incidencias);
    } catch (error) {
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


module.exports = {
    crearDiagnostico,
    mostrarDiagnosticoIncidencia,
    obtenerIncidenciasAsignadas,
    modificarEstadoIncidencia
}