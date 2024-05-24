'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('T_Roles', {
      CT_id_Rol: {
        type: Sequelize.STRING(95),
        primaryKey: true
      },
      CT_desc_rol: {
        type: Sequelize.STRING(95),
        allowNull: false
      },      CT_nombre_sistema: {
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
    await queryInterface.dropTable('T_Roles');
  }
};