'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('T_Pantallas', {
      CT_cod_Pantalla: {
        type: Sequelize.STRING(95),
        allowNull: false,
        primaryKey: true
      },
      CT_Desc_Pantalla: {
        type: Sequelize.STRING(95),
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('T_Pantallas');
  }
};