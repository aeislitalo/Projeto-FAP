import { Model, ModelStatic } from "sequelize"; // Importa a classe Model do Sequelize
import db from "."; // Importa a instância do banco de dados
import sequelize from "sequelize"; // Importa o Sequelize
import Demanda from "./Demanda"; // Importa o modelo Demanda

// Define a classe Empresa que estende Model
class Empresa extends Model {
    // Declaração dos campos do modelo
    declare id: number; // Identificador único da empresa
    declare nome: string; // Nome da empresa
    declare cnpj: string; // CNPJ da empresa
    declare pais: string; // País da empresa
    declare estado: string; // Estado da empresa
    declare cidade: string; // Cidade da empresa
    declare bairro: string; // Bairro da empresa
    declare numero: string; // Número da empresa
    declare rua: string; // Rua da empresa
    declare cep: string; // CEP da empresa
    declare email: string; // E-mail da empresa
    declare senha: string; // Senha da empresa
    declare contato: string; // Contato da empresa

    
}

// Inicializa o modelo Empresa
Empresa.init({
    id: {
        type: sequelize.INTEGER, // Tipo de dado para o ID
        autoIncrement: true, // O ID será gerado automaticamente
        allowNull: false, // Não permite valores nulos
        primaryKey: true // Define esta coluna como chave primária
    },
    nome: {
        type: sequelize.STRING(50), // Tipo de dado para o nome da empresa
        allowNull: false, // Não permite valores nulos
        unique: true // O nome deve ser único
    },
    cnpj: {
        type: sequelize.STRING(50), // Tipo de dado para o CNPJ da empresa
        allowNull: false, // Não permite valores nulos
        unique: true // O CNPJ deve ser único
    },
    pais: {
        type: sequelize.STRING(30), // Tipo de dado para o país da empresa
        allowNull: false // Não permite valores nulos
    },
    estado: {
        type: sequelize.STRING(30), // Tipo de dado para o estado da empresa
        allowNull: false // Não permite valores nulos
    },
    cidade: {
        type: sequelize.STRING(30), // Tipo de dado para a cidade da empresa
        allowNull: false // Não permite valores nulos
    },
    bairro: {
        type: sequelize.STRING(30), // Tipo de dado para o bairro da empresa
        allowNull: false // Não permite valores nulos
    },
    rua: {
        type: sequelize.STRING(30), // Tipo de dado para a rua da empresa
        allowNull: false // Não permite valores nulos
    },
    numero: {
        type: sequelize.STRING(15), // Tipo de dado para o número da empresa
        allowNull: false // Não permite valores nulos
    },
    cep: {
        type: sequelize.STRING(30), // Tipo de dado para o CEP da empresa
        allowNull: false // Não permite valores nulos
    },
    email: {
        type: sequelize.STRING(100), // Tipo de dado para o email da empresa
        allowNull: false, // Não permite valores nulos
        unique: true // O email deve ser único
    },
    senha: {
        type: sequelize.STRING(30), // Tipo de dado para a senha da empresa
        allowNull: false, // Não permite valores nulos
    },
    contato: {
        type: sequelize.STRING(30), // Tipo de dado para o contato da empresa
        allowNull: false // Não permite valores nulos
    }
}, {
    sequelize: db, // Passa a instância do banco de dados
    tableName: 'empresa', // Define o nome da tabela no banco de dados
});

// Exporta o modelo Empresa
export default Empresa;
