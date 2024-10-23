'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // Função que será chamada ao aplicar a migração
  async up (queryInterface, Sequelize) {
    // Cria a tabela 'Empresa'
    await queryInterface.createTable('Empresa', {
      id: {
        type: Sequelize.INTEGER, // Tipo de dado para o ID
        autoIncrement: true, // O ID será gerado automaticamente
        allowNull: false, // Não permite valores nulos
        primaryKey: true // Define esta coluna como chave primária
      },
      nome: {
        type: Sequelize.STRING(50), // Tipo de dado para o nome da empresa
        allowNull: false, // Não permite valores nulos
        unique: true // O nome deve ser único
      },
      cnpj: {
        type: Sequelize.STRING(50), // Tipo de dado para o CNPJ da empresa
        allowNull: false, // Não permite valores nulos
        unique: true // O CNPJ deve ser único
      },
      pais: {
        type: Sequelize.STRING(30), // Tipo de dado para o país
        allowNull: false // Não permite valores nulos
      },
      estado: {
        type: Sequelize.STRING(30), // Tipo de dado para o estado
        allowNull: false // Não permite valores nulos
      },
      cidade: {
        type: Sequelize.STRING(30), // Tipo de dado para a cidade
        allowNull: false // Não permite valores nulos
      },
      bairro: {
        type: Sequelize.STRING(30), // Tipo de dado para o bairro
        allowNull: false // Não permite valores nulos
      },
      rua: {
        type: Sequelize.STRING(30), // Tipo de dado para a rua
        allowNull: false // Não permite valores nulos
      },
      numero: {
        type: Sequelize.STRING(15), // Tipo de dado para o número da casa
        allowNull: false // Não permite valores nulos
      },
      cep: {
        type: Sequelize.STRING(30), // Tipo de dado para o CEP
        allowNull: false // Não permite valores nulos
      },
      email: {
        type: Sequelize.STRING(100), // Tipo de dado para o email
        allowNull: false, // Não permite valores nulos
        unique: true // O email deve ser único
      },
      senha: {
        type: Sequelize.STRING(30), // Tipo de dado para a senha
        allowNull: false, // Não permite valores nulos
      },
      contato: {
        type: Sequelize.STRING(30), // Tipo de dado para o contato
        allowNull: false // Não permite valores nulos
      }
    });
  },

  // Função que será chamada ao reverter a migração
  async down (queryInterface, Sequelize) {
    // Deleta a tabela 'Empresa'
    await queryInterface.dropTable('Empresa');
  }
};
