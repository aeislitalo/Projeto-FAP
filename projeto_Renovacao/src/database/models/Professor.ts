import { Model } from "sequelize";
import db from ".";
import sequelize from "sequelize";
import Instituicao from "./Instituicao";
import Curso from "./Curso";
import DTOHelper from "../../utils/DTOHelp";

class Professor extends Model {

  declare idProfessor: number;
  declare nome: string;
  declare cpf: string;
  declare email: string;
  declare senha: string;
  declare contato: string;
  declare cursoId: number;
  declare instituicaoId: number;


  static async visualizarCursos(idProfessor: number) {
    let professor = await this.findByPk(idProfessor, {
      include: [
        {
          model: Curso, // O model atual ('Demanda') é incluído como parte da consulta
          as: 'Curso' // Define o alias 'demandas' para o relacionamento, já definido no modelo
        }
      ]
    });

    // Verifica se a empresa foi encontrada, caso contrário, lança um erro
    if (!professor) {
      throw new Error('Cursos não encontrados'); // Lança um erro se a empresa não existir
    }
    // Retorna a empresa encontrada com suas demandas associadas
    return { professor: DTOHelper.getProfessorDTO(professor), curso: DTOHelper.getCursosDTO(professor.getDataValue('Curso')) };
  }

  static async visualizarInstituicao(idProfessor: number) {
    let professor = await this.findByPk(idProfessor, {
      include: [
        {
          model: Instituicao, // O model atual ('Demanda') é incluído como parte da consulta
          as: 'Instituicao' // Define o alias 'demandas' para o relacionamento, já definido no modelo
        }
      ]
    });

    // Verifica se a empresa foi encontrada, caso contrário, lança um erro
    if (!professor) {
      throw new Error('Instituição não encontrada'); // Lança um erro se a empresa não existir
    }
    return { professor: DTOHelper.getProfessorDTO(professor), Instituicao: DTOHelper.getInstituicoesDto(professor.getDataValue('Instituicao')) };
  }

  static async visualizarInstituicaoECurso(idProfessor: number) {

    let professor = await this.findByPk(idProfessor, {
      include: [
        {
          model: Instituicao,
          as: 'Instituicao'
        },
        {
          model: Curso,
          as: 'Curso'
        }
      ]
    });
    // Verifica se o professor foi encontrado
    if (!professor) {
      throw new Error('Professor não encontrado');
    }
    return {
      professor: DTOHelper.getProfessorDTO(professor),
      instituicao: DTOHelper.getInstituicoesDto(professor.getDataValue('Instituicao')),
      curso: DTOHelper.getCursosDTO(professor.getDataValue('Curso'))
    };

  }

}
Professor.init({

  id_professor: {
    type: sequelize.INTEGER,
    autoIncrement: true,  // A coluna irá incrementar automaticamente
    allowNull: false,     // Não pode ser nula
    primaryKey: true      // Define como chave primária
  },
  // Definição da coluna 'nome' como string com tamanho máximo de 50 caracteres
  nome: {
    type: sequelize.STRING(50),
    allowNull: false      // Não pode ser nula
  },
  // Definição da coluna 'cpf' como string com tamanho máximo de 25 caracteres
  cpf: {
    type: sequelize.STRING(25),
    allowNull: false,     // Não pode ser nula
    unique: true          // Deve ser único no banco de dados
  },
  // Definição da coluna 'email' como string com tamanho máximo de 50 caracteres
  email: {
    type: sequelize.STRING(50),
    allowNull: false,     // Não pode ser nula
    unique: true          // Deve ser único no banco de dados
  },
  // Definição da coluna 'senha' como string com tamanho máximo de 50 caracteres
  senha: {
    type: sequelize.STRING(50),
    allowNull: false,     // Não pode ser nula
  },
  // Definição da coluna 'contato' como string com tamanho máximo de 50 caracteres
  contato: {
    type: sequelize.STRING(50), // Pode ser nula, pois não há 'allowNull' definido
    allowNull: false
  },
  // Definição da coluna 'curso_id' como inteiro, com referência à tabela 'curso'
  cursoId: {
    type: sequelize.INTEGER,
    allowNull: false,     // Não pode ser nula
    references: {
      model: 'curso',     // Tabela referenciada
      key: 'id'          // Chave primária da tabela referenciada
    },
    onDelete: 'CASCADE',  // Quando um curso for deletado, o professor também será deletado
    onUpdate: 'CASCADE'   // Atualizações na tabela de cursos refletem nesta tabela
  },
  // Definição da coluna 'instituicao_id' como inteiro, com referência à tabela 'instituicao'
  instituicaoId: {
    type: sequelize.INTEGER,
    allowNull: false,     // Não pode ser nula
    references: {
      model: 'instituicao' // Tabela referenciada
    },
    onDelete: 'CASCADE',  // Quando uma instituição for deletada, o professor também será deletado
    onUpdate: 'CASCADE'   // Atualizações na tabela de instituições refletem nesta tabela
  }

}, {
  sequelize: db,
  tableName: 'professor'
})
Instituicao.hasMany(Professor, {
  foreignKey: 'instituicaoId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  as: 'Professores'
});
Professor.belongsTo(Instituicao, {
  foreignKey: 'instituicaoId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  as: 'Instituicao'
});
Curso.hasMany(Professor, {
  foreignKey: 'cursoId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  as: 'Professores'
});
Professor.belongsTo(Curso, {
  foreignKey: 'cursoId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  as: 'Curso'
});

export default Professor;