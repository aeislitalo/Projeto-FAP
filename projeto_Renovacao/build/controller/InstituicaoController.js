"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importa o serviço de instituições
const InstituicaoService_1 = __importDefault(require("../service/InstituicaoService"));
// Classe InstituicaoController para gerenciar as rotas relacionadas a instituições
class InstituicaoController {
    servico = new InstituicaoService_1.default(); // Instância do serviço de instituições
    // Método para mostrar todas as instituições
    async getMostrarInstituicoes(req, resp, next) {
        try {
            const { status, mensagem } = await this.servico.getMostrasTodasAsInstituicoes(); // Chama o serviço para obter instituições
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem
        }
        catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
    // Método para cadastrar uma nova instituição
    async postCadastrarInstituicao(req, resp, next) {
        try {
            const { status, mensagem } = await this.servico.postCadastrarInstituicao(req.body); // Cadastra nova instituição
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem
        }
        catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
    // Método para atualizar uma instituição existente
    async putAtualizarInstituicao(req, resp, next) {
        try {
            const { status, mensagem } = await this.servico.putAtualizarInstituicao(Number(req.params.id), req.body); // Atualiza a instituição
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem
        }
        catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
    // Método para atualizar a senha de uma instituição
    async patchAtualizarSenhaInstituicao(req, resp, next) {
        try {
            const { status, mensagem } = await this.servico.patchMudarSenhaInstituicao(Number(req.params.id), req.body); // Atualiza a senha da instituição
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem
        }
        catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
    // Método para deletar uma instituição
    async deletarInstituicao(req, resp, next) {
        try {
            const { status, mensagem } = await this.servico.deletarInstituicao(Number(req.params.id)); // Deleta a instituição
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem
        }
        catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
    // Método para login da instituição
    async loginControllerInstituicao(req, resp, next) {
        try {
            const { status, mensagem } = await this.servico.loginInstituicao(req.body.email.trim(), req.body.senha.trim()); // Realiza o login da instituição
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem
        }
        catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
    // Método de busca por caracter
    async buscarInstituicoesPorCaracter(req, resp, next) {
        try {
            const { status, mensagem } = await this.servico.buscarInstituicoesHaPartirDasPrimeirasLetras(req.body.busca.trim()); // Busca instituições a partir das primeiras letras fornecidas
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem
        }
        catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
    // Método para mostrar todos os cursos de uma determinada instituição
    async getMostrarTodosOsCursosDeDeterminadaInstituicao(req, resp, next) {
        try {
            const { status, mensagem } = await this.servico.getMostrarCursosInstituicao(Number(req.params.id)); // Obtém os cursos da instituição
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem
        }
        catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
}
// Exporta a classe InstituicaoController para ser utilizada em outras partes do aplicativo
exports.default = InstituicaoController;
//# sourceMappingURL=InstituicaoController.js.map