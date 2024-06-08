const Prioridades = require("../models/Prioridades");

async function obtenerPrioridades(req, res) {
  try {
    const prioridades = await Prioridades.findAll(
      { attributes: ["CT_cod_prioridad", "CT_descrip_prioridad"] }
    );
    res.json(prioridades);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error en el servidor",
    });
  }
}

module.exports = {
  obtenerPrioridades,
};