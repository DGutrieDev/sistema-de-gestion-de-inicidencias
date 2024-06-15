const sequelize = require("../../sequelize_config");
const Incidencia = require("../models/Incidencias");
const UsuarioIncidenciaCreacion = require("../models/Incidencias_creadas");
const IncidenciaAsignada = require("../models/Incidencias_asignadas");
const Usuario = require("../models/Usuarios");
const Estado = require("../models/Estados");
const { codIncidencias } = require("../utils/Codes");
const { EmailAsignacion, IncidenciaRegistrada } = require("../utils/Emails");

async function crearIncidencias(req, res) {
  try {
    const val = await Incidencia.count();
    const { usuario, titulo, descrip, lugar } = req.body;
    if (!usuario || !titulo || !descrip || !lugar) {
      return res.status(400).json({ Mensaje: "Faltan campos requeridos" });
    }
    const usuarioExistente = await Usuario.findByPk(usuario);
    const IncidenciaCreada = await Incidencia.create({
      CT_cod_incidencia: codIncidencias(val+1),
      CT_titulo: titulo,
      CT_descripcion: descrip,
      CT_lugar: lugar,
      CT_Estado: "1",
      CF_Fecha_Hora: new Date(),
    });
    await UsuarioIncidenciaCreacion.create({
      CT_cod_incidencia: IncidenciaCreada.CT_cod_incidencia,
      CT_id_usuario: usuario,
    });
    IncidenciaRegistrada(
      usuarioExistente.CT_usuario_institucional,
      IncidenciaCreada.CT_cod_incidencia,
      `${usuarioExistente.CT_nombre} ${usuarioExistente.CT_apellidoUno} ${usuarioExistente.CT_apellidoDos}`,
      IncidenciaCreada.CT_titulo
    );
    res.status(201).json({ Mensaje: "Incidencia creada", IncidenciaCreada });
  } catch (err) {
    res
      .status(500)
      .json({ Mensaje: "Error al crear la incidencia", error: err.message });
  }
}

async function obtenerIncidenciaSinAsignar(req, res) {
  try {
    const incidencias = await Incidencia.findAll({
      where: {
        CT_Estado: "1",
      },
    });
    res.status(200).json(incidencias);
  } catch (err) {
    res.status(500).json({
      Mensaje: "Error al obtener las incidencias",
      error: err.message,
    });
  }
}

async function obtenerIncidencias(req, res) {
  try {
    const incidencias = await Incidencia.findAll({
      attributes: [
        "CT_cod_incidencia",
        "CT_titulo",
        "CT_descripcion",
        "CT_lugar",
        "CF_Fecha_Hora",
      ],
      include: [
        {
          model: Estado,
          attributes: ["CT_descrip_estado"],
          where: {
            CT_cod_estado: sequelize.col("T_Incidencias.CT_Estado"),
          },
        },
        {
          model: UsuarioIncidenciaCreacion,
          attributes: ["CT_id_usuario"],
          include: {
            model: Usuario,
          },
        },
        {
          model: IncidenciaAsignada,
          attributes: ["CT_cod_usuario"],
          include: {
            model: Usuario,
          },
        },
      ],
    });
    const formattedIncidencias = incidencias.map((incidencia) => {
      return {
        CT_cod_incidencia: incidencia.CT_cod_incidencia,
        CT_titulo: incidencia.CT_titulo,
        CT_descripcion: incidencia.CT_descripcion,
        CT_lugar: incidencia.CT_lugar,
        CF_Fecha_Hora: incidencia.CF_Fecha_Hora,
        CT_Estado: incidencia.T_Estado.CT_descrip_estado,
        T_Usuario_Creacion_Incidencias:
          incidencia.T_Usuario_Creacion_Incidencias.map((usuario) => ({
            CT_cedula: usuario.T_Usuario.CT_cedula,
            CT_nombre: usuario.T_Usuario.CT_nombre,
            CT_apellidoUno: usuario.T_Usuario.CT_apellidoUno,
            CT_apellidoDos: usuario.T_Usuario.CT_apellidoDos,
          })),
        T_Asignaciones: incidencia.T_Asignaciones.map((asignacion) => ({
          CT_cedula: asignacion.T_Usuario.CT_cedula,
          CT_nombre: asignacion.T_Usuario.CT_nombre,
          CT_apellidoUno: asignacion.T_Usuario.CT_apellidoUno,
          CT_apellidoDos: asignacion.T_Usuario.CT_apellidoDos,
        })),
      };
    });
    res.status(200).json(formattedIncidencias);
  } catch (err) {
    res.status(500).json({
      Mensaje: "Error al obtener las incidencias",
      error: err.message,
    });
  }
}

async function obtenerIncidenciaUsuario(req, res) {
  try {
    const { usuario } = req.params;
    const result = await UsuarioIncidenciaCreacion.findAll({
      where: {
        CT_id_usuario: usuario,
      },
    });
    if (result.length > 0) {
      const codsIncidencias = result.map(
        (incidencia) => incidencia.CT_cod_incidencia
      );
      const incidencias = await Incidencia.findAll({
        where: {
          CT_cod_incidencia: codsIncidencias,
        },
      });
      res.status(200).json(incidencias);
    } else {
      res.status(404).json({
        Mensaje: `No se encontraron incidencias para el usuario ${usuario}`,
      });
    }
  } catch (err) {
    res.status(500).json({
      Mensaje: "Error al obtener las incidencias",
      error: err.message,
    });
  }
}

async function obtenerIncidenciaAsignada(req, res) {
  try {
    const { usuario } = req.params;
    const result = await IncidenciaAsignada.findAll({
      where: {
        CT_cod_usuario: usuario,
      },
    });
    if (result.length > 0) {
      const codsIncidencias = result.map(
        (incidencia) => incidencia.CT_id_incidencia
      );
      const incidencias = await Incidencia.findAll({
        where: {
          CT_cod_incidencia: codsIncidencias,
        },
      });
      res.status(200).json(incidencias);
    } else {
      res.status(404).json({
        Mensaje: `No se encontraron incidencias asignadas para el usuario ${usuario}`,
      });
    }
  } catch (err) {
    res.status(500).json({
      Mensaje: "Error al obtener las incidencias asignadas",
      error: err.message,
    });
  }
}

async function obtenerIncidenciaReparacion(req, res) {
  try {
    const { usuario } = req.params;
    const result = await IncidenciaAsignada.findAll({
      where: {
        CT_cod_usuario: usuario,
      },
    });
    if (result.length > 0) {
      const codsIncidencias = result.map(
        (incidencia) => incidencia.CT_cod_incidencia
      );
      const incidencias = await Incidencia.findAll({
        where: {
          CT_cod_incidencia: codsIncidencias,
        },
        where: {
          CT_Estado: "4",
        },
      });
      res.status(200).json(incidencias);
    } else {
      res.status(404).json({
        Mensaje: `No se encontraron incidencias para el usuario ${usuario}`,
      });
    }
  } catch (err) {
    res.status(500).json({
      Mensaje: "Error al obtener las incidencias",
      error: err.message,
    });
  }
}

async function asignarIncidencias(req, res) {
  try {
    const { usuario, incidencia, riesgo, prioridad, afectacion, categoria } =
      req.body;
    if (!usuario || !incidencia) {
      return res.status(400).json({ Mensaje: "Faltan campos requeridos" });
    }
    const usuarioExistente = await Usuario.findByPk(usuario);
    const incidenciaExistente = await Incidencia.findByPk(incidencia);
    if (!usuarioExistente || !incidenciaExistente) {
      return res
        .status(404)
        .json({ Mensaje: "Usuario o incidencia no encontrados" });
    }
    const incidenciaAsignadaExistente = await IncidenciaAsignada.findOne({
      where: {
        CT_cod_usuario: usuario,
        CT_id_incidencia: incidencia,
      },
    });
    if (incidenciaAsignadaExistente) {
      return res
        .status(400)
        .json({ Mensaje: "Incidencia ya asignada a ese usuario" });
    }
    const incidenciaAsignada = await IncidenciaAsignada.create({
      CT_id_incidencia: incidencia,
      CT_cod_usuario: usuario,
    });
    await Incidencia.update(
      {
        CT_Estado: "4",
        CT_Prioridad: prioridad,
        CT_Riesgo: riesgo,
        CT_Afectacion: afectacion,
        CT_Categoria: categoria,
      },
      {
        where: {
          CT_cod_incidencia: incidencia,
        },
      }
    );
    EmailAsignacion(
      usuarioExistente.CT_usuario_institucional,
      `${usuarioExistente.CT_nombre} ${usuarioExistente.CT_apellidoUno} ${usuarioExistente.CT_apellidoDos}`,
      `${incidenciaExistente.CT_cod_incidencia} ${incidenciaExistente.CT_titulo}`
    );
    res
      .status(201)
      .json({ Mensaje: "Incidencia asignada", incidenciaAsignada });
  } catch (err) {
    res
      .status(500)
      .json({ Mensaje: "Error al asignar la incidencia", error: err.message });
  }
}

module.exports = {
  crearIncidencias,
  asignarIncidencias,
  obtenerIncidencias,
  obtenerIncidenciaUsuario,
  obtenerIncidenciaAsignada,
  obtenerIncidenciaReparacion,
  obtenerIncidenciaSinAsignar,
};
