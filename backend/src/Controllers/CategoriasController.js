const Categoria = require('../models/Categorias');

async function obtenerCategorias(req, res) {
    try {
        const categorias = await Categoria.findAll(
            { attributes: ['CT_cod_categoria', 'CT_descrip_categ'] }
        );
        res.json(categorias);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { 
    obtenerCategorias
};