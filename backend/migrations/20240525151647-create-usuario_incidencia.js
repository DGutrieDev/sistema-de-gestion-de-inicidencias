'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('T_usuario_crear_incidencia', {
      id_usuario: {
        type: Sequelize.STRING(95),
        allowNull: false,
        references: {
          model: 'T_Usuarios',
          key: 'CT_cedula'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      id_incidencia: {
        type: Sequelize.STRING(95),
        allowNull: false,
        references: {
          model: 'T_Incidencias',
          key: 'CT_cod_incidencia'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('T_usuario_crear_incidencia');
  }
};
