'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('T_Afectacion', {
      CT_cod_afectacion: {
        type: Sequelize.STRING(95),
        allowNull: false,
        primaryKey: true
      },
      CT_descrip_afec: {
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
    await queryInterface.dropTable('T_Afectacion');
  }
};
