'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('rol_pantalla', {
      CT_id_Rol: {
        type: Sequelize.STRING(95),
        allowNull: false,
        references: {
          model: 'T_Roles',
          key: 'CT_id_Rol'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      CT_cod_Pantalla: {
        type: Sequelize.STRING(95),
        allowNull: false,
        references: {
          model: 'T_Pantallas',
          key: 'CT_cod_Pantalla'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('rol_pantalla');
  }
};
