"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importa o serviço de curso
const CursoService_1 = __importDefault(require("../service/CursoService"));
class CursoController {
    servico = new CursoService_1.default(); // Instância do serviço de curso para uso nos métodos do controlador
    // Método para cadastrar um curso em uma instituição
    async postCadastrarCursos(req, resp, next) {
        try {
            // Cadastra o curso utilizando o id da instituição e o nome do curso do corpo da requisição
            const { status, mensagem } = await this.servico.postcadastrarCursoInstituicao(Number(req.params.id), req.body.nome);
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem do serviço
        }
        catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
    // Método para mostrar todos os cursos
    async getMostrarCursos(req, resp, next) {
        try {
            // Obtém todos os cursos do serviço
            const { status, mensagem } = await this.servico.getMostrarTodosCursos();
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem do serviço
        }
        catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
    // Método para mostrar a instituição associada a um curso
    async getMostrarInstituicaoPertencenteAoCurso(req, resp, next) {
        try {
            // Obtém a instituição associada ao curso pelo id do curso
            const { status, mensagem } = await this.servico.getMostrarInstituicaoPertencenteAoCurso(Number(req.params.id));
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem do serviço
        }
        catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
    // Método para atualizar o nome de um curso
    async patchMudarNome(req, resp, next) {
        try {
            // Atualiza o nome do curso com o novo nome fornecido no corpo da requisição
            const { status, mensagem } = await this.servico.patchMudarNome(Number(req.params.id), req.body.novo_nome);
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem do serviço
        }
        catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
    // Método para deletar um curso
    async deletarCurso(req, resp, next) {
        try {
            // Deleta o curso utilizando o id do curso da requisição
            const { status, mensagem } = await this.servico.deletarCurso(Number(req.params.id));
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem do serviço
        }
        catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
    // Método para buscar um curso pelo nome
    async postBuscarCursoPorNome(req, resp, next) {
        try {
            // Busca o curso pelo nome fornecido no corpo da requisição
            const { status, mensagem } = await this.servico.buscarCursoPorNome(req.body.busca.trim());
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem do serviço
        }
        catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
}
exports.default = CursoController; // Exporta a classe CursoController para uso em outras partes da aplicação
//# sourceMappingURL=CursoController.js.map