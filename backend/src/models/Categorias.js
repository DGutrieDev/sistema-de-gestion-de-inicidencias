const { DataTypes } = require("sequelize");
const sequelize = require("../../sequelize_config");

const Categorias = sequelize.define("T_Categoria", {
    CT_cod_categoria: {
        type: DataTypes.STRING,
        allowNull: false
    },
    CT_descrip_categ: {
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

module.exports = Categorias;