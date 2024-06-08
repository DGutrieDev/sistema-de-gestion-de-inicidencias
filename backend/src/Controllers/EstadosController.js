const Estados = require('../models/Estados');

async function obtenerEstados(req, res) {
    try {
        const estados = await Estados.findAll(
            { attributes: ['CT_cod_estado', 'CT_descrip_estado'] }
        );
        res.json(estados);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { 
    obtenerEstados
};