const { DataTypes } = require("sequelize");
const sequelize = require("../../sequelize_config");

const Roles = sequelize.define(
  "T_Roles",
  {
    CT_id_Rol: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    CT_desc_rol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CT_nombre_sistema: {
        type: DataTypes.STRING
    },
    CN_Activo: {
        type: DataTypes.STRING,
    }
  },
  { timestamps: false, tableName: "T_Roles"}
);

module.exports = Roles;
