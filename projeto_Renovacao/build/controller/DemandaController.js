"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DemandaService_1 = __importDefault(require("../service/DemandaService")); // Importa a classe DemandaService
class DemandaController {
    servico = new DemandaService_1.default(); // Instância do serviço de demandas para uso nos métodos do controlador
    // Método para cadastrar uma nova demanda para uma empresa
    async postCadastrarDemanda(req, resp, next) {
        try {
            // Chama o método do serviço para cadastrar uma nova demanda
            let { status, mensagem } = await this.servico.postCadastrarDemanda(Number(req.params.id), req.body);
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem
        }
        catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
    // Método para mostrar a empresa associada a uma demanda específica
    async getMostraEmpresaPorDemanda(req, resp, next) {
        try {
            // Chama o método do serviço para obter a empresa associada a uma demanda
            let { status, mensagem } = await this.servico.getMostrarEmpresasPertencenteHaDemanda(Number(req.params.id));
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem
        }
        catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
    // Método para mostrar todas as demandas
    async getMostrarDemandas(req, resp, next) {
        try {
            // Chama o método do serviço para obter todas as demandas
            let { status, mensagem } = await this.servico.getMostrarDemandas();
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem
        }
        catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
    // Método para atualizar uma demanda específica
    async putAtualizarDemanda(req, resp, next) {
        try {
            // Chama o método do serviço para atualizar uma demanda com base no id
            let { status, mensagem } = await this.servico.putAtualizarDemanda(Number(req.params.id), req.body);
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem
        }
        catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
    // Método para alterar a data de uma demanda específica
    async patchMudarData(req, resp, next) {
        try {
            // Chama o método do serviço para mudar a data da demanda
            let { status, mensagem } = await this.servico.patchMudarData(Number(req.params.id), req.body);
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem
        }
        catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
    async patchAtualizarPrazo(req, resp, next) {
        try {
            // Chama o método do serviço para mudar a data da demanda
            let { status, mensagem } = await this.servico.patchAtualizarPrazo(Number(req.params.id), req.body.novo_prazo);
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem
        }
        catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
    // Método para deletar uma demanda específica
    async deletarDemanda(req, resp, next) {
        try {
            // Chama o método do serviço para deletar uma demanda com base no id
            let { status, mensagem } = await this.servico.deletarDemandaServico(Number(req.params.id));
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem
        }
        catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
    // Método para buscar demandas com base nas primeiras letras do título
    async postBuscarDemandasComPrimeirasLetras(req, resp, next) {
        console.log(req.body.busca); // Exibe o corpo da requisição no console para depuração
        try {
            // Chama o método do serviço para buscar demandas com base nas primeiras letras fornecidas
            let { status, mensagem } = await this.servico.MostrarDemandasHaPartirDasPrimeirasLetras(req.body.busca.trim());
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem
        }
        catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
}
exports.default = DemandaController; // Exporta a classe DemandaController para uso em outras partes da aplicação
//# sourceMappingURL=DemandaController.js.map