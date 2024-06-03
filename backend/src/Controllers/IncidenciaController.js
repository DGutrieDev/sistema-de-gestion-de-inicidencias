const sequelize = require('../../sequelize_config');
const Incidencia = require('../models/incidencias');

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
        await sequelize.transaction(async (t) => {
            await sequelize.query("Call crearIncidencia(:id_usuario, :cod_incidencia)", {
                replacements: {
                    id_usuario: usuario,
                    cod_incidencia: codIncidencias(val + 1)
                },
                transaction: t
            });
        });
        res.status(201).json({ Mensaje: "Incidencia Creada", incidenciaNueva });
    } catch (err) {
        res.status(500).json({ Mensaje: 'Error al crear la incidencia', error: err.message });
    }
}

async function obtenerIncidencias(req, res) {
    try {
        const incidencias = await Incidencia.findAll();
        res.status(200).json(incidencias);
    } catch (err) {
        res.status(500).json({ Mensaje: 'Error al obtener las incidencias', error: err.message });
    }
}

async function obtenerIncidenciaUsuario(req, res) {
    try {
        const { usuario } = req.params;
        console.log(usuario);
        const [result] = await sequelize.query(
            "SELECT CT_cod_incidencia FROM t_usuario_incidencia_creacion WHERE CT_id_usuario = :usuario",
            { replacements: { usuario: usuario } }
        );

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

function codIncidencias(n) {
    const year = new Date().getFullYear().toString();
    const cons = n.toString().padStart(6, '0');
    const cod = `${year}-${cons}`;
    return cod;
}

module.exports = { crearIncidencias, obtenerIncidencias, obtenerIncidenciaUsuario };