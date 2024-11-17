"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DemandaPegaService_1 = __importDefault(require("../service/DemandaPegaService")); // Importa a classe DemandaService que contém a lógica de negócios
// Define a classe DemandaPegaController
class DemandaPegaController {
    servico = new DemandaPegaService_1.default(); // Cria uma instância do serviço DemandaPegaService
    // Método assíncrono para obter todas as demandas
    async getMostrarTodasAsDemanda(req, resp, next) {
        try {
            // Chama o serviço para obter demandas pegadas e desestrutura o status e a mensagem
            const { status, mensagem } = await this.servico.getObterDemandasPegas();
            // Retorna a resposta com o status e a mensagem
            resp.status(status).json(mensagem);
        }
        catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
    // Método assíncrono para pegar uma demanda específica
    async postPegarDemanda(req, resp, next) {
        try {
            // Chama o serviço para pegar uma demanda com base nos parâmetros fornecidos e desestrutura o status e a mensagem
            const { status, mensagem } = await this.servico.postPegarDemanda(req.body, Number(req.params.idProfessor), Number(req.params.idDemanda));
            // Retorna a resposta com o status e a mensagem
            resp.status(status).json(mensagem);
        }
        catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
    // Método assíncrono para atualizar a entrega de uma demanda
    async patchEntrega(req, resp, next) {
        try {
            // Chama o serviço para atualizar a entrega da demanda pegada
            const { status, mensagem } = await this.servico.patchAtualizarEntregaDemandaPega(Number(req.params.id));
            // Retorna a resposta com o status e a mensagem
            resp.status(status).json(mensagem);
        }
        catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
    // Método assíncrono para atualizar uma demanda
    async putAtualizarDemanda(req, resp, next) {
        try {
            // Chama o serviço para atualizar a descrição da demanda pegada
            const { status, mensagem } = await this.servico.putAtualizarDemandaPega(req.body.descricao, Number(req.params.id));
            // Retorna a resposta com o status e a mensagem
            resp.status(status).json(mensagem);
        }
        catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
    // Método assíncrono para excluir uma demanda
    async deleteExcluirDemanda(req, resp, next) {
        try {
            // Chama o serviço para deletar uma demanda pegada com base no id fornecido
            const { status, mensagem } = await this.servico.deletarDemandaPega(Number(req.params.id));
            // Retorna a resposta com o status e a mensagem
            resp.status(status).json(mensagem);
        }
        catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
    // Método assíncrono para mostrar todas as demandas pegadas pelos professores
    async mostrarDemandasProfessores(req, resp, next) {
        try {
            // Chama o serviço para obter todas as demandas pegadas pelos professores
            const { status, mensagem } = await this.servico.mostrarTodasDemandasPegasPelosProfessores();
            // Retorna a resposta com o status e a mensagem
            resp.status(status).json(mensagem);
        }
        catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
    // Método assíncrono para mostrar professores associados a uma demanda específica
    async mostrarProfessoresPorDemanda(req, resp, next) {
        try {
            // Chama o serviço para mostrar todos os professores de uma demanda específica
            const { status, mensagem } = await this.servico.mostrarTodosOspProfessoresDeUmaDemanda(Number(req.params.id));
            // Retorna a resposta com o status e a mensagem
            resp.status(status).json(mensagem);
        }
        catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
    // Método assíncrono para mostrar todas as demandas de um professor específico
    async mostrarDemandasPorProfessor(req, resp, next) {
        try {
            // Chama o serviço para mostrar todas as demandas de um professor específico
            const { status, mensagem } = await this.servico.mostrarTodasAsDemandasDeUmProfessor(Number(req.params.id));
            // Retorna a resposta com o status e a mensagem
            resp.status(status).json(mensagem);
        }
        catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
    // Método para exibir o andamento de uma demanda para um professor específico
    async mostrarAndamentoDemanda(req, resp, next) {
        try {
            // Chama o serviço para obter o andamento das demandas de um professor, convertendo o ID da URL para número
            const { status, mensagem } = await this.servico.mostrarAndamentoDemanda(Number(req.params.id));
            // Envia a resposta com o status e a mensagem retornados pelo serviço
            resp.status(status).json(mensagem);
        }
        catch (error) {
            // Encaminha qualquer erro ocorrido para o middleware de tratamento de erros
            next(error);
        }
    }
}
// Exporta a classe DemandaPegaController
exports.default = DemandaPegaController;
//# sourceMappingURL=DemandaPegaController.js.map