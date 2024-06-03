'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('T_Incidencias', {
      CT_cod_incidencia: {
        type: Sequelize.STRING(95),
        primaryKey: true,
        allowNull: false,
      },
      CT_titulo: {
        type: Sequelize.STRING(95),
        allowNull: false,
      },
      CT_descripcion: {
        type: Sequelize.STRING(95),
        allowNull: false,
      },
      CT_lugar: {
        type: Sequelize.STRING(95),
        allowNull: false,
      },
      CF_Fecha_Hora: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      CN_Costo: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      CT_Justificacion_cierre: {
        type: Sequelize.STRING(95),
        allowNull: true,
      },
      CF_Fecha_Estimada: {
        type: Sequelize.STRING(95),
        allowNull: true,
      }
    }, {
      engine: 'InnoDB'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('T_Incidencias');
  }
};