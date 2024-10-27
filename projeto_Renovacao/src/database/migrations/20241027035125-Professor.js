'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // Método responsável pela aplicação da migração
  async up (queryInterface, Sequelize) {
    
    // Criação da tabela 'Professor' no banco de dados
    await queryInterface.createTable('Professor', {
      // Definição da coluna 'id_professor' como inteiro, auto-incrementável e chave primária
      id_professor:{
        type:Sequelize.INTEGER,
        autoIncrement:true,  // A coluna irá incrementar automaticamente
        allowNull:false,     // Não pode ser nula
        primaryKey:true      // Define como chave primária
      },
      // Definição da coluna 'nome' como string com tamanho máximo de 50 caracteres
      nome:{
        type:Sequelize.STRING(50),
        allowNull:false      // Não pode ser nula
      },
      // Definição da coluna 'cpf' como string com tamanho máximo de 25 caracteres
      cpf:{
        type:Sequelize.STRING(25),
        allowNull:false,     // Não pode ser nula
        unique:true          // Deve ser único no banco de dados
      },
      // Definição da coluna 'email' como string com tamanho máximo de 50 caracteres
      email:{
        type:Sequelize.STRING(50),
        allowNull:false,     // Não pode ser nula
        unique:true          // Deve ser único no banco de dados
      },
      // Definição da coluna 'senha' como string com tamanho máximo de 50 caracteres
      senha:{
        type:Sequelize.STRING(50),
        allowNull:false,     // Não pode ser nula
      },
      // Definição da coluna 'contato' como string com tamanho máximo de 50 caracteres
      contato:{
        type:Sequelize.STRING(50) // Pode ser nula, pois não há 'allowNull' definido
      },
      // Definição da coluna 'curso_id' como inteiro, com referência à tabela 'curso'
      curso_id:{
        type:Sequelize.INTEGER,
        allowNull:false,     // Não pode ser nula
        references:{
          model:'curso',     // Tabela referenciada
          key:'id'          // Chave primária da tabela referenciada
        },
        onDelete:'CASCADE',  // Quando um curso for deletado, o professor também será deletado
        onUpdate:'CASCADE'   // Atualizações na tabela de cursos refletem nesta tabela
      },
      // Definição da coluna 'instituicao_id' como inteiro, com referência à tabela 'instituicao'
      instituicao_id:{
        type:Sequelize.INTEGER,
        allowNull:false,     // Não pode ser nula
        references:{
          model:'instituicao' // Tabela referenciada
        },
        onDelete:'CASCADE',  // Quando uma instituição for deletada, o professor também será deletado
        onUpdate:'CASCADE'   // Atualizações na tabela de instituições refletem nesta tabela
      }
    });
    
  },

  // Método responsável pela reversão da migração
  async down (queryInterface, Sequelize) {
   
      // Deleção da tabela 'Professor' do banco de dados
      await queryInterface.dropTable('Professor');
     
  }
}
