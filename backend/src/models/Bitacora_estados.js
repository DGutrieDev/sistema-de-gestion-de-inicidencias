const { DataTypes } = require("sequelize");
const sequelize = require("../../sequelize_config");
const Usuarios = require("./Usuarios");
const Estados = require("./Estados");


const Bitacora_estados = sequelize.define(
    "T_bitacora_estados",
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
        CT_id_estado: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: Estados,
                key: "CT_cod_estado",
            },
        },
        CT_id_estado_anterior: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: Estados,
                key: "CT_cod_estado",
            },
        },
        CT_logs: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },{ timestamps: false, tableName: "T_bitacora_estados" }
)

Usuarios.hasMany(Bitacora_estados, {
    foreignKey: "CT_id_usuario",
    sourceKey: "CT_cedula",
});

Bitacora_estados.belongsTo(Usuarios, {
    foreignKey: "CT_id_usuario",
    targetKey: "CT_cedula",
});

Estados.hasMany(Bitacora_estados, {
    foreignKey: "CT_id_estado",
    sourceKey: "CT_cod_estado",
});

Bitacora_estados.belongsTo(Estados, {
    foreignKey: "CT_id_estado",
    targetKey: "CT_cod_estado",
});

module.exports = Bitacora_estados;