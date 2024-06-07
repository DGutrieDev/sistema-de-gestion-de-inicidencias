const { DataTypes } = require("sequelize");
const sequelize = require("../../sequelize_config");
const Incidencias = require("./Incidencias");
const Usuarios = require("./Usuarios");

const Usuario_Incidencia_Creacion = sequelize.define(
    "T_Usuario_Creacion_Incidencias",
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
                model: 'T_Usuarios',
                key: 'CT_cedula'
            }
        }, 
        CT_cod_incidencia: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'T_Incidencias',
                key: 'CT_cod_incidencia'
            }
        }
    }, 
    { timestamps: false }
);

Usuarios.hasMany(Usuario_Incidencia_Creacion, {
    foreignKey: "CT_id_usuario",
    sourceKey: "CT_cedula",
});
Usuario_Incidencia_Creacion.belongsTo(Usuarios, {
    foreignKey: "CT_id_usuario",
    targetKey: "CT_cedula",
});

Incidencias.hasMany(Usuario_Incidencia_Creacion, {
    foreignKey: "CT_cod_incidencia",
    sourceKey: "CT_cod_incidencia",
});
Usuario_Incidencia_Creacion.belongsTo(Incidencias, {
    foreignKey: "CT_cod_incidencia",
    targetKey: "CT_cod_incidencia",
});

module.exports = Usuario_Incidencia_Creacion;