const { DataTypes } = require("sequelize");
const sequelize = require("../../sequelize_config");
const Incidencia = require("./Incidencias");
const Imagen = require("./Imagenes");
const Diagnostico = require("./Diagnosticos");

const Imagen_Incidencia = sequelize.define(
    "T_incidencia_imagen", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        CT_cod_imagen: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Imagen,
                key: "CT_cod_imagen",
            },
        },
        CT_cod_incidencia: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Incidencia,
                key: "CT_cod_incidencia",
            },
        },
        CT_cod_diagnostico: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Diagnostico,
                key: "CT_cod_diagnostico",
            },
        },
    }, {
        timestamps: false,
        tableName: "T_incidencia_imagenes",
    }
);

Imagen.hasMany(Imagen_Incidencia, {
    foreignKey: "CT_cod_imagen",
    sourceKey: "CT_cod_imagen",
});

Imagen_Incidencia.belongsTo(Imagen, {
    foreignKey: "CT_cod_imagen",
    targetKey: "CT_cod_imagen",
});

Incidencia.hasMany(Imagen_Incidencia, {
    foreignKey: "CT_cod_incidencia",
    sourceKey: "CT_cod_incidencia",
});

Imagen_Incidencia.belongsTo(Incidencia, {
    foreignKey: "CT_cod_incidencia",
    targetKey: "CT_cod_incidencia",
});

Diagnostico.hasMany(Imagen_Incidencia, {
    foreignKey: "CT_cod_diagnostico",
    sourceKey: "CT_cod_diagnostico",
});

Imagen_Incidencia.belongsTo(Diagnostico, {
    foreignKey: "CT_cod_diagnostico",
    targetKey: "CT_cod_diagnostico",
});

Imagen_Incidencia.sync();


module.exports = Imagen_Incidencia;