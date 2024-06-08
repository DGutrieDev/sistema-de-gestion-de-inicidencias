'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('T_Prioridades', {
      CT_cod_prioridad: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      CT_descrip_prioridad: {
        type: Sequelize.STRING,
        allowNull: false
      },
      CT_nombre_sistema: {
        type: Sequelize.STRING,
        defaultValue: 'SGI'
      },
      CN_Activo: {
        type: Sequelize.STRING,
        defaultValue: '1'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('T_Prioridades');
  }
};
