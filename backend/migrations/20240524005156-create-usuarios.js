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
      CT_Departamento: {
        type: Sequelize.STRING(95),
        allowNull: false,
        references: {
          model: 'T_Departamentos',
          key: 'CT_id_Departamento'
        }
      },
      CT_puesto: {
        type: Sequelize.STRING(95),
        allowNull: false
      }
    });

    await queryInterface.addConstraint('T_Usuarios', {
      fields: ['CT_Departamento'],
      type: 'foreign key',
      name: 'fk_CT_Departamento_T_Usuarios',
      references: {
        table: 'T_Departamentos',
        field: 'CT_id_Departamento'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('T_Usuarios');
  }
};
