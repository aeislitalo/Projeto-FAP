import DemandaPega from "../database/models/DemandaPega"; // Importa o modelo DemandaPega, que representa a entidade no banco de dados.
import DTOHelper from "../utils/DTOHelp"; // Importa um helper para manipular objetos de transferência de dados (DTOs).
import resp from "../utils/resp"; // Importa uma função para formatar respostas da API.
import MetodosTratamentoAuxiliares from "./MetodosTratamentoAuxiliares"; // Importa uma classe base que contém métodos auxiliares.

class DemandaPegaService extends MetodosTratamentoAuxiliares { // Define a classe DemandaPegaService que estende MetodosTratamentoAuxiliares.

    // Método para criar uma nova demanda pega associada a um professor.
    async postPegarDemanda(reqBody: any, idProfessor: number, idDemanda: number) {
        let demandaPegaDTO = await this.criarObjetoDemandaPegaDTO(idDemanda, idProfessor, reqBody); // Cria um DTO a partir dos parâmetros recebidos.
        await this.modelDemandaPega.create(this.preencherDemandaPega(demandaPegaDTO)); // Cria uma nova entrada no banco de dados.
        return resp(201, ""); // Retorna uma resposta com status 201 (Criado).
    }

    // Método para obter todas as demandas pegadas.
    async getObterDemandasPegas() {
        return resp(200, (await this.modelDemandaPega.findAll()).map(demandasPega => DTOHelper.getDemandaPegasDTO(demandasPega))); // Retorna uma lista de todas as demandas com status 200 (OK).
    }

    // Método para atualizar a data de entrega de uma demanda pega.
    async patchAtualizarEntregaDemandaPega(idDemandaPega: number) {
        (await this.acharDemandaPegaPorId(idDemandaPega)).update({ // Atualiza a data de entrega da demanda correspondente ao ID.
            dataEntrega: Date.now() // Define a data de entrega como o timestamp atual.
        });
        return resp(204, ""); // Retorna uma resposta com status 204 (Sem conteúdo).
    }

    // Método para atualizar a descrição e a data da última atualização de uma demanda pega.
    async putAtualizarDemandaPega(descricao: string, idDemandaPega: number) {
        (await this.acharDemandaPegaPorId(idDemandaPega)).update({ // Busca a demanda pelo ID e atualiza os campos.
            dataUltimaAtualizacao: Date.now(), // Atualiza a data da última atualização.
            descricao: descricao // Atualiza a descrição.
        });
        return resp(204, ""); // Retorna uma resposta com status 204 (Sem conteúdo).
    }

    // Método para deletar uma demanda pega.
    async deletarDemandaPega(idDemandaPega: number) {
        (await this.acharDemandaPegaPorId(idDemandaPega)).destroy(); // Busca e remove a demanda correspondente ao ID.
        return resp(204, ""); // Retorna uma resposta com status 204 (Sem conteúdo).
    }

    // Método para mostrar todas as demandas pegadas pelos professores.
    async mostrarTodasDemandasPegasPelosProfessores() {
        return resp(200, await DemandaPega.visualizarDemandasDosProfessores()); // Retorna a lista de demandas pegadas por professores com status 200 (OK).
    }

    // Método para mostrar todos os professores associados a uma demanda específica.
    async mostrarTodosOspProfessoresDeUmaDemanda(idDemanda: number) {
        return resp(200, await DemandaPega.visualizarProfessoresDeUmaDemanda(idDemanda)); // Retorna a lista de professores vinculados à demanda com status 200 (OK).
    }

    // Método para mostrar todas as demandas de um professor específico.
    async mostrarTodasAsDemandasDeUmProfessor(idProfessor: number) {
        return resp(200, await DemandaPega.visualizarDemandasDeUmProfessor(idProfessor)); // Retorna a lista de demandas do professor com status 200 (OK).
    }
   
}

export default DemandaPegaService; // Exporta a classe DemandaPegaService como padrão.
