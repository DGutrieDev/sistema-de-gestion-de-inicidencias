'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('T_Usuarios', {
      CT_cedula: {
        type: Sequelize.STRING(95),
        primaryKey: true,
        allowNull: false
      },
      CT_nombre: {
        type: Sequelize.STRING(95),
        allowNull: false
      },
      CT_apellidoUno: {
        type: Sequelize.STRING(95),
        allowNull: false
      },
      CT_apellidoDos: {
        type: Sequelize.STRING(95),
        allowNull: false
      },
      CT_contraseña: {
        type: Sequelize.STRING(95),
        allowNull: false
      },
      CT_usuario_institucional: {
        type: Sequelize.STRING(95),
        allowNull: true,
        unique: true
      },
      CT_puesto: {
        type: Sequelize.STRING(95),
        allowNull: false
      }
    },
    {
      engine: 'InnoDB'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('T_Usuarios');
  }
};
