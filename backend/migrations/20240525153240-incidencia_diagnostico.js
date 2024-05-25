'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('T_Incidencias_Diagnostico', {
      CT_cod_inicidencia: {
        type: Sequelize.STRING(95),
        allowNull: false,
        references: {
          model: 'T_Incidencias',
          key: 'CT_cod_incidencia'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      CT_cod_diagnostico: {
        type: Sequelize.STRING(95),
        allowNull: false,
        references: {
          model: 'T_Diagnostico',
          key: 'CT_cod_diagnostico'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      CT_cedula: {
        type: Sequelize.STRING(95),
        allowNull: false,
        references: {
          model: 'T_Usuarios',
          key: 'CT_cedula'
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
    await queryInterface.dropTable('T_Incidencias_Diagnostico_Usuario');
  }
};
