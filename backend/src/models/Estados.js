const { DataTypes } = require("sequelize");
const sequelize = require("../../sequelize_config");

const Estados = sequelize.define("T_Estados", {
    CT_cod_estado: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    CT_descrip_estado: {
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

module.exports = Estados;