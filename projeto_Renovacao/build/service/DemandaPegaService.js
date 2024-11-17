"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DemandaPega_1 = __importDefault(require("../database/models/DemandaPega")); // Importa o modelo DemandaPega, que representa a entidade no banco de dados.
const DTOHelp_1 = __importDefault(require("../utils/DTOHelp")); // Importa um helper para manipular objetos de transferência de dados (DTOs).
const resp_1 = __importDefault(require("../utils/resp")); // Importa uma função para formatar respostas da API.
const MetodosTratamentoAuxiliares_1 = __importDefault(require("./MetodosTratamentoAuxiliares")); // Importa uma classe base que contém métodos auxiliares.
class DemandaPegaService extends MetodosTratamentoAuxiliares_1.default {
    // Método para criar uma nova demanda pega associada a um professor.
    async postPegarDemanda(reqBody, idProfessor, idDemanda) {
        let demandaPegaDTO = await this.criarObjetoDemandaPegaDTO(idDemanda, idProfessor, reqBody); // Cria um DTO a partir dos parâmetros recebidos.
        await this.modelDemandaPega.create(this.preencherDemandaPega(demandaPegaDTO)); // Cria uma nova entrada no banco de dados.
        return (0, resp_1.default)(201, ""); // Retorna uma resposta com status 201 (Criado).
    }
    // Método para obter todas as demandas pegadas.
    async getObterDemandasPegas() {
        return (0, resp_1.default)(200, (await this.modelDemandaPega.findAll()).map(demandasPega => DTOHelp_1.default.getDemandaPegasDTO(demandasPega))); // Retorna uma lista de todas as demandas com status 200 (OK).
    }
    // Método para atualizar a data de entrega de uma demanda pega.
    async patchAtualizarEntregaDemandaPega(idDemandaPega) {
        let demandaPegaDb = await this.acharDemandaPegaPorId(idDemandaPega);
        if (new Date() <= demandaPegaDb.dataPrazo) {
            demandaPegaDb.update({
                status: "Entregue no prazo",
                dataEntrega: Date.now() // Define a data de entrega como o timestamp atual.
            });
        }
        else {
            demandaPegaDb.update({
                status: "Entregue após o Prazo",
                dataEntrega: Date.now() // Define a data de entrega como o timestamp atual.
            });
        }
        return (0, resp_1.default)(204, ""); // Retorna uma resposta com status 204 (Sem conteúdo).
    }
    // Método para atualizar a descrição e a data da última atualização de uma demanda pega.
    async putAtualizarDemandaPega(novaDescricao, idDemandaPega) {
        let demandaPegaDb = await this.acharDemandaPegaPorId(idDemandaPega);
        let descricaoParaArmazenar = `${demandaPegaDb.descricao}\n${novaDescricao}`;
        (demandaPegaDb).update({
            dataUltimaAtualizacao: Date.now(), // Atualiza a data da última atualização.
            descricao: descricaoParaArmazenar // Atualiza a descrição.
        });
        return (0, resp_1.default)(204, ""); // Retorna uma resposta com status 204 (Sem conteúdo).
    }
    // Método para deletar uma demanda pega.
    async deletarDemandaPega(idDemandaPega) {
        (await this.acharDemandaPegaPorId(idDemandaPega)).destroy(); // Busca e remove a demanda correspondente ao ID.
        return (0, resp_1.default)(204, ""); // Retorna uma resposta com status 204 (Sem conteúdo).
    }
    // Método para mostrar todas as demandas pegadas pelos professores.
    async mostrarTodasDemandasPegasPelosProfessores() {
        return (0, resp_1.default)(200, await DemandaPega_1.default.visualizarDemandasDosProfessores()); // Retorna a lista de demandas pegadas por professores com status 200 (OK).
    }
    // Método para mostrar todos os professores associados a uma demanda específica.
    async mostrarTodosOspProfessoresDeUmaDemanda(idDemanda) {
        return (0, resp_1.default)(200, await DemandaPega_1.default.visualizarProfessoresDeUmaDemanda(idDemanda)); // Retorna a lista de professores vinculados à demanda com status 200 (OK).
    }
    // Método para mostrar todas as demandas de um professor específico.
    async mostrarTodasAsDemandasDeUmProfessor(idProfessor) {
        return (0, resp_1.default)(200, await DemandaPega_1.default.visualizarDemandasDeUmProfessor(idProfessor)); // Retorna a lista de demandas do professor com status 200 (OK).
    }
    // Método para mostrar o andamento de uma demanda específica
    async mostrarAndamentoDemanda(idDemanda) {
        // Retorna uma resposta com status 200 e o resultado da função `visualizarAndamentoDemanda` da classe `DemandaPega`
        return (0, resp_1.default)(200, await DemandaPega_1.default.visualizarAndamentoDemanda(idDemanda));
    }
}
exports.default = DemandaPegaService; // Exporta a classe DemandaPegaService como padrão.
//# sourceMappingURL=DemandaPegaService.js.map