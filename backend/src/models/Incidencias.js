const { DataTypes } = require("sequelize");
const sequelize = require("../../sequelize_config");

const Afectacion = require("./Afectacion");
const Riesgo = require('./Riesgos');
const Estado = require('./Estados');
const Categoria = require('./Categorias');
const Prioridad = require('./Prioridades');

const Incidencias = sequelize.define(
  "T_Incidencias",
  {
    CT_cod_inicidencia: {
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
    CT_Prioridad: {
      allowNull: true,
      references: {
        model: Prioridad,
        key: "CT_cod_prioridad"
      }
    },
    CT_Afectacion: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: Afectacion,
        key: "CT_cod_afectacion"
      }
    },
    CT_Estado: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: Estado,
        key: "CT_cod_estado"
      }
    }, CT_Categoria: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: Categoria,
        key: "CT_cod_categoria"
      }
    },
    CT_Riesgo: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: Riesgo,
        key: "CT_cod_riesgo"
      }
    }
  },
  { timestamps: false }
);

Incidencias.hasOne(Riesgo, { foreignKey: "CT_cod_riesgo" });
Incidencias.hasOne(Afectacion, { foreignKey: "CT_cod_afectacion" });
Incidencias.hasOne(Categoria, { foreignKey: "CT_cod_categoria" });
Incidencias.hasOne(Estado, { foreignKey: "CT_cod_estado" });
Incidencias.hasOne(Prioridad, { foreignKey: "CT_cod_prioridad" });

module.exports = Incidencias;
