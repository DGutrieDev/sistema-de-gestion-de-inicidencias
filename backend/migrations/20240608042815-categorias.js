'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('T_Categorias', {
      CT_cod_categoria: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      CT_descrip_categ: {
        type: Sequelize.STRING,
        allowNull: false
      },
      CT_nombre_sistema: {
        type: Sequelize.STRING,
        defaultValue: 'SGI'
      },
      CN_Activo: {
        type: Sequelize.STRING,
        defaultValue: '1'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('T_Categorias');
  }
};