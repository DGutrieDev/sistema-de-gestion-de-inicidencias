const { DataTypes } = require("sequelize");
const sequelize = require("../../sequelize_config");

const Afectacion = sequelize.define("T_Afectacion", {
    CT_cod_afectacion: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    CT_descrip_afec: {
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

module.exports = Afectacion;