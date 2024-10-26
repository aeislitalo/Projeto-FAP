import { Request, Response, NextFunction } from "express";
import InstituicaoService from "../service/InstituicaoService";

class InstituicaoController {
    private servico = new InstituicaoService();

    // Método para mostrar todas as instituições
    async getMostrarInstituicoes(req: Request, resp: Response, next: NextFunction) {
        try {
            const { status, mensagem } = await this.servico.get();
            resp.status(status).json(mensagem);
        } catch (error) {
            next(error);
        }
    }

    // Método para cadastrar uma nova instituição
    async postCadastrarInstituicao(req: Request, resp: Response, next: NextFunction) {
        try {
            const { status, mensagem } = await this.servico.postCadastrarInstituicao(req.body);
            resp.status(status).json(mensagem);
        } catch (error) {
            next(error);
        }
    }

    // Método para atualizar uma instituição existente
    async putAtualizarInstituicao(req: Request, resp: Response, next: NextFunction) {
        try {
            const { status, mensagem } = await this.servico.putAtualizarInstituicao(Number(req.params.id), req.body);
            resp.status(status).json(mensagem);
        } catch (error) {
            next(error);
        }
    }

    // Método para atualizar a senha de uma instituição
    async patchAtualizarSenhaInstituicao(req: Request, resp: Response, next: NextFunction) {
        try {
            const { status, mensagem } = await this.servico.patchMudarSenhaInstituicao(Number(req.params.id), req.body);
            resp.status(status).json(mensagem);
        } catch (error) {
            next(error);
        }
    }

    // Método para deletar uma instituição
    async deletarInstituicao(req: Request, resp: Response, next: NextFunction) {
        try {
            const { status, mensagem } = await this.servico.deletarInstituicao(Number(req.params.id));
            resp.status(status).json(mensagem);
        } catch (error) {
            next(error);
        }
    }

    // Método para login da instituição
    async loginControllerInstituicao(req: Request, resp: Response, next: NextFunction) {
        try {
            const { status, mensagem } = await this.servico.loginInstituicao(req.body.email.trim(), req.body.senha.trim());
            resp.status(status).json(mensagem);
        } catch (error) {
            next(error);
        }
    }

    // Método para cadastrar curso na instituição
    async postCadastrarCursos(req: Request, resp: Response, next: NextFunction) {
        try {
            const { status, mensagem } = await this.servico.cadastrarCursoInstituicao(Number(req.params.id), req.body.nome);
            resp.status(status).json(mensagem);
        } catch (error) {
            next(error);
        }
    }
}

export default InstituicaoController;
