// Importa os tipos Request, Response e NextFunction do Express para manipulação de requisições e respostas
import { Request, Response, NextFunction } from "express"; 
// Importa o serviço de instituições
import InstituicaoService from "../service/InstituicaoService"; 

// Classe InstituicaoController para gerenciar as rotas relacionadas a instituições
class InstituicaoController {
    private servico = new InstituicaoService(); // Instância do serviço de instituições

    // Método para mostrar todas as instituições
    async getMostrarInstituicoes(req: Request, resp: Response, next: NextFunction) {
        try {
            const { status, mensagem } = await this.servico.get(); // Chama o serviço para obter instituições
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

    // Método para cadastrar uma nova instituição
    async postCadastrarInstituicao(req: Request, resp: Response, next: NextFunction) {
        try {
            const { status, mensagem } = await this.servico.postCadastrarInstituicao(req.body); // Cadastra nova instituição
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

    // Método para atualizar uma instituição existente
    async putAtualizarInstituicao(req: Request, resp: Response, next: NextFunction) {
        try {
            const { status, mensagem } = await this.servico.putAtualizarInstituicao(Number(req.params.id), req.body); // Atualiza a instituição
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

    // Método para atualizar a senha de uma instituição
    async patchAtualizarSenhaInstituicao(req: Request, resp: Response, next: NextFunction) {
        try {
            const { status, mensagem } = await this.servico.patchMudarSenhaInstituicao(Number(req.params.id), req.body); // Atualiza a senha da instituição
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

    // Método para deletar uma instituição
    async deletarInstituicao(req: Request, resp: Response, next: NextFunction) {
        try {
            const { status, mensagem } = await this.servico.deletarInstituicao(Number(req.params.id)); // Deleta a instituição
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

    // Método para login da instituição
    async loginControllerInstituicao(req: Request, resp: Response, next: NextFunction) {
        try {
            const { status, mensagem } = await this.servico.loginInstituicao(req.body.email.trim(), req.body.senha.trim()); // Realiza o login da instituição
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
    // Método de busca por caracter
    async buscarInstituicoesPorCaracter(req: Request, resp: Response, next: NextFunction){
        try {
            const { status, mensagem } = await this.servico.buscarInstituicoesHaPartirDasPrimeirasLetras(req.body.busca.trim()); // Realiza o login da instituição
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
    ///////////////////////////////////METODOS CURSO////////////////////////////////////////////

    // Método para cadastrar curso na instituição
    async postCadastrarCursos(req: Request, resp: Response, next: NextFunction) {
        try {
            const { status, mensagem } = await this.servico.postcadastrarCursoInstituicao(Number(req.params.id), req.body.nome); // Cadastra o curso
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

    // Método para mostrar todos os cursos de uma determinada instituição
    async getMostrarTodosOsCursosDeDeterminadaInstituicao(req: Request, resp: Response, next: NextFunction) {
        try {
            const { status, mensagem } = await this.servico.getMostrarCursosInstituicao(Number(req.params.id)); // Obtém os cursos da instituição
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

// Exporta a classe InstituicaoController para ser utilizada em outras partes do aplicativo
export default InstituicaoController;
