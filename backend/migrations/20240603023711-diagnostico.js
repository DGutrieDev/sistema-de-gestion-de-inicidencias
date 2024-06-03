'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('T_Diagnosticos', {
      CT_cod_diagnostico: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
      },
      CT_observaciones: {
        type: Sequelize.STRING,
        allowNull: false
      },
      CT_tiempo_estimado: {
        type: Sequelize.STRING,
        allowNull: false
      },
      CT_diagnostico: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      CT_Requiere_Compra: {
        type: Sequelize.STRING,
        allowNull: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('T_Diagnosticos');
  }
};