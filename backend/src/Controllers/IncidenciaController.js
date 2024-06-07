const sequelize = require('../../sequelize_config');
const Incidencia = require('../models/Incidencias');
const UsuarioIncidenciaCreacion = require('../models/Usuario_Incidencia_Creacion');
const Usuario = require('../models/Usuarios');
const { codIncidencias } = require('../utils/Codes');

async function crearIncidencias(req, res) {
    try {
        const val = await Incidencia.count();
        const { usuario, titulo, descrip, lugar } = req.body;
        if (!usuario || !titulo || !descrip || !lugar) {
            return res.status(400).json({ Mensaje: 'Faltan campos requeridos' });
        }
        const incidencias = {
            CT_cod_incidencia: codIncidencias(val + 1),
            CT_titulo: titulo,
            CT_descripcion: descrip,
            CT_lugar: lugar,
            CF_Fecha_Hora: new Date(),
        }
        const incidenciaNueva = await Incidencia.create(incidencias);
        await UsuarioIncidenciaCreacion.create({
            CT_id_usuario: usuario,
            CT_cod_incidencia: incidencias.CT_cod_incidencia
        });
        res.status(201).json({ Mensaje: "Incidencia Creada", incidenciaNueva });
    } catch (err) {
        res.status(500).json({ Mensaje: 'Error al crear la incidencia', error: err.message });
    }
}

async function obtenerIncidencias(req, res) {
    try {
        const incidencias = await Incidencia.findAll({
            include: [
            {
                model: UsuarioIncidenciaCreacion,
                as: 'T_Usuario_Creacion_Incidencias',
                include: [
                    {
                        model: Usuario,
                        as: 'T_Usuario',
                        attributes: ['CT_cedula', 'CT_nombre']
                    }
                ]
            }
        ]
        });

    const incidenciasConUsuario = incidencias.map(incidencia => {
        const usuarioCreador = incidencia.T_Usuario_Creacion_Incidencias[0]?.T_Usuario;
        const  incidenciaData = {
            CT_cod_incidencia: incidencia.CT_cod_incidencia,
            CT_titulo: incidencia.CT_titulo,
            CT_descripcion: incidencia.CT_descripcion,
            CT_lugar: incidencia.CT_lugar,
            CF_Fecha_Hora: incidencia.CF_Fecha_Hora,
            CN_Costo: incidencia.CN_Costo,
            CT_Justificacion_cierre: incidencia.CT_Justificacion_cierre,
            CF_Fecha_Estimada: incidencia.CF_Fecha_Estimada,
            usuarioCreador: usuarioCreador ? {
                CT_cedula: usuarioCreador.CT_cedula,
                CT_nombre: usuarioCreador.CT_nombre
            } : null
        };
        return exludeNull(incidenciaData);
    });

    res.status(200).json(incidenciasConUsuario);
} catch (err) {
    console.error(err);
    res.status(500).json({ Mensaje: 'Error al obtener las incidencias', error: err.message });
}
}

async function obtenerIncidenciaUsuario(req, res) {
    try {
        const { usuario } = req.params;
        const result = await UsuarioIncidenciaCreacion.findAll({
            where: {
                CT_id_usuario: usuario
            }
        });
        if (result.length > 0) {
            const codsIncidencias = result.map(incidencia => incidencia.CT_cod_incidencia);
            const incidencias = await Incidencia.findAll({
                where: {
                    CT_cod_incidencia: codsIncidencias
                }
            });
            res.status(200).json(incidencias);
        } else {
            res.status(404).json({ Mensaje: `No se encontraron incidencias para el usuario ${usuario}` });
        }
    } catch (err) {
        res.status(500).json({ Mensaje: 'Error al obtener las incidencias', error: err.message });
    }
}

module.exports = { crearIncidencias, obtenerIncidencias, obtenerIncidenciaUsuario };