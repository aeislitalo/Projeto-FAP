// Importa os tipos Request, Response e NextFunction do Express para manipulação de requisições e respostas
import { Request, Response, NextFunction } from "express";
// Importa o serviço de curso
import CursoService from "../service/CursoService";

class CursoController {
    private servico = new CursoService();

    // Método para cadastrar curso na instituição
    async postCadastrarCursos(req: Request, resp: Response, next: NextFunction) {
        try {
            const { status, mensagem } = await this.servico.postcadastrarCursoInstituicao(Number(req.params.id), req.body.nome); // Cadastra o curso
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

    // Método para mostrar todos os cursos
    async getMostrarCursos(req: Request, resp: Response, next: NextFunction) {
        try {
            const { status, mensagem } = await this.servico.getMostrarTodosCursos(); // Obtém todos os cursos
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

    // Método para mostrar a instituição pertencente ao curso
    async getMostrarInstituicaoPertencenteAoCurso(req: Request, resp: Response, next: NextFunction) {
        try {
            const { status, mensagem } = await this.servico.getMostrarInstituicaoPertencenteAoCurso(Number(req.params.id)); // Obtém a instituição do curso
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

    // Método para mudar o nome de um curso
    async patchMudarNome(req: Request, resp: Response, next: NextFunction) {
        try {
            const { status, mensagem } = await this.servico.patchMudarNome(Number(req.params.id), req.body.novo_nome); // Atualiza o nome do curso
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

    // Método para deletar um curso
    async deletarCurso(req: Request, resp: Response, next: NextFunction) {
        try {
            const { status, mensagem } = await this.servico.deletarCurso(Number(req.params.id)); // Deleta o curso
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
}

export default CursoController;