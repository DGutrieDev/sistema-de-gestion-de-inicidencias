const Afectacion = require('../models/Afectacion');

async function obtenerAfectaciones(req, res) {
    try {
        const afectaciones = await Afectacion.findAll(
            { attributes: ['CT_cod_afectacion', 'CT_descrip_afec'] }
        );
        res.json(afectaciones);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { 
    obtenerAfectaciones
};