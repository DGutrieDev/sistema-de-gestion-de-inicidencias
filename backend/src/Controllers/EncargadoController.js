const { Roles, Incidencias, Incidencia_Asignada, Afectaciones, Estados, Categorias, Riesgos, UsuariosRoles, Usuarios, Prioridades } = require('../models/global_models');
const { EmailAsignacion } = require('../Services/Email_Service');
const sequelize = require('sequelize');

async function obtenerIncidenciasRegistradas(req, res) {
    try {
        const incidencias = await Incidencias.findAll({
            where: {
                CT_Estado: "1"
            }
        });
        return res.status(200).json({ incidencias });
    } catch (error) {
        return res.status(500).json({ message: "Error en el servidor" });
    }
}

async function obtenerTecnicos(req, res) {
    try {
        const tecnicos = await Usuarios.findAll({
            include: [
                {
                    model: UsuariosRoles,
                    attributes: [],
                    where: {
                        CT_cod_Rol: 4
                    }
                }
            ],
            attributes: ['CT_cedula', 'CT_nombre', 'CT_apellidoUno', 'CT_apellidoDos']
        });
        return res.status(200).json({ tecnicos });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
}

async function asignarIncidencia(req, res) {
    try {
        const { cod_Incidencia, ids_Tecnicos } = req.body;
        for (const id of ids_Tecnicos) {
            const rol = await UsuariosRoles.findOne({
                where: {
                    CT_id_usuario: id,
                    CT_cod_Rol: 4
                }
            });

            if (!rol) {
                continue;
            }

            const asignacion_existente = await Incidencia_Asignada.findOne({
                where: {
                    CT_cod_usuario: id,
                    CT_id_incidencia: cod_Incidencia
                }
            });

            if (asignacion_existente) {
                return res.status(400).json({ message: `Incidencia ya asignada a este técnico con ID ${id}` });
            }

            await Incidencia_Asignada.create({
                CT_cod_usuario: id,
                CT_id_incidencia: cod_Incidencia
            });

            const tecnico = await Usuarios.findOne({
                where: { CT_cedula: id }
            });

            const incidencia = await Incidencias.findOne({
                where: { CT_cod_incidencia: cod_Incidencia }
            });

            EmailAsignacion(
                tecnico.CT_usuario_institucional,
                `${tecnico.CT_nombre} ${tecnico.CT_apellidoUno} ${tecnico.CT_apellidoDos}`,
                `${incidencia.CT_cod_incidencia} - ${incidencia.CT_titulo}`
            );
        }

        return res.status(200).json({ message: "Incidencia asignada correctamente" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
}

async function obtenerRiesgos(req, res) {
    try {
        const riesgos = await Riesgos.findAll(
            { attributes: ['CT_cod_riesgo', 'CT_descrip_riesgo'] }
        );
        return res.status(200).json({ riesgos });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
}

async function obtenerCategorias(req, res) {
    try {
        const categorias = await Categorias.findAll(
            { attributes: ['CT_cod_categoria', 'CT_descrip_categ']}
        );
        return res.status(200).json({ categorias });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
}

async function obtenerEstados(req, res) {
    try {
        const estados = await Estados.findAll(
            { attributes: ['CT_cod_estado', 'CT_descrip_estado']}
        );
        return res.status(200).json({ estados });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
}

async function obtenerAfectaciones(req, res) {
    try {
        const afectaciones = await Afectaciones.findAll(
            { attributes: ['CT_cod_afectacion', 'CT_descrip_afec']}
        );
        return res.status(200).json({ afectaciones });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
}

async function obtenerPrioridades(req, res) {
    try {
        const prioridades = await Prioridades.findAll(
            { attributes: ['CT_cod_prioridad', 'CT_descrip_prioridad']}
        );
        return res.status(200).json({ prioridades });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
}


module.exports = {
    obtenerIncidenciasRegistradas,
    obtenerTecnicos,
    asignarIncidencia,
    obtenerRiesgos,
    obtenerCategorias,
    obtenerEstados,
    obtenerAfectaciones,
    obtenerPrioridades
}