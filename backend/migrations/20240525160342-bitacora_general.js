'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('T_Bitacora_General', {
      CT_cod_Bitacora: {
        type: Sequelize.STRING(95),
        allowNull: false,
        primaryKey: true
      },
      CT_referencia: {
        type: Sequelize.STRING(95),
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('T_Bitacora_General');
  }
};
