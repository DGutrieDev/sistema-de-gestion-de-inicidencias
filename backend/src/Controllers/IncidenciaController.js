const {
  Incidencias,
  Estados,
  Incidencia_Asignada,
  Incidencia_Creada,
  Afectaciones,
  Categorias,
  Riesgos,
  Prioridades,
  Usuarios,
} = require("../models/global_models");
const { codIncidencias } = require("../utils/Codes");
const { IncidenciaRegistrada, EmailAsignacion } = require("../utils/Emails");

async function crearIncidencias(req, res) {
  try {
    const num = await Incidencias.count();
    const { usuario, titulo, descrip, lugar } = req.body;
    if (!usuario || !titulo || !descrip || !lugar) {
      return res.status(400).json({
        error: true,
        message: "Faltan datos para crear la incidencia",
      });
    }
    await Incidencias.create({
      CT_cod_incidencia: codIncidencias(num + 1),
      CT_titulo: titulo,
      CT_descrip: descrip,
      CT_lugar: lugar,
      CT_Estado: "1",
      CF_Fecha_Hora: new Date(),
    });
    const incidencia = await Incidencias.findByPk(num + 1);
    if (incidencia) {
      creacion(usuario, incidencia.CT_cod_incidencia);
    }
    const user = await Usuarios.findByPk(usuario);
    IncidenciaRegistrada(
      user.CT_usuario_institucional,
      incidencia.CT_cod_incidencia,
      `${user.CT_nombre} ${user.CT_apellidoUno} ${user.CT_apellidoDos}`,
      incidencia.CT_titulo
    );
  } catch (error) {
    res
      .status(500)
      .json({ error: true, message: "Error al crear la incidencia" });
  }
}

async function asignarIncidencia(req, res) {
  try {
    const { id_usuarios, cod_incidencia } = req.body;
    if (!id_usuarios || !cod_incidencia) {
      return res.status(400).json({
        message: "Faltan datos para asignar la incidencia",
      });
    }
    const incidencia = await Incidencias.findByPk(cod_incidencia);
    for (const id of id_usuarios) {
      const user = await Usuarios.findByPk(id);
      asignar(id, cod_incidencia);
      EmailAsignacion(
        user.CT_usuario_institucional,
        `${user.CT_nombre} ${user.CT_apellidoUno} ${user.CT_apellidoDos}`,
        `${incidencia.CT_cod_incidencia} - ${incidencia.CT_titulo}`
      )
    }
    res.status(200).json({ message: "Incidencia asignada correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al asignar la incidencia",
    });
  }
}

// Incidencias Asignadas a un Tecnico
async function obtenerIncidenciasAsignadas(req, res) {
  try {
    const { id_usuario } = req.params;
    await Incidencia_Asignada.findAll({
      where: { id_usuario: id_usuario },
      include: [
        {
          model: Incidencias,
          as: "incidencia",
          attributes: [
            "CT_cod_incidencia",
            "CT_titulo",
            "CT_descrip",
            "CT_lugar",
            "CT_Estado",
            "CF_Fecha_Hora",
          ],
        },
      ],
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Error al obtener las incidencias asignadas",
    });
  }
}

// Incidencias Creadas por un Usuario
async function obtenerIncidenciasCreadas(req, res) {
  try {
    const { id_usuario } = req.params;
    await Incidencia_Creada.findAll({
      where: { id_usuario: id_usuario },
      include: [
        {
          model: Incidencias,
          as: "incidencia",
          attributes: [
            "CT_cod_incidencia",
            "CT_titulo",
            "CT_descrip",
            "CT_lugar",
            "CT_Estado",
            "CF_Fecha_Hora",
          ],
        },
      ],
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Error al obtener las incidencias creadas",
    });
  }
}

// Todas las incidencias
async function obtenerIncidencias(req, res) {
  try {
    const incidencia = await Incidencias.findAll({
      attributes: [
        "CT_cod_incidencia",
        "CT_titulo",
        "CT_descripcion",
        "CT_lugar",
        "CT_Estado",
        "CF_Fecha_Hora",
      ],
      include: [
        {
          model: Estados,
          attributes: ["CT_descrip_estado"],
        },
        {
          model: Prioridades,
          attributes: ["CT_descrip_prioridad"],
        },
        {
          model: Afectaciones,
          attributes: ["CT_descrip_afec"],
        },
        {
          model: Riesgos,
          attributes: ["CT_descrip_riesgo"],
        },
        {
          model: Categorias,
          attributes: ["CT_descrip_categ"],
        },
      ],
    });
    const incidencias = incidencia.map(format_data);
    res.status(200).json({ incidencias });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: "Error al obtener las incidencias",
    });
  }
}

// Crear relacion Incidencia_Usuario
function creacion(Idusuario, cod_Incidencia) {
  try {
    Incidencia_Creada.create({
      id_usuario: Idusuario,
      cod_incidencia: cod_Incidencia,
    });
  } catch (error) {
    throw new Error("Error al crear la incidencia");
  }
}

// Crear relacion Incidencia_Asignada
function asignar(idusuario, cod_Incidencia) {
  try {
    Incidencia_Asignada.create({
      CT_cod_usuario: idusuario,
      CT_id_incidencia: cod_Incidencia,
    });
  } catch (error) {
    console.log(error);
    throw new Error("Error al asignar la incidencia");
  }
}

function format_data(incidencia) {
  return {
    CT_cod_incidencia: incidencia.CT_cod_incidencia,
    CT_titulo: incidencia.CT_titulo,
    CT_descrip: incidencia.CT_descripcion,
    CT_lugar: incidencia.CT_lugar,
    CT_Estado: incidencia.CT_Estado,
    CF_Fecha_Hora: incidencia.CF_Fecha_Hora,
    CT_Estado: incidencia.T_Estado
      ? incidencia.T_Estado.CT_descrip_estado
      : "Sin estado",
    CT_Prioridad: incidencia.T_Prioridade
      ? incidencia.T_Prioridade.CT_descrip_prioridad
      : "Sin prioridad",
    CT_Afectacion: incidencia.T_Afectacione
      ? incidencia.T_Afectacione.CT_descrip_afec
      : "Sin afectacion",
    CT_Categoria: incidencia.T_Categoria
      ? incidencia.T_Categoria.CT_descrip_categ
      : "Sin categoria",
    CT_Riesgo: incidencia.T_Riesgo
      ? incidencia.T_Riesgo.CT_descrip_riesgo
      : "Sin riesgo",
  };
}

module.exports = {
  crearIncidencias,
  obtenerIncidenciasAsignadas,
  obtenerIncidenciasCreadas,
  obtenerIncidencias,
  asignarIncidencia,
};
