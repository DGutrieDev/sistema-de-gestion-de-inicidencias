const Usuario = require('../models/Usuarios');

async function crearUsuario(req, res) {
    try {
        const { cedula, nombre, apellidoUno, apellidoDos, contraseña, departamento, usuario_inst, puesto } = req.body;
        let usuarioNuevo;
        if (usuario_inst) {
            usuarioNuevo = await Usuario.create({
                CT_cedula: cedula,
                CT_nombre: nombre,
                CT_apellidoUno: apellidoUno,
                CT_apellidoDos: apellidoDos,
                CT_contraseña: contraseña,
                CT_departamento: departamento,
                CT_usuario_institucional: usuario_inst,
                CT_puesto: puesto
            });
        } else {
            usuarioNuevo = await Usuario.create({
                CT_cedula: cedula,
                CT_nombre: nombre,
                CT_apellidoUno: apellidoUno,
                CT_apellidoDos: apellidoDos,
                CT_contraseña: contraseña,
                CT_departamento: departamento,
                CT_puesto: puesto
            });
        }
        res.status(201).json(usuarioNuevo);
    } catch (err) {
        res.status(500).json({ Mensaje: 'Error al crear el usuario', error: err.message });
    }
}

module.exports = { crearUsuario };
