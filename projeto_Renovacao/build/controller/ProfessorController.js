"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importa o serviço de professores
const ProfessorService_1 = __importDefault(require("../service/ProfessorService"));
// Classe ProfessorController para gerenciar as rotas relacionadas a professores
class ProfessorController {
    servico = new ProfessorService_1.default(); // Instância do serviço de professores
    // Método para mostrar todos os professores
    async getMostrarProfessores(req, resp, next) {
        try {
            const { status, mensagem } = await this.servico.getObterProfessores(); // Chama o serviço para obter professores
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem
        }
        catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
    // Método para cadastrar um novo professor
    async postCadastroProfessores(req, resp, next) {
        try {
            const { status, mensagem } = await this.servico.postAdicionarProfessor(req.body, Number(req.params.idCurso), Number(req.params.idInstituicao)); // Chama o serviço para cadastrar professores
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem
        }
        catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
    // Método para atualizar dados de um professor existente
    async putAtualizarProfessores(req, resp, next) {
        try {
            const { status, mensagem } = await this.servico.putAtualizarProfessor(req.body, Number(req.params.id)); // Chama o serviço para atualizar dados dos professores
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem
        }
        catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
    // Método para atualizar a senha de um professor
    async patchMudarSenha(req, resp, next) {
        try {
            const { status, mensagem } = await this.servico.patchMudarSenhaProfessor(Number(req.params.id), req.body.nova_senha); // Chama o serviço para atualizar a senha do professor
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem
        }
        catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
    // Método para excluir um professor
    async deleteExcluirProfessor(req, resp, next) {
        try {
            const { status, mensagem } = await this.servico.deleteApagarProfessor(Number(req.params.id)); // Chama o serviço para excluir o professor
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem
        }
        catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
    // Método para buscar professor por nome
    async buscarPorNome(req, resp, next) {
        try {
            const { status, mensagem } = await this.servico.buscaProfessorPorNome(req.body.busca.trim()); // Chama o serviço para buscar professor por nome
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem
        }
        catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
    // Método para mostrar a instituição de um professor
    async mostrarInstituicaoProfessor(req, resp, next) {
        try {
            const { status, mensagem } = await this.servico.mostrarInstituicaoDoProfessor(Number(req.params.id.trim())); // Chama o serviço para mostrar a instituição do professor
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem
        }
        catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
    // Método para mostrar os cursos de um professor
    async mostrarCursosProfessor(req, resp, next) {
        try {
            const { status, mensagem } = await this.servico.mostrarCursosDoProfessor(Number(req.params.id.trim())); // Chama o serviço para mostrar os cursos do professor
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem
        }
        catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
    // Método para mostrar tanto a instituição quanto os cursos de um professor
    async mostrarInstituicaoECursosAoMesmoTempoProfessor(req, resp, next) {
        try {
            const { status, mensagem } = await this.servico.mostrarCursosEInstituicoesDoProfessor(Number(req.params.id.trim())); // Chama o serviço para mostrar cursos e instituição do professor
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem
        }
        catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
}
// Exporta a classe ProfessorController para ser utilizada em outras partes do aplicativo
exports.default = ProfessorController;
//# sourceMappingURL=ProfessorController.js.map