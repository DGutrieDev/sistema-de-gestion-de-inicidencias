const { DataTypes } = require("sequelize");
const sequelize = require("../../sequelize_config");

const Riesgos = sequelize.define("T_Riesgos", {
    CT_cod_riesgo: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    CT_descrip_riesgo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    CT_nombre_sistema: {
        type: DataTypes.STRING,
        defaultValue: 'SGI'
    },
    CN_Activo: {
        type: DataTypes.STRING,
        defaultValue: '1'
    }
}, { timestamps: false, tableName: "T_Riesgos" });

module.exports = Riesgos;