"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize"); // Importa a classe Model do Sequelize
const _1 = __importDefault(require(".")); // Importa a instância do banco de dados
const sequelize_2 = __importDefault(require("sequelize")); // Importa o Sequelize
// Define a classe Empresa que estende Model
class Empresa extends sequelize_1.Model {
    // Método estático para preencher os dados da empresa
    static preencherDados(empresaDados) {
        return {
            nome: empresaDados.nome, // Recebe o nome da empresa
            cnpj: empresaDados.cnpj, // Recebe o CNPJ da empresa
            pais: empresaDados.pais, // Recebe o país da empresa
            estado: empresaDados.estado, // Recebe o estado da empresa
            cidade: empresaDados.cidade, // Recebe a cidade da empresa
            bairro: empresaDados.bairro, // Recebe o bairro da empresa
            rua: empresaDados.rua, // Recebe a rua da empresa
            numero: empresaDados.numero, // Recebe o número da empresa
            cep: empresaDados.cep, // Recebe o CEP da empresa
            email: empresaDados.email, // Recebe o email da empresa
            senha: empresaDados.senha, // Recebe a senha da empresa
            contato: empresaDados.contato, // Recebe o contato da empresa
        };
    }
}
// Inicializa o modelo Empresa
Empresa.init({
    id: {
        type: sequelize_2.default.INTEGER, // Tipo de dado para o ID
        autoIncrement: true, // O ID será gerado automaticamente
        allowNull: false, // Não permite valores nulos
        primaryKey: true // Define esta coluna como chave primária
    },
    nome: {
        type: sequelize_2.default.STRING(50), // Tipo de dado para o nome da empresa
        allowNull: false, // Não permite valores nulos
        unique: true // O nome deve ser único
    },
    cnpj: {
        type: sequelize_2.default.STRING(50), // Tipo de dado para o CNPJ da empresa
        allowNull: false, // Não permite valores nulos
        unique: true // O CNPJ deve ser único
    },
    pais: {
        type: sequelize_2.default.STRING(30), // Tipo de dado para o país da empresa
        allowNull: false // Não permite valores nulos
    },
    estado: {
        type: sequelize_2.default.STRING(30), // Tipo de dado para o estado da empresa
        allowNull: false // Não permite valores nulos
    },
    cidade: {
        type: sequelize_2.default.STRING(30), // Tipo de dado para a cidade da empresa
        allowNull: false // Não permite valores nulos
    },
    bairro: {
        type: sequelize_2.default.STRING(30), // Tipo de dado para o bairro da empresa
        allowNull: false // Não permite valores nulos
    },
    rua: {
        type: sequelize_2.default.STRING(30), // Tipo de dado para a rua da empresa
        allowNull: false // Não permite valores nulos
    },
    numero: {
        type: sequelize_2.default.STRING(15), // Tipo de dado para o número da empresa
        allowNull: false // Não permite valores nulos
    },
    cep: {
        type: sequelize_2.default.STRING(30), // Tipo de dado para o CEP da empresa
        allowNull: false // Não permite valores nulos
    },
    email: {
        type: sequelize_2.default.STRING(100), // Tipo de dado para o email da empresa
        allowNull: false, // Não permite valores nulos
        unique: true // O email deve ser único
    },
    senha: {
        type: sequelize_2.default.STRING(30), // Tipo de dado para a senha da empresa
        allowNull: false, // Não permite valores nulos
    },
    contato: {
        type: sequelize_2.default.STRING(30), // Tipo de dado para o contato da empresa
        allowNull: false // Não permite valores nulos
    }
}, {
    sequelize: _1.default, // Passa a instância do banco de dados
    tableName: 'empresa', // Define o nome da tabela no banco de dados
});
exports.default = Empresa; // Exporta o modelo Empresa
