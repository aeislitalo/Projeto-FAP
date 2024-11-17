"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize"); // Importa a classe Model do Sequelize para definir o modelo
const _1 = __importDefault(require(".")); // Importa a instância do banco de dados
const sequelize_2 = __importDefault(require("sequelize")); // Importa o Sequelize para definir os tipos de dados
const Professor_1 = __importDefault(require("./Professor")); // Importa o modelo Professor
const Demanda_1 = __importDefault(require("./Demanda")); // Importa o modelo Demanda
const DTOHelp_1 = __importDefault(require("../../utils/DTOHelp")); // Importa um helper para manipulação de DTOs (Data Transfer Objects)
// Define a classe DemandaPega que estende Model do Sequelize
class DemandaPega extends sequelize_1.Model {
    // Método estático para visualizar todas as demandas associadas aos professores
    static async visualizarDemandasDosProfessores() {
        let demandasEProfessores = await this.findAll({
            include: [
                {
                    model: Demanda_1.default, // Inclui o modelo Demanda na consulta
                    as: 'Demandas' // Usa o alias definido na associação
                },
                {
                    model: Professor_1.default,
                    as: "Professores"
                }
            ]
        });
        // Retorna os professores e suas respectivas demandas em formato DTO
        return { professores: demandasEProfessores.map(professor => DTOHelp_1.default.getProfessorDTO(professor.getDataValue("Professores"))),
            demandas: demandasEProfessores.map(demanda => DTOHelp_1.default.getDemandaDTO(demanda.getDataValue('Demandas'))),
            demandas_Pegas: demandasEProfessores.map(demandaPega => DTOHelp_1.default.getDemandaPegasDTO(demandaPega)) };
    }
    // Método estático para visualizar os professores de uma demanda específica
    static async visualizarProfessoresDeUmaDemanda(demandaId) {
        try {
            // Busca a demanda específica e inclui os professores associados
            let demanda = await Demanda_1.default.findOne({
                where: { id: demandaId },
                include: [
                    {
                        model: Professor_1.default,
                        as: 'Professores' // Alias definido na associação
                    }
                ]
            });
            // Verifica se a demanda foi encontrada
            if (!demanda) {
                throw new Error('Demanda não encontrada'); // Lança um erro se a demanda não existir
            }
            // Retorna a demanda e os professores associados em formato DTO
            return { demanda: DTOHelp_1.default.getDemandaDTO(demanda), Professores: DTOHelp_1.default.getProfessorListaDTO(demanda.getDataValue('Professores')) };
        }
        catch (error) {
            throw error; // Lança o erro para ser tratado em outro lugar
        }
    }
    // Método estático para visualizar as demandas de um professor específico
    static async visualizarDemandasDeUmProfessor(idProfessor) {
        try {
            // Busca o professor específico e inclui suas demandas associadas
            let professor = await Professor_1.default.findOne({
                where: { id_professor: idProfessor },
                include: [
                    {
                        model: Demanda_1.default,
                        as: 'Demandas' // Alias definido na associação
                    }
                ]
            });
            // Verifica se o professor foi encontrado
            if (!professor) {
                throw new Error('Professor(a) não encontrado!!!'); // Lança um erro se o professor não existir
            }
            // Retorna o professor e suas demandas em formato DTO
            return { professor: DTOHelp_1.default.getProfessorDTO(professor), demandas: DTOHelp_1.default.getDemandaListaDTO(professor.getDataValue('Demandas')) };
        }
        catch (error) {
            throw error; // Lança o erro para ser tratado em outro lugar
        }
    }
    static async visualizarAndamentoDemanda(idDemanda) {
        // Busca todas as entradas na tabela intermediária 'DemandaPega' onde 'demandaId' corresponde ao 'idDemanda' fornecido.
        // Inclui os dados associados de 'Demanda' e 'Professor' de acordo com o relacionamento configurado.
        let demandas = await DemandaPega.findAll({
            where: { demandaId: idDemanda },
            include: [
                {
                    model: Demanda_1.default,
                    as: 'Demandas' // Usa o alias configurado para incluir os dados da tabela 'Demanda' relacionados.
                },
                {
                    model: Professor_1.default,
                    as: 'Professores' // Usa o alias configurado para incluir os dados da tabela 'Professor' relacionados.
                }
            ]
        });
        // Verifica se não encontrou nenhum registro correspondente para o 'idDemanda' fornecido. 
        // Caso a busca retorne um array vazio, lança um erro indicando que a Demanda ou Professor(a) não foram encontrados.
        if (!demandas || demandas.length == 0) {
            throw new Error('Demanda ou Professor(a) não encontrado(s)!');
        }
        // Retorna um objeto contendo:
        // 1. Uma lista de objetos 'DemandaPega', formatados a partir da lista 'demandas' usando o método 'getDemandaPegasListaDTO' do helper 'DTOHelper'.
        // 2. Uma lista de objetos 'Demanda', sem duplicações, extraídos de cada item em 'demandas' usando 'getDataValue'. Esses objetos são então formatados pelo método 'getDemandaDTO'.
        // 3. Uma lista de objetos 'Professor', extraídos de cada item em 'demandas' usando 'getDataValue' e formatados pelo método 'getProfessorDTO'.
        return {
            DemandaPega: demandas.map(demanda => DTOHelp_1.default.getDemandaPegasDTO(demanda)),
            Demanda: DTOHelp_1.default.getDemandaListaDTO(Array.from(
            // Cria um Map onde cada par [chave, valor] representa um item único com base no 'id' da demanda
            new Map(
            // Mapeia cada demanda para um par [id, demanda], onde 'id' é a chave única e 'demanda' é o valor
            demandas.map(demanda => [
                demanda.getDataValue('Demandas').id, // Chave: 'id' da demanda, usado para eliminar duplicatas
                demanda.getDataValue('Demandas') // Valor: o próprio objeto 'Demanda'
            ])).values() // Extrai apenas os valores únicos (objetos 'Demanda' sem duplicatas) do Map
            )),
            Professor: demandas.map(professor => DTOHelp_1.default.getProfessorDTO(professor.getDataValue('Professores')))
        };
    }
}
// Inicializa o modelo DemandaPega com as configurações de atributos e relacionamentos
DemandaPega.init({
    id: {
        type: sequelize_2.default.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    descricao: {
        type: sequelize_2.default.TEXT,
        allowNull: false
    },
    status: {
        type: sequelize_2.default.STRING(35)
    },
    dataDemandaPega: {
        type: sequelize_2.default.DATE,
        allowNull: false
    },
    dataUltimaAtualizacao: {
        type: sequelize_2.default.DATE,
        allowNull: false
    },
    dataEntrega: {
        type: sequelize_2.default.DATE,
    },
    dataPrazo: {
        type: sequelize_2.default.DATE,
        allowNull: false
    },
    demandaId: {
        type: sequelize_2.default.INTEGER,
        allowNull: false,
        references: {
            model: 'demanda',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    professorId: {
        type: sequelize_2.default.INTEGER,
        allowNull: false,
        references: {
            model: 'Professor',
            key: 'id_professor'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
}, {
    sequelize: _1.default, // Usa a instância do banco de dados
    tableName: 'demandapega' // Define o nome da tabela no banco de dados
});
// Configura o relacionamento muitos-para-muitos entre Professor e Demanda através de DemandaPega
Professor_1.default.belongsToMany(Demanda_1.default, {
    foreignKey: 'professorId',
    otherKey: 'demandaId',
    through: DemandaPega,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    as: 'Demandas' // Alias para o relacionamento
});
// Configura o relacionamento muitos-para-muitos entre Demanda e Professor através de DemandaPega
Demanda_1.default.belongsToMany(Professor_1.default, {
    foreignKey: 'demandaId',
    otherKey: 'professorId',
    through: DemandaPega,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    as: 'Professores' // Alias para o relacionamento
});
DemandaPega.belongsTo(Professor_1.default, {
    foreignKey: 'professorId',
    as: 'Professores'
});
DemandaPega.belongsTo(Demanda_1.default, {
    foreignKey: 'demandaId',
    as: 'Demandas'
});
exports.default = DemandaPega; // Exporta o modelo DemandaPega
//# sourceMappingURL=DemandaPega.js.map