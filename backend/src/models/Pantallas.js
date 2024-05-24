const { DataTypes } = require("sequelize");
const sequelize = require("../../sequelize_config");

const Pantallas = sequelize.define(
  "T_Pantallas",
  {
    CT_cod_Pantalla: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CT_Desc_Pantalla: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = Pantallas;
