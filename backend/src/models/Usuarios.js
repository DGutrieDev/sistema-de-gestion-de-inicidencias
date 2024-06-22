const { DataTypes } = require("sequelize");
const sequelize = require("../../sequelize_config");

const Usuarios = sequelize.define(
  "T_Usuarios",
  {
    CT_cedula: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    CT_nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CT_apellidoUno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CT_apellidoDos: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CT_contraseña: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CT_usuario_institucional: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    CT_puesto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CT_numero_telefono: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    CT_Token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { timestamps: false }
);

module.exports = Usuarios;
