'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('T_Roles', {
      CT_id_Rol: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      CT_desc_rol: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      CT_nombre_sistema: {
        type: Sequelize.STRING,
      },
      CN_Activo: {
        type: Sequelize.STRING,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('T_Roles');
  }
};
