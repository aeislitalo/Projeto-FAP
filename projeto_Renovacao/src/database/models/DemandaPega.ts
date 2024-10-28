import { Model, Op } from "sequelize"; // Importa a classe Model do Sequelize para definir o modelo
import db from "."; // Importa a instância do banco de dados
import sequelize from "sequelize"; // Importa o Sequelize para definir os tipos de dados
import Professor from "./Professor"; // Importa o modelo Professor
import Demanda from "./Demanda"; // Importa o modelo Demanda
import DTOHelper from "../../utils/DTOHelp"; // Importa um helper para manipulação de DTOs (Data Transfer Objects)

// Define a classe DemandaPega que estende Model do Sequelize
class DemandaPega extends Model {
    declare id: number; // Declaração do atributo id como um número
    declare descricao: string; // Declaração do atributo descricao como string
    declare status: string; // Declaração do atributo status como string
    declare dataDemandaPega: Date; // Declaração do atributo dataDemandaPega como data
    declare dataUltimaAtualizacao: Date; // Declaração do atributo dataUltimaAtualizacao como data
    declare dataEntrega: Date; // Declaração do atributo dataEntrega como data
    declare demandaId: number; // Declaração do atributo demandaId como número, chave estrangeira
    declare professorId: number; // Declaração do atributo professorId como número, chave estrangeira

    // Método estático para visualizar todas as demandas associadas aos professores
    static async visualizarDemandasDosProfessores(){
        let demandasEProfessores = await Professor.findAll({            
            include: [
                {
                    model: Demanda, // Inclui o modelo Demanda na consulta
                    as: 'Demandas' // Usa o alias definido na associação
                }
            ]
        });
        
        // Retorna os professores e suas respectivas demandas em formato DTO
        return {professores: DTOHelper.getProfessorListaDTO(demandasEProfessores), demandas: demandasEProfessores.map(demanda => DTOHelper.getDemandaListaDTO(demanda.getDataValue('Demandas')))};
    }

    // Método estático para visualizar os professores de uma demanda específica
    static async visualizarProfessoresDeUmaDemanda(demandaId: number){
        try {
            // Busca a demanda específica e inclui os professores associados
            let demanda = await Demanda.findOne({
                where: { id: demandaId },
                include: [
                    {
                        model: Professor,
                        as: 'Professores' // Alias definido na associação
                    }
                ]
            });

            // Verifica se a demanda foi encontrada
            if (!demanda) {
                throw new Error('Demanda não encontrada'); // Lança um erro se a demanda não existir
            }
            // Retorna a demanda e os professores associados em formato DTO
            return { demanda: DTOHelper.getDemandaDTO(demanda), Professores: DTOHelper.getProfessorListaDTO(demanda.getDataValue('Professores'))}; 
        } catch (error) {
            throw error; // Lança o erro para ser tratado em outro lugar
        }
    }

    // Método estático para visualizar as demandas de um professor específico
    static async visualizarDemandasDeUmProfessor(idProfessor:number){
        try {
            // Busca o professor específico e inclui suas demandas associadas
            let professor = await Professor.findOne({
                where: { id_professor: idProfessor },
                include: [
                    {
                        model: Demanda,
                        as: 'Demandas' // Alias definido na associação
                    }
                ]
            });

            // Verifica se o professor foi encontrado
            if (!professor) {
                throw new Error('Professor(a) não encontrado!!!'); // Lança um erro se o professor não existir
            }
            // Retorna o professor e suas demandas em formato DTO
            return { professor: DTOHelper.getProfessorDTO(professor), demandas: DTOHelper.getDemandaListaDTO(professor.getDataValue('Demandas'))}; 
        } catch (error) {
            throw error; // Lança o erro para ser tratado em outro lugar
        }
    }
}

// Inicializa o modelo DemandaPega com as configurações de atributos e relacionamentos
DemandaPega.init({
    id: {
        type: sequelize.INTEGER, // Define o tipo id como inteiro
        autoIncrement: true, // Define id como auto-incrementável
        allowNull: false, // Define que id não pode ser nulo
        primaryKey: true // Define id como chave primária
    },
    descricao: {
        type: sequelize.TEXT, // Define descricao como texto longo
        allowNull: false // Define que descricao não pode ser nulo
    },
    status: {
        type: sequelize.STRING(35) // Define o tipo de status como String
    },
    dataDemandaPega: {
        type: sequelize.DATE, // Define data_demanda_pega como data
        allowNull: false // Define que data_demanda_pega não pode ser nulo
    },
    dataUltimaAtualizacao: {
        type: sequelize.DATE, // Define data_ultima_atualizacao como data
        allowNull: false // Define que data_ultima_atualizacao não pode ser nulo
    },
    dataEntrega: {
        type: sequelize.DATE, // Define data_entrega como data
    },
    demandaId: {
        type: sequelize.INTEGER, // Define demandaId como inteiro
        allowNull: false, // Define que demandaId não pode ser nulo
        references: {
            model: 'demanda', // Define a tabela referenciada como 'demanda'
            key: 'id' // Define a chave referenciada como 'id' na tabela 'demanda'
        },
        onDelete: 'CASCADE', // Aplica exclusão em cascata (delete associado caso demanda seja deletada)
        onUpdate: 'CASCADE' // Aplica atualização em cascata (atualiza chave estrangeira se id de demanda mudar)
    },
    professorId: {
        type: sequelize.INTEGER, // Define professorId como inteiro
        allowNull: false, // Define que professorId não pode ser nulo
        references: {
            model: 'Professor', // Define a tabela referenciada como 'Professor'
            key: 'id_professor' // Define a chave referenciada como 'id_professor' na tabela 'Professor'
        },
        onDelete: 'CASCADE', // Aplica exclusão em cascata
        onUpdate: 'CASCADE' // Aplica atualização em cascata
    }
}, {
    sequelize: db, // Usa a instância do banco de dados
    tableName: 'demandapega' // Define o nome da tabela no banco de dados
});

// Configura o relacionamento muitos-para-muitos entre Professor e Demanda através de DemandaPega
Professor.belongsToMany(Demanda, {
    foreignKey: 'professorId', // Chave estrangeira em DemandaPega associada ao Professor
    otherKey: 'demandaId', // Outra chave em DemandaPega associada à Demanda
    through: DemandaPega, // Define a tabela intermediária como DemandaPega
    onDelete: 'CASCADE', // Exclui as demandas associadas ao professor ao deletá-lo
    onUpdate: 'CASCADE', // Atualiza a associação ao alterar id do professor
    as: 'Demandas' // Define o alias 'Demandas' para o relacionamento
});

// Configura o relacionamento muitos-para-muitos entre Demanda e Professor através de DemandaPega
Demanda.belongsToMany(Professor, {
    foreignKey: 'demandaId', // Chave estrangeira em DemandaPega associada à Demanda
    otherKey: 'professorId', // Outra chave em DemandaPega associada ao Professor
    through: DemandaPega, // Define a tabela intermediária como DemandaPega
    onDelete: 'CASCADE', // Exclui os professores associados à demanda ao deletá-la
    onUpdate: 'CASCADE', // Atualiza a associação ao alterar id de demanda
    as: 'Professores' // Define o alias 'Professores' para o relacionamento
});

export default DemandaPega; // Exporta o modelo DemandaPega
