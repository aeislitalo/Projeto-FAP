'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Curso', {
      id: {
        type: Sequelize.INTEGER, // Tipo do atributo id como inteiro
        autoIncrement: true, // Atributo id autoincrementável
        allowNull: false, // O atributo id não pode ser nulo
        primaryKey: true // O atributo id é a chave primária
      },
      nome: {
        type: Sequelize.STRING, // Tipo do atributo nome como string
        allowNull: false // O atributo nome não pode ser nulo
      },
      instituicao_id: {
        type: Sequelize.INTEGER, // Tipo do atributo instituicao_id como inteiro
        allowNull: false, // O atributo instituicao_id não pode ser nulo
        references: {
          model: 'instituicao', // Define a tabela referenciada como 'instituicao'
          key: 'id' // Chave referenciada na tabela 'instituicao'
        },
        onDelete: 'CASCADE', // Cascata na exclusão: se a instituição for deletada, o curso também será deletado
        onUpdate: 'CASCADE' // Cascata na atualização: se a chave id da instituição for atualizada, o curso também será atualizado
      }
    });
  },

  async down (queryInterface, Sequelize) {
   
      await queryInterface.dropTable('Curso');
     
  }
};
