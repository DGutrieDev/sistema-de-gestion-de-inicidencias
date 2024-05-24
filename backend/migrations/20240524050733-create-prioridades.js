'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('T_Prioridades', {
      CT_cod_prioridad: {
        type: Sequelize.STRING(95),
        allowNull: false,
        primaryKey: true
      },
      CT_descrip_prioridad: {
        type: Sequelize.STRING(95),
        allowNull: false
      },
      CT_nombre_sistema: {
        type: Sequelize.STRING(95),
        allowNull: true
      },
      CN_Activo: {
        type: Sequelize.STRING(95),
        allowNull: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('T_Prioridades');
  }
};