const Usuario = require('../models/Usuarios');

async function crearUsuario(req, res) {
    try {
        const { cedula, nombre, apellidoUno, apellidoDos, contraseña, departamento, usuario_inst, puesto } = req.body;
        if (!cedula || !nombre || !apellidoUno || !apellidoDos || !contraseña || !departamento || !puesto) {
            return res.status(400).json({ Mensaje: 'Faltan campos requeridos' });
        }
        const usuarioData = {
            CT_cedula: cedula,
            CT_nombre: nombre,
            CT_apellidoUno: apellidoUno,
            CT_apellidoDos: apellidoDos,
            CT_contraseña: contraseña,
            CT_departamento: departamento,
            CT_usuario_institucional: usuario_inst || null,
            CT_puesto: puesto
        };
        const usuarioNuevo = await Usuario.create(usuarioData)
        res.status(201).json(usuarioNuevo);
    } catch (err) {
        res.status(500).json({ Mensaje: 'Error al crear el usuario', error: err.message });
    }
}


module.exports = { crearUsuario };
