import { Model } from "sequelize"; // Importa a classe Model do Sequelize para definir o modelo
import db from "."; // Importa a instância do banco de dados
import sequelize from "sequelize"; // Importa o Sequelize para usar os tipos de dados
import Instituicao from "./Instituicao"; // Importa o modelo Instituicao
import DTOHelper from "../../utils/DTOHelp"; // Importa o helper para transformação de dados (DTOs)

// Define a classe Curso que estende a Model do Sequelize
class Curso extends Model {

    // Declarações de atributos da classe Curso com tipos definidos
    declare id: number; // Declaração do atributo id como um número
    declare nome: string; // Declaração do atributo nome como uma string
    declare instituicaoId: number; // Declaração do atributo instituicaoId como um número
    declare instituicao: Instituicao; // Declaração do relacionamento com a Instituição

    // Método estático assíncrono para visualizar os Cursos de uma instituição
    static async visualizarCursos(idInstituicao: number) {
        // Busca uma instituição no banco de dados pelo ID, incluindo os cursos associados através do relacionamento
        let instituicao = await Instituicao.findByPk(idInstituicao, {
            include: [
                {
                    model: this, // Inclui o modelo atual (Curso) na consulta
                    as: 'Cursos' // Define o alias 'Cursos' para o relacionamento, conforme definido no modelo
                }
            ]
        });

        // Verifica se a instituição foi encontrada, caso contrário, lança um erro
        if (!instituicao) {
            throw new Error('Instituição não encontrada'); // Lança um erro se a instituição não existir
        }

        // Retorna a instituição encontrada com seus cursos associados
        return { 
            instituicao: DTOHelper.getInstituicoesDto(instituicao), 
            cursos: DTOHelper.getCursosListaDTO(instituicao.getDataValue('Cursos')) 
        };
    }

    // Método estático assíncrono para visualizar a Instituição associada a um curso
    static async visualizarInstituicaoCurso(idCurso: number) {
        let curso = await this.findByPk(idCurso, {
            include: [
                {
                    model: Instituicao, // Inclui o modelo Instituicao na consulta
                    as: 'Instituicao' // Define o alias 'Instituicao' para o relacionamento, conforme definido no modelo
                }
            ]
        });

        // Verifica se o curso foi encontrado, caso contrário, lança um erro
        if (!curso) {
            throw new Error('Curso não encontrado'); // Lança um erro se o curso não existir
        }
        
        // Retorna a instituição associada ao curso encontrado
        return { 
            curso: DTOHelper.getCursosDTO(curso), 
            instituicao: DTOHelper.getInstituicoesDto(curso.getDataValue('Instituicao')) 
        };
    }
}

// Inicializa o modelo Curso com a configuração do Sequelize
Curso.init({
    id: {
        type: sequelize.INTEGER, // Define o tipo do atributo id como inteiro
        autoIncrement: true, // Define que o atributo id é auto-incrementável
        allowNull: false, // O atributo id não pode ser nulo
        primaryKey: true // Define o atributo id como chave primária
    },
    nome: {
        type: sequelize.STRING(70), // Define o tipo do atributo nome como string com limite de 70 caracteres
        allowNull: false // O atributo nome não pode ser nulo
    },
    instituicaoId: {
        type: sequelize.INTEGER, // Define o tipo do atributo instituicaoId como inteiro
        allowNull: false, // O atributo instituicaoId não pode ser nulo
        references: {
            model: 'instituicao', // Define a tabela referenciada como 'instituicao'
            key: 'id' // Define a chave referenciada na tabela 'instituicao'
        },
        onDelete: 'CASCADE', // Aplica exclusão em cascata: se a instituição for deletada, os cursos também serão
        onUpdate: 'CASCADE' // Aplica atualização em cascata: se a chave id da instituição for atualizada, os cursos também serão atualizados
    }
}, {
    sequelize: db, // Usa a instância do banco de dados
    tableName: 'curso' // Define o nome da tabela no banco de dados
});

// Define o relacionamento de um-para-muitos entre Instituicao e Curso
Instituicao.hasMany(Curso, {
    foreignKey: 'instituicaoId', // Define a chave estrangeira no modelo Curso
    onDelete: 'CASCADE', // Aplica exclusão em cascata
    onUpdate: 'CASCADE', // Aplica atualização em cascata
    as: 'Cursos' // Define o alias para o relacionamento
});

// Define o relacionamento de muitos-para-um entre Curso e Instituicao
Curso.belongsTo(Instituicao, {
    foreignKey: 'instituicaoId', // Define a chave estrangeira no modelo Curso
    onDelete: 'CASCADE', // Aplica exclusão em cascata
    onUpdate: 'CASCADE', // Aplica atualização em cascata
    as: 'Instituicao' // Define o alias para o relacionamento
});

export default Curso; // Exporta o modelo Curso
