'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('T_Categorias', {
      CT_cod_categoria: {
        type: Sequelize.STRING(95),
        allowNull: false,
        primaryKey: true
      },
      CT_descrip_categ: {
        type: Sequelize.STRING(125),
        allowNull: false
      },
      CT_nombre_sistema: {
        type: Sequelize.STRING(95),
        allowNull: true
      },
      CN_Activo: {
        type: Sequelize.STRING(95),
        allowNull: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('T_Categorias');
  }
};
