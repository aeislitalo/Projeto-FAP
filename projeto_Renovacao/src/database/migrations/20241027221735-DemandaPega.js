'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('DemandaPega', {

      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      descricao: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING(35)
      },
      data_demanda_pega: {
        type: Sequelize.DATE,
        allowNull: false
      },
      data_ultima_atualizacao: {
        type: Sequelize.DATE,
        allowNull: false
      },
      data_entrega: {
        type: Sequelize.DATE,
      },
      demanda_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'demanda',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      professor_id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Professor',
          key:'id_professor'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }


    });
  },

  async down (queryInterface, Sequelize) {
   
      await queryInterface.dropTable('DemandaPega');
    
  }
};
