const { DataTypes } = require("sequelize");
const sequelize = require("../../sequelize_config");

const Departamentos = require('./Departamentos');

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
    CT_Departamento: {
      type: DataTypes.STRING,
      allowNull: false,
      references:{
        model: Departamentos,
        key: "CT_id_Departamento"
      }
    },
    CT_puesto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

Usuarios.hasOne(Departamentos,{foreignKey: "CT_id_Departamento"});

module.exports = Usuarios;
