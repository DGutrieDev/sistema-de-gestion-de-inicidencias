'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('T_Asignaciones', {
      CT_id_asignacion: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      CT_id_incidencia: {
        type: Sequelize.STRING(95),
        allowNull: false,
        references: {
          model: 'T_Incidencias',
          key: 'CT_cod_incidencia'
        }
      },
      CT_cod_usuario: {
        type: Sequelize.STRING(95),
        allowNull: false,
        references: {
          model: 'T_Usuarios',
          key: 'CT_cedula'
        }
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('T_Asignaciones');
  }
};

