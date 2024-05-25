'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('T_incidencia_imagen', {
      CN_cod_incidencia_imagen: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      CN_cod_incidencia: {
        type: Sequelize.STRING(95),
        allowNull: false,
        references: {
          model: 'T_Incidencias',
          key: 'CT_cod_incidencia'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      CN_cod_imagen: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'T_Imagenes',
          key: 'CN_cod_imagen'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('T_incidencia_imagen');
  }
};
