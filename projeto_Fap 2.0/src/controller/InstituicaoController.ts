import { Request, Response, NextFunction } from "express"; // Importa os tipos Request, Response e NextFunction do Express
import InstituicaoService from "../service/InstituicaoService"; // Importa a classe InstituicaoService


class InstituicaoController {
    private servico = new InstituicaoService();
    // Método para mostrar todas as instituições
    async getMostrarInstituicoes(req: Request, resp: Response, next: NextFunction) {
        try {
            // Chama o método get do serviço e desestrutura o resultado
            let { status, mensagem } = await this.servico.get();
            resp.status(status).json(mensagem); // Retorna a resposta com o status e a mensagem
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
}

export default InstituicaoController;
