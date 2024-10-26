import { Model } from "sequelize"; // Importa a classe Model do Sequelize
import db from "."; // Importa a instância do banco de dados
import sequelize from "sequelize"; // Importa o Sequelize
import Instituicao from "./Instituicao"; // Importa o modelo Instituicao

// Define a classe Curso que estende Model
class Curso extends Model {
    // Método não implementado para o relacionamento com Instituicao (removeria esse método)
    Instituicao(Instituicao: any) {
        throw new Error("Method not implemented.");
    }
    
    // Declarações de atributos da classe Curso com tipos definidos
    declare id: number; // Declaração do atributo id como número
    declare nome: string; // Declaração do atributo nome como string
    declare instituicaoId: number; // Declaração do atributo instituicaoId como número

    // Método estático assíncrono para visualizar os Cursos de uma instituição
    static async visualizarCursos(idInstituicao: number) {
        // Busca uma instituição no banco de dados utilizando o método 'findByPk' (find by primary key)
        // O 'include' permite trazer os cursos associados à instituição através do relacionamento
        let cursos = await Instituicao.findByPk(idInstituicao, {
            include: [
                {
                    model: this, // O model atual ('Curso') é incluído como parte da consulta
                    as: 'Cursos' // Define o alias 'Cursos' para o relacionamento, já definido no modelo
                }
            ]
        });

        // Verifica se a instituicao foi encontrada, caso contrário, lança um erro
        if (!cursos) {
            throw new Error('Instituicao não encontrada'); // Lança um erro se a instituicao não existir
        }

        // Retorna a instituicao encontrada com seus Cursos associadas
        return cursos;
    }

    // Método estático assíncrono para visualizar a Instituição associada a um curso
    static async visualizarInstituicaoCurso(idCurso: number) {
        let instituicao = await this.findByPk(idCurso, {
            include: [
                {
                    model: Instituicao, // Inclui o modelo Instituicao na consulta
                    as: 'Instituicao' // Define o alias 'Instituicao' para o relacionamento
                }
            ]
        });
        
        // Verifica se o curso foi encontrado, caso contrário, lança um erro
        if (!instituicao) {
            throw new Error('Curso não encontrado'); // Lança um erro se o curso não existir
        }
        
        return instituicao; // Retorna a instituição encontrada associada ao curso
    }
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
