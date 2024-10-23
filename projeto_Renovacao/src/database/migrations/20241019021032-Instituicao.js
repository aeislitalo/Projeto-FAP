'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Instituicao',{
      id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
      },
      nome:{
        type:Sequelize.STRING(30),
        allowNull:false,
        unique:true
      },
      cnpj:{
        type:Sequelize.STRING(30),
        allowNull:false,
        unique:true
      },
      
      estado: {
        type: Sequelize.STRING(30), 
        allowNull: false 
      },
      pais:{
        type: Sequelize.STRING(30),
        allowNull: false
      },
      cidade: {
        type: Sequelize.STRING(30), 
        allowNull: false 
      },
      bairro: {
        type: Sequelize.STRING(30), 
        allowNull: false 
      },
      rua: {
        type: Sequelize.STRING(30), 
        allowNull: false 
      },
      numero: {
        type: Sequelize.STRING(15), 
        allowNull: false 
      },
      cep: {
        type: Sequelize.STRING(30), 
        allowNull: false 
      },
      email: {
        type: Sequelize.STRING(100), 
        allowNull: false, 
        unique: true 
      },
      senha: {
        type: Sequelize.STRING(30), 
        allowNull: false, 
      },
      contato: {
        type: Sequelize.STRING(30), 
        allowNull: false 
      }
     });
  },

  async down (queryInterface, Sequelize) {
   
     await queryInterface.dropTable('Instituicao');
    
  }
};
