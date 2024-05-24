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
        allowNull: false
    },
    CT_nombre_sistema: {
        type: DataTypes.STRING
    },
    CN_Activo: {
        type: DataTypes.STRING,
    }
}, { timestamps: false });

module.exports = Riesgos;