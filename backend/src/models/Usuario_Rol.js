const { DataTypes } = require("sequelize");
const sequelize = require("../../sequelize_config");
const Usuarios = require("./Usuarios"); // Importar el modelo Usuarios
const Roles = require("./Roles"); // Importar el modelo Roles

const UsuarioRol = sequelize.define(
    "T_rol_usuarios",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        CT_id_usuario: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: Usuarios,
                key: "CT_cedula",
            },
        },
        CT_cod_Rol: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: Roles,
                key: "CT_id_Rol",
            },
        }
    },
    { timestamps: false }
);

Usuarios.hasMany(UsuarioRol, {
    foreignKey: "CT_id_usuario",
    sourceKey: "CT_cedula",
});
UsuarioRol.belongsTo(Usuarios, {
    foreignKey: "CT_id_usuario",
    targetKey: "CT_cedula",
});

Roles.hasMany(UsuarioRol, {
    foreignKey: "CT_cod_Rol",
    sourceKey: "CT_id_Rol",
});
UsuarioRol.belongsTo(Roles, {
    foreignKey: "CT_cod_Rol",
    targetKey: "CT_id_Rol",
});

module.exports = UsuarioRol;
