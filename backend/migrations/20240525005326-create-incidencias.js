'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('T_Incidencias', {
      CT_cod_incidencia: {
        type: Sequelize.STRING(95),
        primaryKey: true,
        allowNull: false,
      },
      CT_titulo: {
        type: Sequelize.STRING(95),
        allowNull: false,
      },
      CT_descripcion: {
        type: Sequelize.STRING(95),
        allowNull: false,
      },
      CT_lugar: {
        type: Sequelize.STRING(95),
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
        type: Sequelize.STRING(95),
        allowNull: true,
      },
      CF_Fecha_Estimada: {
        type: Sequelize.STRING(95),
        allowNull: true,
      },
      CT_Prioridad: {
        type: Sequelize.STRING(95),
        allowNull: true,
        references: {
          model: 'T_Prioridades',
          key: 'CT_cod_prioridad'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      CT_Afectacion: {
        type: Sequelize.STRING(95),
        allowNull: true,
        references: {
          model: 'T_Afectacion',
          key: 'CT_cod_afectacion'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      CT_Estado: {
        type: Sequelize.STRING(95),
        allowNull: true,
        references: {
          model: 'T_Estados',
          key: 'CT_cod_estado'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      CT_Categoria: {
        type: Sequelize.STRING(95),
        allowNull: true,
        references: {
          model: 'T_Categorias',
          key: 'CT_cod_categoria'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      CT_Riesgo: {
        type: Sequelize.STRING(95),
        allowNull: true,
        references: {
          model: 'T_Riesgos',
          key: 'CT_cod_riesgo'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('T_Incidencias');
  }
};