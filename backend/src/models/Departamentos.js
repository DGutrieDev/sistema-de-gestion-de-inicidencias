const { DataTypes } = require("sequelize");
const sequelize = require("../../sequelize_config");

const Departamentos = sequelize.define(
  "T_Departamentos",
  {
    CT_id_Departamento: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    CT_nombre_dep: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false,
    tableName: "T_Departamentos"
   }
);

module.exports = Departamentos;
