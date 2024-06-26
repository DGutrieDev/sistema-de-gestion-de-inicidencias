const { DataTypes } = require("sequelize");
const sequelize = require("../../sequelize_config");
const Usuarios = require("./Usuarios");
const Pantallas = require("./Pantallas");


const Bitacora_acciones = sequelize.define(
    "T_bitacora_acciones",
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
        CT_id_Pantalla: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: Pantallas,
                key: "CT_cod_Pantalla",
            },
        },
        CT_logs: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },{ timestamps: false, tableName: "T_bitacora_acciones" }
);

Usuarios.hasMany(Bitacora_acciones, {
    foreignKey: "CT_id_usuario",
    sourceKey: "CT_cedula",
});

Bitacora_acciones.belongsTo(Usuarios, {
    foreignKey: "CT_id_usuario",
    targetKey: "CT_cedula",
});

Pantallas.hasMany(Bitacora_acciones, {
    foreignKey: "CT_cod_pantalla",
    sourceKey: "CT_cod_Pantalla",
});

Bitacora_acciones.belongsTo(Pantallas, {
    foreignKey: "CT_cod_pantalla",
    targetKey: "CT_cod_Pantalla",
});

module.exports = Bitacora_acciones;