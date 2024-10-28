// Importa os tipos Request, Response e NextFunction do Express para manipulação de requisições e respostas
import { Request, Response, NextFunction } from "express";
// Importa o serviço de curso
import Service from "../service/CursoService";

class CursoController {
    private servico = new Service(); // Instância do serviço de curso para uso nos métodos do controlador

    // Método para cadastrar um curso em uma instituição
    async postCadastrarCursos(req: Request, resp: Response, next: NextFunction) {
        try {
            // Cadastra o curso utilizando o id da instituição e o nome do curso do corpo da requisição
            const { status, mensagem } = await this.servico.postcadastrarCursoInstituicao(Number(req.params.id), req.body.nome);
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem do serviço
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

    // Método para mostrar todos os cursos
    async getMostrarCursos(req: Request, resp: Response, next: NextFunction) {
        try {
            // Obtém todos os cursos do serviço
            const { status, mensagem } = await this.servico.getMostrarTodosCursos();
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem do serviço
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

    // Método para mostrar a instituição associada a um curso
    async getMostrarInstituicaoPertencenteAoCurso(req: Request, resp: Response, next: NextFunction) {
        try {
            // Obtém a instituição associada ao curso pelo id do curso
            const { status, mensagem } = await this.servico.getMostrarInstituicaoPertencenteAoCurso(Number(req.params.id));
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem do serviço
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

    // Método para atualizar o nome de um curso
    async patchMudarNome(req: Request, resp: Response, next: NextFunction) {
        try {
            // Atualiza o nome do curso com o novo nome fornecido no corpo da requisição
            const { status, mensagem } = await this.servico.patchMudarNome(Number(req.params.id), req.body.novo_nome);
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem do serviço
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

    // Método para deletar um curso
    async deletarCurso(req: Request, resp: Response, next: NextFunction) {
        try {
            // Deleta o curso utilizando o id do curso da requisição
            const { status, mensagem } = await this.servico.deletarCurso(Number(req.params.id));
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem do serviço
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

    // Método para buscar um curso pelo nome
    async getBuscarCursoPorNome(req: Request, resp: Response, next: NextFunction) {
        try {
            // Busca o curso pelo nome fornecido no corpo da requisição
            const { status, mensagem } = await this.servico.buscarCursoPorNome(req.body.busca.trim());
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem do serviço
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
}

export default CursoController; // Exporta a classe CursoController para uso em outras partes da aplicação
