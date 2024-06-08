const Riesgos = require('../models/Riesgos');

async function obtenerRiesgos(req, res) {
    try {
        const riesgos = await Riesgos.findAll(
            { attributes: ['CT_cod_riesgo', 'CT_descrip_riesgo'] }
        );
        res.json(riesgos);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { 
    obtenerRiesgos
};