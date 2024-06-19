const { DataTypes } = require("sequelize");
const sequelize = require("../../sequelize_config");
const Estados = require("./Estados");
const Prioridades = require("./Prioridades");
const Riesgos = require("./Riesgos");
const Categorias = require("./Categorias");
const Afectaciones = require("./Afectacion");

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
    CT_Estado: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: "T_Estados",
        key: "CT_cod_estado",
      },
    },
    CT_Prioridad: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: "T_Prioridades",
        key: "CT_cod_prioridad",
      },
    },
    CT_Riesgo: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: "T_Riesgos",
        key: "CT_cod_riesgo",
      },
    },
    CT_Categoria: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: "T_Categorias",
        key: "CT_cod_categoria",
      },
    },
    CT_Afectacion: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: "T_Afectaciones",
        key: "CT_cod_afectacion",
      },
    },
  },
  { timestamps: false }
);

Incidencias.belongsTo(Estados, {
  foreignKey: "CT_Estado",
  targetKey: "CT_cod_estado",
});

Incidencias.belongsTo(Prioridades, {
  foreignKey: "CT_Prioridad",
  targetKey: "CT_cod_prioridad",
});

Incidencias.belongsTo(Riesgos, {
  foreignKey: "CT_Riesgo",
  targetKey: "CT_cod_riesgo",
});

Incidencias.belongsTo(Categorias, {
  foreignKey: "CT_Categoria",
  targetKey: "CT_cod_categoria",
});

Incidencias.belongsTo(Afectaciones, {
  foreignKey: "CT_Afectacion",
  targetKey: "CT_cod_afectacion",
});

module.exports = Incidencias;
