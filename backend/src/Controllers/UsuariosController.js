const { Incidencias, Incidencia_Creada, Usuarios, UsuariosRoles, Estados, Roles, Imagenes, Incidencia_imagen,Bitacora_acciones } = require('../models/global_models');
const { codIncidencias, codImagen } = require('../Services/CodesGenerate_Service');
const { IncidenciaRegistrada } = require('../Services/Email_Service');
const moment = require('moment-timezone');

async function crearIncidencias(req, res) {
    try {
        const { usuario, titulo, descripcion, lugar, imagen } = req.body;
        const cod_Incidencia = codIncidencias((await Incidencias.count()) + 1);
        const fecha = moment().tz("America/Costa_Rica").format("DD-MM-YYYY HH:mm:ss");
        if (!usuario || !titulo || !descripcion || !lugar) {
            return res.status(400).json({ message: "Faltan datos" });
        }
        const user = await Usuarios.findByPk(usuario);
        const rol = await UsuariosRoles.findOne({
            where: {
                CT_id_usuario: usuario,
                CT_cod_rol: 2
            }
        });
        if (!rol) {
            return res.status(401).json({ message: "No tiene permisos para crear incidencias" });
        }
        const incidencia = await Incidencias.create({
            CT_cod_incidencia: cod_Incidencia,
            CT_titulo: titulo,
            CT_descripcion: descripcion,
            CT_lugar: lugar,
            CT_Estado: "1",
            CF_Fecha_Hora: fecha
        });
        const cant_imagenes = await Imagenes.count();
        if (imagen) {
            await Imagenes.create({
                CT_cod_imagen: codImagen(cant_imagenes + 1, incidencia.CT_cod_incidencia),
                CI_imagen: imagen
            });

            await Incidencia_imagen.create({
                CT_cod_incidencia: incidencia.CT_cod_incidencia,
                CT_cod_imagen: codImagen(cant_imagenes + 1, incidencia.CT_cod_incidencia)
            })
        }
        if (incidencia) {
            creadorIncidencia(usuario, cod_Incidencia);
            await Bitacora_acciones.create({
                CT_id_usuario: usuario,
                CT_cod_pantalla: "002",
                CT_logs: `registro incidencia ${cod_Incidencia}, usuario: ${user.CT_cedula},pantalal: 002`
            });
            IncidenciaRegistrada(
                user.CT_usuario_institucional,
                cod_Incidencia,
                `${user.CT_nombre} ${user.CT_apellidoUno} ${user.CT_apellidoDos}`,
                titulo
            );
            return res.status(201).json({ message: "Incidencia creada" });
        }
        return res.status(400).json({ message: "No se pudo crear la incidencia" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
}

async function obtenerIncidenciasUsuario(req, res) {
    try {
        const { usuario } = req.params;
        const incidenciascreadas = await Incidencia_Creada.findAll({
            where: {
                CT_id_usuario: usuario
            }, include: [
                {
                    model: Incidencias, include: [{ model: Estados }
                    ,{ model: Incidencia_imagen, include: [{ model: Imagenes }] }
                    ]
                },
                { model: Usuarios }
            ]
        });
        if (!incidenciascreadas) {
            return res.status(404).json({ message: "No se encontraron incidencias" });
        }
        const data = incidenciascreadas.map((incidencia) => formatData(incidencia));
        return res.status(200).json({data});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
}

async function informacionUsuario(req, res) {
    try {
        const { usuario } = req.params;
        const user = await Usuarios.findByPk(
            usuario, {
            include: [
                {
                    model: UsuariosRoles,
                    include: [{
                        model: Roles,
                        attributes: ['CT_id_Rol','CT_desc_rol']
                    }]
                },
            ]
        });
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        const data = formatUserData(user);
        return res.status(200).json({ data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error en el servidor" });
    }

}

async function reabrirIncidencia(req, res) {
    try {
        const { cod_Incidencia } = req.params;
        const incidencia = await Incidencias.findOne({
            where: {
                CT_cod_incidencia: cod_Incidencia
            },
            attributes: ['CT_Estado']
        });
        if (incidencia.CT_Estado !== "9") {
            return res.status(400).json({ message: "La incidencia no se encuentra cerrada" });
        }
        await Incidencias.update({
            CT_Estado: "1"
        }, {
            where: {
                CT_cod_incidencia: cod_Incidencia
            }
        });
        return res.status(200).json({ message: "Incidencia reabierta" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
}

async function creadorIncidencia(usuario, cod_Incidencia) {
    try {
        const incidencia = await Incidencias.findOne({
            where: {
                CT_cod_incidencia: cod_Incidencia
            }
        });
        await Incidencia_Creada.create({
            CT_id_usuario: usuario,
            CT_cod_incidencia: incidencia.CT_cod_incidencia
        });
    } catch (error) {
        console.log(error);
    }
}

function formatData(Incidencia) {
    return {
        Creador: Incidencia.T_Usuario.CT_nombre + " " + Incidencia.T_Usuario.CT_apellidoUno + " " + Incidencia.T_Usuario.CT_apellidoDos,
        CT_cod_incidencia: Incidencia.T_Incidencia.CT_cod_incidencia,
        CT_titulo: Incidencia.T_Incidencia.CT_titulo,
        CT_descripcion: Incidencia.T_Incidencia.CT_descripcion,
        CT_lugar: Incidencia.T_Incidencia.CT_lugar,
        CT_Estado: Incidencia.T_Incidencia.T_Estado.CT_descrip_estado,
        CF_Fecha_Hora: Incidencia.T_Incidencia.CF_Fecha_Hora,
        Imagenes: Array.isArray(Incidencia.T_Incidencia.T_incidencia_imagens) 
            ? Incidencia.T_Incidencia.T_incidencia_imagens.map((imagen) => imagen.T_Imagene.CI_imagen)
            : []
    };
}


function formatUserData(user) {
    return {
        cedula: user.CT_cedula,
        nombre: user.CT_nombre,
        apellidoUno: user.CT_apellidoUno,
        apellidoDos: user.CT_apellidoDos,
        correo: user.CT_usuario_institucional,
        telefono: user.CT_telefono,
        puesto: user.CT_puesto,
        numeroTelefono: user.CT_numero_telefono ? user.CT_numero_telefono : 'No disponible',
        roles: user.T_rol_usuarios.map((rol) => rol.T_Role),
    }

}

module.exports = {
    crearIncidencias,
    obtenerIncidenciasUsuario,
    informacionUsuario,
    reabrirIncidencia
}