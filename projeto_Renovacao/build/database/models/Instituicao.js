"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize"); // Importa a classe Model do Sequelize
const _1 = __importDefault(require(".")); // Importa a instância do banco de dados
const sequelize_2 = __importDefault(require("sequelize")); // Importa o Sequelize
class Instituicao extends sequelize_1.Model {
}
Instituicao.init({
    id: {
        type: sequelize_2.default.INTEGER, // Tipo de dado para o ID
        autoIncrement: true, // O ID será gerado automaticamente
        allowNull: false, // Não permite valores nulos
        primaryKey: true // Define esta coluna como chave primária
    },
    nome: {
        type: sequelize_2.default.STRING(50), // Tipo de dado para o nome da Instituição
        allowNull: false, // Não permite valores nulos
        unique: true // O nome deve ser único
    },
    cnpj: {
        type: sequelize_2.default.STRING(50), // Tipo de dado para o CNPJ da Instituição
        allowNull: false, // Não permite valores nulos
        unique: true // O CNPJ deve ser único
    },
    pais: {
        type: sequelize_2.default.STRING(30), // Tipo de dado para o país da Instituição
        allowNull: false // Não permite valores nulos
    },
    estado: {
        type: sequelize_2.default.STRING(30), // Tipo de dado para o estado da Instituição
        allowNull: false // Não permite valores nulos
    },
    cidade: {
        type: sequelize_2.default.STRING(30), // Tipo de dado para a cidade da Instituição
        allowNull: false // Não permite valores nulos
    },
    bairro: {
        type: sequelize_2.default.STRING(30), // Tipo de dado para o bairro da Instituição
        allowNull: false // Não permite valores nulos
    },
    rua: {
        type: sequelize_2.default.STRING(30), // Tipo de dado para a rua da Instituição
        allowNull: false // Não permite valores nulos
    },
    numero: {
        type: sequelize_2.default.STRING(15), // Tipo de dado para o número da Instituição
        allowNull: false // Não permite valores nulos
    },
    cep: {
        type: sequelize_2.default.STRING(30), // Tipo de dado para o CEP da Instituição
        allowNull: false // Não permite valores nulos
    },
    email: {
        type: sequelize_2.default.STRING(100), // Tipo de dado para o email da Instituição
        allowNull: false, // Não permite valores nulos
        unique: true // O email deve ser único
    },
    senha: {
        type: sequelize_2.default.STRING(30), // Tipo de dado para a senha da Instituição
        allowNull: false, // Não permite valores nulos
    },
    contato: {
        type: sequelize_2.default.STRING(30), // Tipo de dado para o contato da Instituição
        allowNull: false // Não permite valores nulos
    }
}, {
    sequelize: _1.default, // Passa a instância do banco de dados
    tableName: 'instituicao', // Define o nome da tabela no banco de dados
});
exports.default = Instituicao; // Exporta o modelo Instituição
//# sourceMappingURL=Instituicao.js.map