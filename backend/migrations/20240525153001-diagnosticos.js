'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('T_Diagnostico', {
      CT_cod_diagnostico: {
        type: Sequelize.STRING(95),
        allowNull: false,
        primaryKey: true
      },
      CT_observaciones: {
        type: Sequelize.STRING(95),
        allowNull: false
      },
      CT_tiempo_estimado: {
        type: Sequelize.STRING(95),
        allowNull: false
      },
      CT_diagnostico: {
        type: Sequelize.TEXT,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('T_Diagnostico');
  }
};
