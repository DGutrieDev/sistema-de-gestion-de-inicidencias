const { DataTypes } = require("sequelize");
const sequelize = require("../../sequelize_config");

const Imagenes = sequelize.define("T_Imagenes", {
    CN_cod_imagen: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    CI_imagen: {
        type: DataTypes.BLOB,
        allowNull: false
    }
}, { timestamps: false });

module.exports = Imagenes;