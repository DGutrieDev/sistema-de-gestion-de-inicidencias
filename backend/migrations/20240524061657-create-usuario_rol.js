'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('T_usuario_rol', {
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
      CT_cod_Usuario: {
        type: Sequelize.STRING(95),
        allowNull: false,
        references: {
          model: 'T_Usuarios',
          key: 'CT_cedula'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });

    await queryInterface.addConstraint('T_usuario_rol', {
      fields: ['CT_id_Rol', 'CT_cod_Usuario'],
      type: 'primary key',
      name: 'pk_T_usuario_rol'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('T_usuario_rol');
  }
};
