import { Model } from "sequelize"; // Importa a classe Model do Sequelize
import db from "."; // Importa a instância do banco de dados
import sequelize from "sequelize"; // Importa o Sequelize
import Instituicao from "./Instituicao"; // Importa o modelo Instituicao

// Define a classe Curso que estende Model
class Curso extends Model {
    declare id: number; // Declaração do atributo id como número
    declare nome: string; // Declaração do atributo nome como string
    declare instituicaoId: number; // Declaração do atributo instituicaoId como número
}

// Inicializa o modelo Curso com a configuração do Sequelize
Curso.init({
    id: {
        type: sequelize.INTEGER, // Tipo do atributo id como inteiro
        autoIncrement: true, // Atributo id autoincrementável
        allowNull: false, // O atributo id não pode ser nulo
        primaryKey: true // O atributo id é a chave primária
    },
    nome: {
        type: sequelize.STRING(70), // Tipo do atributo nome como string com limite de 70 caracteres
        allowNull: false // O atributo nome não pode ser nulo
    },
    instituicaoId: {
        type: sequelize.INTEGER, // Tipo do atributo instituicaoId como inteiro
        allowNull: false, // O atributo instituicaoId não pode ser nulo
        references: {
            model: 'instituicao', // Define a tabela referenciada como 'instituicao'
            key: 'id' // Chave referenciada na tabela 'instituicao'
        },
        onDelete: 'CASCADE', // Cascata na exclusão: se a instituição for deletada, os cursos também serão
        onUpdate: 'CASCADE' // Cascata na atualização: se a chave id da instituição for atualizada, os cursos também serão atualizados
    }
}, {
    sequelize: db, // Instância do banco de dados utilizada
    tableName: 'curso' // Nome da tabela no banco de dados
});

// Define o relacionamento de um para muitos entre Instituicao e Curso
Instituicao.hasMany(Curso, {
    foreignKey: 'instituicaoId', // Chave estrangeira no modelo Curso
    onDelete: 'CASCADE', // Cascata na exclusão
    onUpdate: 'CASCADE', // Cascata na atualização
    as: 'Cursos' // Alias para o relacionamento
});

// Define o relacionamento de muitos para um entre Curso e Instituicao
Curso.belongsTo(Instituicao, {
    foreignKey: 'instituicaoId', // Chave estrangeira no modelo Curso
    onDelete: 'CASCADE', // Cascata na exclusão
    onUpdate: 'CASCADE', // Cascata na atualização
    as: 'Instituicao' // Alias para o relacionamento
});

export default Curso; // Exporta o modelo Curso
