const Usuario = require('../models/Usuarios');

async function crearUsuario(req, res) {
    try {
        const { cedula, nombre, apellidoUno, apellidoDos, contrasena, departamento, usuario_inst, puesto } = req.body;
        if (usuario_inst) {
            const usuarioNuevo = Usuario.create({
                CT_cedula: cedula,
                CT_Nombre: nombre,
                CT_apellidoUno: apellidoUno,
                CT_apellidoDos: apellidoDos,
                CT_contraseña: contrasena,
                CT_departamento: departamento,
                CT_usuario_institucional: usuario_inst,
                CT_puesto: puesto
            });
            res.status(200).json(usuarioNuevo);
        } else {
            const usuarioNuevo = Usuario.create({
                CT_cedula: cedula,
                CT_Nombre: nombre,
                CT_apellidoUno: apellidoUno,
                CT_apellidoDos: apellidoDos,
                CT_contraseña: contrasena,
                CT_departamento: departamento,
                CT_puesto: puesto
            });
            res.status(200).json(usuarioNuevo);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ Mensaje: 'Erro al crear el usuario' })
    }
}

module.exports = { crearUsuario }