'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('T_Pantallas_Bitacora', {
      CT_cod_Pantalla: {
        type: Sequelize.STRING(95),
        allowNull: false,
        references: {
          model: 'T_Pantallas',
          key: 'CT_cod_Pantalla'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      CT_cod_Bitacora: {
        type: Sequelize.STRING(95),
        allowNull: false,
        references: {
          model: 'T_Bitacora_General',
          key: 'CT_cod_Bitacora'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('T_Pantallas_Bitacora');
  }
};