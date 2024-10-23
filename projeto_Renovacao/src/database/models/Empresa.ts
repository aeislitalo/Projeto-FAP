import { Model, ModelStatic } from "sequelize"; // Importa a classe Model do Sequelize
import db from "."; // Importa a instância do banco de dados
import sequelize from "sequelize"; // Importa o Sequelize
import EmpresaRequestDTO from "../../dto/EmpresaInstituicaoRequestDTO";

// Define a classe Empresa que estende Model
class Empresa extends Model {

    declare id: number; // Declaração do campo id
    declare nome: string; // Declaração do campo nome
    declare cnpj: string; // Declaração do campo cnpj
    declare pais: string; // Declaração do campo pais
    declare estado: string; // Declaração do campo estado
    declare cidade: string; // Declaração do campo cidade
    declare bairro: string; // Declaração do campo bairro
    declare numero: string; // Declaração do campo numero
    declare rua: string; // Declaração do campo rua
    declare cep: string; // Declaração do campo cep
    declare email: string; // Declaração do campo email
    declare senha: string; // Declaração do campo senha
    declare contato: string; // Declaração do campo contato

    // Método estático para preencher os dados da empresa
    static preencherDados(empresaDados:EmpresaRequestDTO) {
        return {
            nome: empresaDados.getNome(), // Recebe o nome da empresa
            cnpj: empresaDados.getCnpj(), // Recebe o CNPJ da empresa
            pais: empresaDados.getPais(), // Recebe o país da empresa
            estado: empresaDados.getEstado(), // Recebe o estado da empresa
            cidade: empresaDados.getCidade(), // Recebe a cidade da empresa
            bairro: empresaDados.getBairro(), // Recebe o bairro da empresa
            rua: empresaDados.getRua(), // Recebe a rua da empresa
            numero: empresaDados.getNumero(), // Recebe o número da empresa
            cep: empresaDados.getCep(), // Recebe o CEP da empresa
            email: empresaDados.getEmail(), // Recebe o email da empresa
            senha: empresaDados.getSenha(), // Recebe a senha da empresa
            contato: empresaDados.getContato(), // Recebe o contato da empresa
        };

    }
    





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

export default Empresa; // Exporta o modelo Empresa
