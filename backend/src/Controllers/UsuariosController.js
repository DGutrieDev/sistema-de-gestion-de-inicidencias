const { QueryTypes } = require('sequelize');
const sequelize = require('../../sequelize_config');
const Usuario = require('../models/Usuarios');
const Roles = require('../models/Roles');

async function crearUsuario(req, res) {
    try {
        const { cedula, nombre, apellidoUno, apellidoDos, contraseña, departamento, usuario_inst, puesto } = req.body;
        if (!cedula || !nombre || !apellidoUno || !apellidoDos || !contraseña || !puesto) {
            return res.status(400).json({ Mensaje: 'Faltan campos requeridos' });
        }
        const usuarioData = {
            CT_cedula: cedula,
            CT_nombre: nombre,
            CT_apellidoUno: apellidoUno,
            CT_apellidoDos: apellidoDos,
            CT_contraseña: contraseña,
            CT_departamento: departamento || null,
            CT_usuario_institucional: usuario_inst || null,
            CT_puesto: puesto
        };
        const usuarioNuevo = await Usuario.create(usuarioData)
        res.status(201).json({ Mensaje: "Usuario Creado", usuarioNuevo });
    } catch (err) {
        res.status(500).json({ Mensaje: 'Error al crear el usuario', error: err.errors.message });
    }
}

async function actualizarUsuario(req, res) {
    try {
        const { cedula } = req.params;
        const { nombre, apellidoUno, apellidoDos, contraseña, departamento, usuario_inst, puesto } = req.body;
        if (!nombre || !apellidoUno || !apellidoDos || !contraseña || !puesto) {
            return res.status(400).json({ Mensaje: 'Faltan campos requeridos' });
        }
        const usuarioData = {
            CT_nombre: nombre,
            CT_apellidoUno: apellidoUno,
            CT_apellidoDos: apellidoDos,
            CT_contraseña: contraseña,
            CT_departamento: departamento || null,
            CT_usuario_institucional: usuario_inst || null,
            CT_puesto: puesto
        }
        const usuario = Usuario.findByPk(cedula);
        if (usuario) {
            await Usuario.update(usuarioData, {
                where: {
                    CT_cedula: cedula
                }
            });
            res.status(200).json({ Mensaje: "Usuario Actualizado" })
        } else {
            res.status(404).json({ Mensaje: "Usuario no encontrado" })
        }
    } catch (err) {
        res.status(500).json({ Mensaje: 'Error al crear el usuario', error: err.errors.message });
    }
}

async function asignarRoles(req, res) {
    try {
        const { cedula, rol } = req.body;
        if (!rol) {
            return res.status(400).json({ Mensaje: 'Faltan campos requeridos' });
        }
        const role = await Roles.findByPk(rol, { attributes: ['CT_desc_rol'] });
        const usuario = await Usuario.findByPk(cedula);
        if (usuario && role) {
            await sequelize.query("Call asignar_Rol(:id_usuario,:id_rol)", {
                replacements: {
                    id_usuario: cedula,
                    id_rol: rol
                }
            });
            res.status(200).json({ Mensaje: `Al Usuario ${cedula} se le ha asignado el rol de ${role.CT_desc_rol}` });
        } else {
            res.status(404).json({ Mensaje: "Usuario no encontrado o Rol desconocido" });
        }
    } catch (err) {
        res.status(500).json({ Mensaje: 'Error al asignar roles al usuario', error: err.message });
    }
}

async function revocarRol(req, res) {
    try {
        const { cedula, rol } = req.body;
        if (!rol) {
            return res.status(400).json({ Mensaje: 'Faltan campos requeridos' });
        }
        const role = await Roles.findByPk(rol, { attributes: ['CT_desc_rol'] });
        const usuario = await Usuario.findByPk(cedula);

        if (!usuario || !role) {
            return res.status(404).json({ Mensaje: "Usuario no encontrado o Rol desconocido" });
        }
        const usuario_Rol = await sequelize.query(
            `SELECT * FROM t_rol_usuario WHERE CT_id_usuario = :cedula AND CT_cod_rol = :rol`,
            {
                replacements: { cedula: cedula, rol: rol },
                type: QueryTypes.SELECT
            }
        );

        if (usuario_Rol.length === 0) {
            return res.status(400).json({ Mensaje: "El usuario no tiene asignado este rol" });
        }
        await sequelize.query("CALL revocar_Rol(:id_usuario, :id_rol)", {
            replacements: {
                id_usuario: cedula,
                id_rol: rol
            }
        });

        res.status(200).json({ Mensaje: `Al Usuario ${cedula} se le ha revocado el rol de ${role.CT_desc_rol}` });
    } catch (err) {
        res.status(500).json({ Mensaje: 'Error al revocar roles al usuario', error: err.message });
    }
}

module.exports = { crearUsuario, actualizarUsuario, asignarRoles, revocarRol };
