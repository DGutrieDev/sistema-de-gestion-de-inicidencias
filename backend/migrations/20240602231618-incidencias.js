'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('T_Incidencias', {
      CT_cod_incidencia: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      CT_titulo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      CT_descripcion: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      CT_lugar: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      CF_Fecha_Hora: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      CN_Costo: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      CT_Justificacion_cierre: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      CF_Fecha_Estimada: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      CT_Estado: {
        type: Sequelize.STRING,
        allowNull: true,
        references: {
          model: 'T_Estados',
          key: 'CT_cod_estado',
        },
      },
      CT_Prioridad: {
        type: Sequelize.STRING,
        allowNull: true,
        references: {
          model: 'T_Prioridades',
          key: 'CT_cod_Prioridad',
        },
      },
      CT_Riesgo: {
        type: Sequelize.STRING,
        allowNull: true,
        references: {
          model: 'T_Riesgos',
          key: 'CT_cod_Riesgo',
        },
      },
      CT_Categoria: {
        type: Sequelize.STRING,
        allowNull: true,
        references: {
          model: 'T_Categorias',
          key: 'CT_cod_Categoria',
        },
      },
      CT_Afectacion: {
        type: Sequelize.STRING,
        allowNull: true,
        references: {
          model: 'T_Afectaciones',
          key: 'CT_cod_Afectacion',
        },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('T_Incidencias');
  }
};