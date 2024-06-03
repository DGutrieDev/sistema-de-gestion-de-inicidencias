const { DataTypes } = require("sequelize");
const sequelize = require("../../sequelize_config");

const Incidencias = sequelize.define(
  "T_Incidencias",
  {
    CT_cod_incidencia: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    CT_titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CT_descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CT_lugar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CF_Fecha_Hora: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    CN_Costo: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    CT_Justificacion_cierre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    CF_Fecha_Estimada: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { timestamps: false }
);

module.exports = Incidencias;
