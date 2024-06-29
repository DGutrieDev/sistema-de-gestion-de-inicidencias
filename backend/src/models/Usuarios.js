const { DataTypes } = require("sequelize");
const sequelize = require("../../sequelize_config");
const Departamentos = require("./Departamentos");

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
      allowNull: false,
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
    CT_departamento: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: Departamentos,
        key: "CT_id_Departamento",
      },
    },
    CT_Token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    tableName: "T_Usuarios"
  }
);

Usuarios.belongsTo(Departamentos, {
  foreignKey: "CT_departamento",
  targetKey: "CT_id_Departamento",
});

Departamentos.hasMany(Usuarios, {
  foreignKey: "CT_departamento",
  sourceKey: "CT_id_Departamento",
});

module.exports = Usuarios;
