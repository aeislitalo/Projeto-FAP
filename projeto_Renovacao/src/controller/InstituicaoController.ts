import { Request, Response, NextFunction } from "express"; // Importa os tipos Request, Response e NextFunction do Express
import InstituicaoService from "../service/InstituicaoService"; // Importa a classe InstituicaoService, que contém a lógica de negócio

class InstituicaoController {
    private servico = new InstituicaoService(); // Instancia a classe de serviço para poder utilizar seus métodos

    // Método para mostrar todas as instituições
    async getMostrarInstituicoes(req: Request, resp: Response, next: NextFunction) {
        try {
            // Chama o método get do serviço e desestrutura o resultado
            let { status, mensagem } = await this.servico.get();
            resp.status(status).json(mensagem); // Retorna a resposta com o status HTTP e a mensagem
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

    // Método para cadastrar uma nova instituição
    async postCadastrarInstituicao(req: Request, resp: Response, next: NextFunction) {
        try {
            // Chama o método postCadastrarIntituicao do serviço e desestrutura o resultado
            let { status, mensagem } = await this.servico.postCadastrarIntituicao(req.body);
            resp.status(status).json(mensagem); // Retorna a resposta com o status HTTP e a mensagem
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

    // Método para atualizar uma instituição existente
    async putAtualizarInstituicao(req: Request, resp: Response, next: NextFunction) {
        try {
            let idInstituicao = Number(req.params.id); // Converte o ID da instituição de string para número
            // Chama o método putAtualizarIntituicao do serviço e desestrutura o resultado
            let { status, mensagem } = await this.servico.putAtualizarIntituicao(idInstituicao, req.body);
            resp.status(status).json(mensagem); // Retorna a resposta com o status HTTP e a mensagem
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

    // Método para atualizar a senha de uma instituição
    async patchAtualizarSenhaInstituicao(req: Request, resp: Response, next: NextFunction) {
        try {
            let idInstituicao = Number(req.params.id); // Converte o ID da instituição de string para número
            // Chama o método patchMudarSenhaInstituicao do serviço e desestrutura o resultado
            let { status, mensagem } = await this.servico.patchMudarSenhaInstituicao(idInstituicao, req.body);
            resp.status(status).json(mensagem); // Retorna a resposta com o status HTTP e a mensagem
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

    // Método para deletar uma instituição
    async deletarInstittuicao(req: Request, resp: Response, next: NextFunction) {
        try {
            let idInstituicao = Number(req.params.id); // Converte o ID da instituição de string para número
            // Chama o método deletarInstituicao do serviço e desestrutura o resultado
            let { status, mensagem } = await this.servico.deletarInstituicao(idInstituicao);
            resp.status(status).json(mensagem); // Retorna a resposta com o status HTTP e a mensagem de sucesso
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
}

export default InstituicaoController; // Exporta a classe InstituicaoController para ser usada em outras partes da aplicação
