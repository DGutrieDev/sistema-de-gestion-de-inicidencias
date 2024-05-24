const { DataTypes } = require("sequelize");
const sequelize = require("../../sequelize_config");

const Prioridades = sequelize.define("T_Prioridad", {
    CT_cod_prioridad: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    CT_descrip_prioridad: {
        type: DataTypes.STRING,
        allowNull: false
    },
    CT_nombre_sistema: {
        type: DataTypes.STRING
    },
    CN_Activo: {
        type: DataTypes.STRING,
    }
}, { timestamps: false });

module.exports = Prioridades;