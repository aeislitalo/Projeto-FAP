'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // Função que será chamada ao aplicar a migração
  async up (queryInterface, Sequelize) {
    // Cria a tabela 'Demanda'
    await queryInterface.createTable('Demanda', {
      id: {
        type: Sequelize.INTEGER, // Tipo de dado para o ID
        autoIncrement: true, // O ID será gerado automaticamente
        primaryKey: true, // Define esta coluna como chave primária
        allowNull: false // Não permite valores nulos
      },
      descricao: {
        type: Sequelize.TEXT, // Tipo de dado para a descrição da demanda
        allowNull: false // Não permite valores nulos
      },
      data_envio: {
        type: Sequelize.DATE, // Tipo de dado para a data de envio
        allowNull: false // Não permite valores nulos
      },
      data_final: {
        type: Sequelize.DATE, // Tipo de dado para a data final da demanda
        allowNull: false // Não permite valores nulos
      },
      empresa_id: {
        type: Sequelize.INTEGER, // Tipo de dado para o ID da empresa
        allowNull: false, // Não permite valores nulos
        references: {
          model: 'empresa', // Referencia a tabela 'empresa'
          key: 'id' // Chave estrangeira que faz referência ao ID da empresa
        },
        onDelete: 'CASCADE', // Deleta as demandas relacionadas se a empresa for deletada
        onUpdate: 'CASCADE' // Atualiza as demandas relacionadas se o ID da empresa for atualizado
      },
      titulo: {
        type: Sequelize.STRING(50), // Tipo de dado para o título da demanda
        allowNull: false, // Não permite valores nulos
        unique: true // O título deve ser único
      }
    });
  },

  // Função que será chamada ao reverter a migração
  async down (queryInterface, Sequelize) {
    // Deleta a tabela 'Demanda'
    await queryInterface.dropTable('Demanda');
  }
};
