const Roles = require('../models/Roles');
const Usuario = require('../models/Usuarios');
const Usuario_Rol = require('../models/Usuario_Rol');
const { emailRegistro } = require('../utils/Emails');

async function crearUsuario(req, res) {
    try {
        const { cedula, nombre, apellidoUno, apellidoDos, contraseña, usuario_inst, puesto } = req.body;

        if (!cedula || !nombre || !apellidoUno || !apellidoDos || !puesto || !usuario_inst) {
            return res.status(400).json({ Mensaje: 'Faltan campos requeridos' });
        }
        const usuarioData = {
            CT_cedula: cedula,
            CT_nombre: nombre,
            CT_apellidoUno: apellidoUno,
            CT_apellidoDos: apellidoDos,
            CT_contraseña: contraseña || usuario_inst.toString().split('@')[0],
            CT_usuario_institucional: usuario_inst || null,
            CT_puesto: puesto
        };
        const usuarioNuevo = await Usuario.create(usuarioData);
        emailRegistro(usuarioNuevo.CT_nombre +' '+ usuarioNuevo.CT_apellidoUno +' '+ usuarioNuevo.CT_apellidoDos, usuarioNuevo.CT_usuario_institucional, usuarioNuevo.CT_contraseña);
        res.status(201).json({ Mensaje: "Usuario Creado", usuarioNuevo });
    } catch (err) {
        console.error(err);
        res.status(500).json({ Mensaje: 'Error al crear el usuario', error: err.message });
    }
}

async function obtenerUsuarios(req, res) {
    try {
        const usuarios = await Usuario.findAll({
            attributes: ['CT_cedula', 'CT_nombre', 'CT_apellidoUno', 'CT_apellidoDos', 'CT_usuario_institucional', 'CT_puesto'],
            include: [
                {
                    model: Usuario_Rol,
                    attributes: ['CT_cod_Rol'],
                    include: [
                        {
                            model: Roles,
                            attributes: ['CT_desc_rol']
                        }
                    ]
                }
            ]
        });
        if (usuarios.length === 0) {
            return res.status(404).json({ Mensaje: "No hay usuarios registrados" });
        }
        const usuarios_informacion = usuarios.map(usuario => {
            const roles = usuario.T_rol_usuarios ? usuario.T_rol_usuarios.map(ur => ({
                CT_desc_rol: ur.T_Role.CT_desc_rol
            })) : [];

            return {
                CT_cedula: usuario.CT_cedula,
                CT_nombre: usuario.CT_nombre,
                CT_apellidoUno: usuario.CT_apellidoUno,
                CT_apellidoDos: usuario.CT_apellidoDos,
                CT_usuario_institucional: usuario.CT_usuario_institucional,
                CT_puesto: usuario.CT_puesto,
                roles: roles
            };
        });

        res.status(200).json(usuarios_informacion);
    } catch (err) {
        console.error(err);
        res.status(500).json({ Mensaje: 'Error al obtener los usuarios', error: err.message });
    }

}

async function obtenerUsuarioPorId(req, res) {
    try {
        const { id_usuario } = req.params
        const usuarios = await Usuario.findAll({
            attributes: ['CT_cedula', 'CT_nombre', 'CT_apellidoUno', 'CT_apellidoDos', 'CT_usuario_institucional', 'CT_puesto'],
            where: { CT_cedula: id_usuario },
            include: [
                {
                    model: Usuario_Rol,
                    attributes: ['CT_cod_Rol'],
                    include: [
                        {
                            model: Roles,
                            attributes: ['CT_desc_rol']
                        }
                    ]
                }
            ]
        });
        if (usuarios.length === 0) {
            return res.status(404).json({ Mensaje: "Usuario no encontrado" });
        }
        const usuarios_informacion = usuarios.map(usuario => {
            const roles = usuario.T_rol_usuarios ? usuario.T_rol_usuarios.map(ur => ({
                CT_desc_rol: ur.T_Role.CT_desc_rol
            })) : [];

            return {
                CT_cedula: usuario.CT_cedula,
                CT_nombre: usuario.CT_nombre,
                CT_apellidoUno: usuario.CT_apellidoUno,
                CT_apellidoDos: usuario.CT_apellidoDos,
                CT_usuario_institucional: usuario.CT_usuario_institucional,
                CT_puesto: usuario.CT_puesto,
                roles: roles
            };
        });

        res.status(200).json(usuarios_informacion);
    } catch (err) {
        console.error(err);
        res.status(500).json({ Mensaje: 'Error al obtener los usuarios', error: err.message });
    }
}

async function actualizarUsuario(req, res) {
    try {
        const { cedula } = req.params;
        const { nombre, apellidoUno, apellidoDos, contraseña, usuario_inst, puesto } = req.body;

        if (!nombre || !apellidoUno || !apellidoDos || !contraseña || !puesto) {
            return res.status(400).json({ Mensaje: 'Faltan campos requeridos' });
        }

        const usuarioData = {
            CT_nombre: nombre,
            CT_apellidoUno: apellidoUno,
            CT_apellidoDos: apellidoDos,
            CT_contraseña: contraseña,
            CT_usuario_institucional: usuario_inst || null,
            CT_puesto: puesto
        };

        const usuario = await Usuario.findByPk(cedula);

        if (usuario) {
            await Usuario.update(usuarioData, { where: { CT_cedula: cedula } });
            res.status(200).json({ Mensaje: "Usuario Actualizado" });
        } else {
            res.status(404).json({ Mensaje: "Usuario no encontrado" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ Mensaje: 'Error al actualizar el usuario', error: err.message });
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

        if (usuario) {
            await Usuario_Rol.create({ CT_id_usuario: cedula, CT_cod_Rol: rol });
            res.status(200).json({ Mensaje: `Al Usuario ${cedula} se le ha asignado el rol de ${role.CT_desc_rol}` });
        } else {
            res.status(404).json({ Mensaje: "Usuario no encontrado" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ Mensaje: 'Error al asignar roles al usuario', error: err.message });
    }
}

async function revocarRol(req, res) {

    try {
        const { cedula, rol } = req.body;

        if (!rol) {
            return res.status(400).json({ Mensaje: 'Faltan campos requeridos' });
        }

        const usuario = await Usuario.findByPk(cedula);

        if (!usuario) {
            return res.status(404).json({ Mensaje: "Usuario no encontrado" });
        }

        const role = await Roles.findByPk(rol, { attributes: ['CT_desc_rol'] });

        if (!role) {
            return res.status(404).json({ Mensaje: "Rol desconocido" });
        }

        const usuarioRol = await Usuario_Rol.findOne({
            where: {
                CT_id_usuario: cedula,
                CT_cod_Rol: rol
            }
        });

        if (!usuarioRol) {
            return res.status(400).json({ Mensaje: `El usuario(a) ${usuario.CT_nombre} ${usuario.CT_apellidoUno} ${usuario.CT_apellidoDos} no posee el rol de ${role.CT_desc_rol}` });
        }

        await Usuario_Rol.destroy({
            where: {
                CT_id_usuario: cedula,
                CT_cod_Rol: rol
            }
        });

        res.status(200).json({ Mensaje: `Al Usuario ${cedula} se le ha revocado el rol de ${role.CT_desc_rol}` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ Mensaje: 'Error al revocar roles al usuario', error: err.message });
    }
}

async function modificarContrasena(req, res) {
    try {
        const { cedula } = req.params;
        const { contraseña } = req.body;

        if (!contraseña) {
            return res.status(400).json({ Mensaje: 'Faltan campos requeridos' });
        }

        const usuario = await Usuario.findByPk(cedula);

        if (usuario) {
            await Usuario.update({ CT_contraseña: contraseña }, { where: { CT_cedula: cedula } });
            res.status(200).json({ Mensaje: "Contraseña Actualizada" });
        } else {
            res.status(404).json({ Mensaje: "Usuario no encontrado" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ Mensaje: 'Error al actualizar la contraseña del usuario', error: err.message });
    }
}

module.exports = { crearUsuario, actualizarUsuario, asignarRoles, revocarRol, obtenerUsuarioPorId, obtenerUsuarios, modificarContrasena };