const { DataTypes } = require("sequelize");
const sequelize = require("../../sequelize_config");

const Diagnostico = sequelize.define("T_Diagnosticos", {
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
    },
    CT_Requiere_Compra:{
        type: DataTypes.STRING,
        allowNull: true
    }
}, { timestamps: false,
    tableName: "T_Diagnosticos"
 });

module.exports = Diagnostico;