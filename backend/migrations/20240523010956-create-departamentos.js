"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("T_Departamentos", {
      CT_id_Departamento: {
        type: Sequelize.STRING(95),
        primaryKey: true,
        allowNull: false,
      },
      CT_nombre_dep: {
        type: Sequelize.STRING(95),
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("T_Departamentos");
  },
};
