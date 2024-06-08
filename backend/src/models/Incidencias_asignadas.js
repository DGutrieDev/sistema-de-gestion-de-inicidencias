const { DataTypes } = require("sequelize");
const sequelize = require("../../sequelize_config");
const Incidencias = require("./Incidencias");
const Usuarios = require("./Usuarios");

const Incidencias_asignadas = sequelize.define('T_Asignaciones', {
    CT_id_asignacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    CT_id_incidencia: {
        type: DataTypes.STRING(95),
        allowNull: false,
        references: {
            model: 'T_Incidencias',
            key: 'CT_cod_incidencia'
        }
    },
    CT_cod_usuario: {
        type: DataTypes.STRING(95),
        allowNull: false,
        references: {
            model: 'T_Usuarios',
            key: 'CT_cedula'
        }
    }
},{timestamps: false}
);

Usuarios.hasMany(Incidencias_asignadas, {
    foreignKey: 'CT_cod_usuario',
    sourceKey: 'CT_cedula'
});

Incidencias_asignadas.belongsTo(Usuarios, {
    foreignKey: 'CT_cod_usuario',
    targetKey: 'CT_cedula'
});

Incidencias.hasMany(Incidencias_asignadas, {
    foreignKey: 'CT_id_incidencia',
    sourceKey: 'CT_cod_incidencia'
});

Incidencias_asignadas.belongsTo(Incidencias, {
    foreignKey: 'CT_id_incidencia',
    targetKey: 'CT_cod_incidencia'
});

module.exports = Incidencias_asignadas;