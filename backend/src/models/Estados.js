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
        type: DataTypes.STRING,
        defaultValue: 'SGI'
    },
    CN_Activo: {
        type: DataTypes.STRING,
        defaultValue: '1'
    }
}, { timestamps: false,
    tableName: "T_Estados"
 });

module.exports = Estados;