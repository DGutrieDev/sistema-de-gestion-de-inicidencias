const { DataTypes } = require("sequelize");
const sequelize = require("../../sequelize_config");

const Imagenes = sequelize.define("T_Imagenes", {
    CT_cod_imagen: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    CI_imagen: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, { timestamps: false,
    tableName: "T_Imagenes"
 });

module.exports = Imagenes;