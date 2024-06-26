const { DataTypes } = require("sequelize");
const sequelize = require("../../sequelize_config");

const Afectacion = sequelize.define("T_Afectaciones", {
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
        type: DataTypes.STRING,
        defaultValue: 'SGI'
    },
    CN_Activo: {
        type: DataTypes.STRING,
        defaultValue: '1'
    }
}, { timestamps: false,
    tableName: "T_Afectaciones"
 });

module.exports = Afectacion;