"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InstituicaoService_1 = __importDefault(require("../service/InstituicaoService"));
class InstituicaoController {
    servico = new InstituicaoService_1.default();
    // Método para mostrar todas as instituições
    async getMostrarInstituicoes(req, resp, next) {
        try {
            const { status, mensagem } = await this.servico.get();
            resp.status(status).json(mensagem);
        }
        catch (error) {
            next(error);
        }
    }
    // Método para cadastrar uma nova instituição
    async postCadastrarInstituicao(req, resp, next) {
        try {
            const { status, mensagem } = await this.servico.postCadastrarInstituicao(req.body);
            resp.status(status).json(mensagem);
        }
        catch (error) {
            next(error);
        }
    }
    // Método para atualizar uma instituição existente
    async putAtualizarInstituicao(req, resp, next) {
        try {
            const { status, mensagem } = await this.servico.putAtualizarInstituicao(Number(req.params.id), req.body);
            resp.status(status).json(mensagem);
        }
        catch (error) {
            next(error);
        }
    }
    // Método para atualizar a senha de uma instituição
    async patchAtualizarSenhaInstituicao(req, resp, next) {
        try {
            const { status, mensagem } = await this.servico.patchMudarSenhaInstituicao(Number(req.params.id), req.body);
            resp.status(status).json(mensagem);
        }
        catch (error) {
            next(error);
        }
    }
    // Método para deletar uma instituição
    async deletarInstituicao(req, resp, next) {
        try {
            const { status, mensagem } = await this.servico.deletarInstituicao(Number(req.params.id));
            resp.status(status).json(mensagem);
        }
        catch (error) {
            next(error);
        }
    }
    // Método para login da instituição
    async loginControllerInstituicao(req, resp, next) {
        try {
            const { status, mensagem } = await this.servico.loginInstituicao(req.body.email.trim(), req.body.senha.trim());
            resp.status(status).json(mensagem);
        }
        catch (error) {
            next(error);
        }
    }
    // Método para cadastrar curso na instituição
    async postCadastrarCursos(req, resp, next) {
        try {
            const { status, mensagem } = await this.servico.cadastrarCursoInstituicao(Number(req.params.id), req.body.nome);
            resp.status(status).json(mensagem);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = InstituicaoController;
//# sourceMappingURL=InstituicaoController.js.map