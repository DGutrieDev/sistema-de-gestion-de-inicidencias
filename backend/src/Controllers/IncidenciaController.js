const sequelize = require("../../sequelize_config");
const Incidencias = require("../Models/Incidencias");
const Incidencia_Usuario = require("../models/Incidencias_creadas");
const Incidencia_Asignada = require("../models/Incidencias_asignadas");
const usuarios = require("../models/Usuarios");
const estados = require("../Models/Estados");
const prioridad = require("../Models/Prioridades");

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
    const user = await usuarios.findByPk(usuario);
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
    const { id_incidencia, id_usuario } = req.body;
    if (!id_incidencia || !id_usuario) {
      return res.status(400).json({
        error: true,
        message: "Faltan datos para asignar la incidencia",
      });
    }
    asignar(id_usuario, id_incidencia);
    const incidencia = await Incidencias.findByPk(id_incidencia);
    const user = await usuarios.findByPk(id_usuario);
    EmailAsignacion(
      user.CT_usuario_institucional,
      incidencia.CT_cod_incidencia,
      `${user.CT_nombre} ${user.CT_apellidoUno} ${user.CT_apellidoDos}`,
      incidencia.CT_titulo
    );
    res.status(200).json({ error: false, message: "Incidencia asignada" });
  } catch (error) {
    res
      .status(500)
      .json({ error: true, message: "Error al asignar la incidencia" });
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
    await Incidencia_Usuario.findAll({
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
    const incidencias = await Incidencias.findAll({
      attributes: ['CT_cod_incidencia', 'CT_titulo', 'CT_descrip', 'CT_lugar', 'CT_Estado', 'CF_Fecha_Hora'],
      include:[
        {
          model: estados,
          attributes: ["CT_descrip_estado"]
        },
        {
          model: prioridad,
          attributes: ["CT_descrip_prioridad"]
        }
      ]
    });
    res.status(200).json({ error: false, message: "Incidencias obtenidas", incidencias});
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Error al obtener las incidencias",
    });
  }
}

// Crear relacion Incidencia_Usuario
function creacion(Idusuario, cod_Incidencia) {
  try {
    Incidencia_Usuario.create({
      id_usuario: Idusuario,
      cod_incidencia: cod_Incidencia,
    });
  } catch (error) {
    throw new Error("Error al crear la incidencia");
  }
}

// Crear relacion Incidencia_Asignada
function asignar(Idusuario, cod_Incidencia) {
  try {
    Incidencia_Asignada.create({
      id_usuario: Idusuario,
      cod_incidencia: cod_Incidencia,
    });
  } catch (error) {
    throw new Error("Error al asignar la incidencia");
  }
}

module.exports = {
  crearIncidencias,
  obtenerIncidenciasAsignadas,
  obtenerIncidenciasCreadas,
  obtenerIncidencias,
  asignarIncidencia,
};
