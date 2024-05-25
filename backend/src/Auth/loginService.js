const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuarios');

async function login(req, res) {
    try {
        const { usuario, password } = req.body;

        if (!usuario || !password) {
            return res.status(400).json({ message: 'Usuario and password are required' });
        }

        const usuario_existente = await Usuario.findOne({
            where: {
                [Op.or]: [
                    { CT_cedula: usuario },
                    { CT_usuario_institucional: usuario }
                ],
                CT_contraseña: password
            }
        });
        if (usuario_existente) {
            const token = jwt.sign(
                {
                    user_id: usuario_existente.CT_cedula,
                    user_name: usuario_existente.CT_Nombre
                },
                process.env.TOKEN_SECRET,
                { expiresIn: '5h' }
            );

            return res.status(200).json({
                message: 'Usuario Logueado',
                data: {
                    id_usuario: usuario_existente.CT_cedula,
                    nombre_usuario: usuario_existente.CT_Nombre,
                    token: token
                }
            });
        } else {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
}

module.exports = { login };
