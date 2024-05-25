const { DataTypes } = require("sequelize");
const sequelize = require("../../sequelize_config");

const Diagnostico = sequelize.define("T_Diagnostico", {
    CT_cod_diagnostico: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    CT_observaciones: {
        type: DataTypes.STRING,
        allowNull: false
    },
    CT_tiempo_estimado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    CT_diagnostico: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, { timestamps: false });

module.exports = Diagnostico;