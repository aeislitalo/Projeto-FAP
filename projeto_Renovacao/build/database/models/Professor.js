"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const sequelize_2 = __importDefault(require("sequelize"));
const Instituicao_1 = __importDefault(require("./Instituicao"));
const Curso_1 = __importDefault(require("./Curso"));
const DTOHelp_1 = __importDefault(require("../../utils/DTOHelp"));
class Professor extends sequelize_1.Model {
    static async visualizarCursos(idProfessor) {
        let professor = await this.findByPk(idProfessor, {
            include: [
                {
                    model: Curso_1.default, // O model atual ('Demanda') é incluído como parte da consulta
                    as: 'Curso' // Define o alias 'demandas' para o relacionamento, já definido no modelo
                }
            ]
        });
        // Verifica se a empresa foi encontrada, caso contrário, lança um erro
        if (!professor) {
            throw new Error('Cursos não encontrados'); // Lança um erro se a empresa não existir
        }
        // Retorna a empresa encontrada com suas demandas associadas
        return { professor: DTOHelp_1.default.getProfessorDTO(professor), curso: DTOHelp_1.default.getCursosDTO(professor.getDataValue('Curso')) };
    }
    static async visualizarInstituicao(idProfessor) {
        let professor = await this.findByPk(idProfessor, {
            include: [
                {
                    model: Instituicao_1.default, // O model atual ('Demanda') é incluído como parte da consulta
                    as: 'Instituicao' // Define o alias 'demandas' para o relacionamento, já definido no modelo
                }
            ]
        });
        // Verifica se a empresa foi encontrada, caso contrário, lança um erro
        if (!professor) {
            throw new Error('Instituição não encontrada'); // Lança um erro se a empresa não existir
        }
        return { professor: DTOHelp_1.default.getProfessorDTO(professor), Instituicao: DTOHelp_1.default.getInstituicoesDto(professor.getDataValue('Instituicao')) };
    }
    static async visualizarInstituicaoECurso(idProfessor) {
        let professor = await this.findByPk(idProfessor, {
            include: [
                {
                    model: Instituicao_1.default,
                    as: 'Instituicao'
                },
                {
                    model: Curso_1.default,
                    as: 'Curso'
                }
            ]
        });
        // Verifica se o professor foi encontrado
        if (!professor) {
            throw new Error('Professor não encontrado');
        }
        return {
            professor: DTOHelp_1.default.getProfessorDTO(professor),
            instituicao: DTOHelp_1.default.getInstituicoesDto(professor.getDataValue('Instituicao')),
            curso: DTOHelp_1.default.getCursosDTO(professor.getDataValue('Curso'))
        };
    }
}
Professor.init({
    idProfessor: {
        type: sequelize_2.default.INTEGER,
        autoIncrement: true, // A coluna irá incrementar automaticamente
        allowNull: false, // Não pode ser nula
        primaryKey: true // Define como chave primária
    },
    // Definição da coluna 'nome' como string com tamanho máximo de 50 caracteres
    nome: {
        type: sequelize_2.default.STRING(50),
        allowNull: false // Não pode ser nula
    },
    // Definição da coluna 'cpf' como string com tamanho máximo de 25 caracteres
    cpf: {
        type: sequelize_2.default.STRING(25),
        allowNull: false, // Não pode ser nula
        unique: true // Deve ser único no banco de dados
    },
    // Definição da coluna 'email' como string com tamanho máximo de 50 caracteres
    email: {
        type: sequelize_2.default.STRING(50),
        allowNull: false, // Não pode ser nula
        unique: true // Deve ser único no banco de dados
    },
    // Definição da coluna 'senha' como string com tamanho máximo de 50 caracteres
    senha: {
        type: sequelize_2.default.STRING(50),
        allowNull: false, // Não pode ser nula
    },
    // Definição da coluna 'contato' como string com tamanho máximo de 50 caracteres
    contato: {
        type: sequelize_2.default.STRING(50), // Pode ser nula, pois não há 'allowNull' definido
        allowNull: false
    },
    // Definição da coluna 'curso_id' como inteiro, com referência à tabela 'curso'
    cursoId: {
        type: sequelize_2.default.INTEGER,
        allowNull: false, // Não pode ser nula
        references: {
            model: 'curso', // Tabela referenciada
            key: 'id' // Chave primária da tabela referenciada
        },
        onDelete: 'CASCADE', // Quando um curso for deletado, o professor também será deletado
        onUpdate: 'CASCADE' // Atualizações na tabela de cursos refletem nesta tabela
    },
    // Definição da coluna 'instituicao_id' como inteiro, com referência à tabela 'instituicao'
    instituicaoId: {
        type: sequelize_2.default.INTEGER,
        allowNull: false, // Não pode ser nula
        references: {
            model: 'instituicao' // Tabela referenciada
        },
        onDelete: 'CASCADE', // Quando uma instituição for deletada, o professor também será deletado
        onUpdate: 'CASCADE' // Atualizações na tabela de instituições refletem nesta tabela
    }
}, {
    sequelize: _1.default,
    tableName: 'professor'
});
Instituicao_1.default.hasMany(Professor, {
    foreignKey: 'instituicaoId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    as: 'Professores'
});
Professor.belongsTo(Instituicao_1.default, {
    foreignKey: 'instituicaoId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    as: 'Instituicao'
});
Curso_1.default.hasMany(Professor, {
    foreignKey: 'cursoId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    as: 'Professores'
});
Professor.belongsTo(Curso_1.default, {
    foreignKey: 'cursoId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    as: 'Curso'
});
exports.default = Professor;
//# sourceMappingURL=Professor.js.map