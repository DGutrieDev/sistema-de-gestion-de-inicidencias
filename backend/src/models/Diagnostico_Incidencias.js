const {DataTypes} = require('sequelize');
const sequelize = require('../../sequelize_config');
const Diagnostico = require('./Diagnosticos');
const Incidencia = require('./Incidencias');
const Usuario = require('./Usuarios');

const Diagnostico_Incidencias = sequelize.define('T_Diagnostico_Incidencias', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    CT_cod_incidencia:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    CT_cod_diagnostico:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    CT_id_usuario:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    CT_cod_imagen:{
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {timestamps: false});

Usuario.hasMany(Diagnostico_Incidencias, {
    foreignKey: 'CT_id_usuario',
    sourceKey: 'CT_cedula',
});

Diagnostico.hasMany(Diagnostico_Incidencias, {
    foreignKey: 'CT_cod_diagnostico',
    sourceKey: 'CT_cod_diagnostico',
});

Incidencia.hasMany(Diagnostico_Incidencias, {
    foreignKey: 'CT_cod_incidencia',
    sourceKey: 'CT_cod_incidencia',
});

Diagnostico_Incidencias.belongsTo(Usuario, {
    foreignKey: 'CT_id_usuario',
    targetKey: 'CT_cedula',
});

Diagnostico_Incidencias.belongsTo(Diagnostico, {
    foreignKey: 'CT_cod_diagnostico',
    targetKey: 'CT_cod_diagnostico',
});

Diagnostico_Incidencias.belongsTo(Incidencia, {
    foreignKey: 'CT_cod_incidencia',
    targetKey: 'CT_cod_incidencia',
});

module.exports = Diagnostico_Incidencias;