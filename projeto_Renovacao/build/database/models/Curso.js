"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize"); // Importa a classe Model do Sequelize
const _1 = __importDefault(require(".")); // Importa a instância do banco de dados
const sequelize_2 = __importDefault(require("sequelize")); // Importa o Sequelize
const Instituicao_1 = __importDefault(require("./Instituicao")); // Importa o modelo Instituicao
// Define a classe Curso que estende Model
class Curso extends sequelize_1.Model {
}
// Inicializa o modelo Curso com a configuração do Sequelize
Curso.init({
    id: {
        type: sequelize_2.default.INTEGER, // Tipo do atributo id como inteiro
        autoIncrement: true, // Atributo id autoincrementável
        allowNull: false, // O atributo id não pode ser nulo
        primaryKey: true // O atributo id é a chave primária
    },
    nome: {
        type: sequelize_2.default.STRING(70), // Tipo do atributo nome como string com limite de 70 caracteres
        allowNull: false // O atributo nome não pode ser nulo
    },
    instituicaoId: {
        type: sequelize_2.default.INTEGER, // Tipo do atributo instituicaoId como inteiro
        allowNull: false, // O atributo instituicaoId não pode ser nulo
        references: {
            model: 'instituicao', // Define a tabela referenciada como 'instituicao'
            key: 'id' // Chave referenciada na tabela 'instituicao'
        },
        onDelete: 'CASCADE', // Cascata na exclusão: se a instituição for deletada, os cursos também serão
        onUpdate: 'CASCADE' // Cascata na atualização: se a chave id da instituição for atualizada, os cursos também serão atualizados
    }
}, {
    sequelize: _1.default, // Instância do banco de dados utilizada
    tableName: 'curso' // Nome da tabela no banco de dados
});
// Define o relacionamento de um para muitos entre Instituicao e Curso
Instituicao_1.default.hasMany(Curso, {
    foreignKey: 'instituicaoId', // Chave estrangeira no modelo Curso
    onDelete: 'CASCADE', // Cascata na exclusão
    onUpdate: 'CASCADE', // Cascata na atualização
    as: 'Cursos' // Alias para o relacionamento
});
// Define o relacionamento de muitos para um entre Curso e Instituicao
Curso.belongsTo(Instituicao_1.default, {
    foreignKey: 'instituicaoId', // Chave estrangeira no modelo Curso
    onDelete: 'CASCADE', // Cascata na exclusão
    onUpdate: 'CASCADE', // Cascata na atualização
    as: 'Instituicao' // Alias para o relacionamento
});
exports.default = Curso; // Exporta o modelo Curso
//# sourceMappingURL=Curso.js.map