"use strict";
// Cria uma configuração para a conexão com o banco de dados
let config = {
    username: "root", // Nome de usuário do banco de dados
    password: "123456", // Senha do banco de dados
    database: "database_Re9_Acao", // Nome do banco de dados
    host: "localhost", // Endereço do host do banco de dados
    dialect: "mysql", // Tipo de banco de dados (MySQL neste caso)
    define: {
        timestamps: false, // Desabilita a adição automática de timestamps (createdAt, updatedAt) nas tabelas
        underscored: true, // Define que os nomes das colunas serão em formato snake_case
    }
};
module.exports = config;
//# sourceMappingURL=config_database.js.map