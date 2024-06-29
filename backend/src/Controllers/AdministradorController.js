const { Roles, UsuariosRoles, Usuarios } = require('../models/global_models');
const sequelize = require('../../sequelize_config');

async function crearUsuarios(req, res) {
    try {
        const { cedula, nombre, apellidoUno, apellidoDos, correo, telefono, puesto, departamento, contrasena } = req.body;
        const contrasenaAlternativa = correo.toString().split('@')[0];
        const existeUsuario = await Usuarios.findOne({ where: { CT_cedula: cedula } });
        if (existeUsuario) return res.status(400).json({ message: "El usuario ya existe" });
        console.log(contrasenaAlternativa);
        const usuario = await Usuarios.create({
            CT_cedula: cedula,
            CT_nombre: nombre,
            CT_apellidoUno: apellidoUno,
            CT_apellidoDos: apellidoDos,
            CT_usuario_institucional: correo,
            CT_numero_telefono: telefono,
            CT_contraseña: contrasena || contrasenaAlternativa,
            CT_puesto: puesto,
            CT_departamento: departamento || null
        });
        return res.status(201).json({ message: "Usuario creado exitosamente" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
}

async function asignarRoles(req, res) {
    try {
        const { cedula, roles } = req.body;
        const usuario = await Usuarios.findOne({ where: { CT_cedula: cedula } });
        if (!usuario) return res.status(400).json({ message: "El usuario no existe" });
        const rolesUsuario = await Roles.findAll({ where: { CT_id_Rol: roles } });
        if (rolesUsuario.length == 0) return res.status(400).json({ message: "Los roles no existen" });
        let rolesAsignados = 0;
        for (let i = 0; i < rolesUsuario.length; i++) {
            const existeRol = await UsuariosRoles.findOne({
                where: {
                    CT_id_usuario: cedula,
                    CT_cod_Rol: rolesUsuario[i].CT_id_Rol
                }
            });
            if (!existeRol) {
                await UsuariosRoles.create({
                    CT_id_usuario: cedula,
                    CT_cod_Rol: rolesUsuario[i].CT_id_Rol
                });
                rolesAsignados++;
            }
        }
        if (rolesAsignados > 0) {
            return res.status(201).json({ message: "Roles asignados correctamente" });
        } else {
            return res.status(400).json({ message: "Los roles ya estaban asignados al usuario" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
}

async function revocarRoles(req, res) {
    try {
        const { cedula, roles } = req.body;
        const usuario = await Usuarios.findOne({ where: { CT_cedula: cedula } });
        if (!usuario) return res.status(400).json({ message: "El usuario no existe" });
        const rolesUsuario = await Roles.findAll({ where: { CT_id_Rol: roles } });
        if (rolesUsuario.length == 0) return res.status(400).json({ message: "Los roles no existen" });
        for (let i = 0; i < rolesUsuario.length; i++) {
            await UsuariosRoles.destroy({ where: { CT_cedula: cedula, CT_id_Rol: rolesUsuario[i].CT_id_Rol } });
        }
        return res.status(201).json({ message: "Roles revocados correctamente" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
}

async function obtenerUsuarios(req, res) {
    try {
        const usuarios = await Usuarios.findAll({});
        
        return res.status(200).json({ usuarios });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
}

module.exports = {
    crearUsuarios,
    asignarRoles,
    revocarRoles,
    obtenerUsuarios
};