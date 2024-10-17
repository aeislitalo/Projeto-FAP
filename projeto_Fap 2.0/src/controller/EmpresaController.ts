import { Request, Response, NextFunction } from "express"; // Importa os tipos Request, Response e NextFunction do Express
import EmpresaService from "../service/EmpresaService"; // Importa a classe EmpresaService

class EmpresaController {
    private servico = new EmpresaService(); // Cria uma instância do serviço de empresa

    // Método para cadastrar uma nova empresa
    async postCadastrarEmpresa(req: Request, resp: Response, next: NextFunction) {
        try {
            // Chama o método post do serviço e desestrutura o resultado
            let { status, mensagem } = await this.servico.post(req.body);
            resp.status(status).json(mensagem); // Retorna a resposta com o status e a mensagem
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

    // Método para mostrar todas as empresas
    async getMostrarEmpresas(req: Request, resp: Response, next: NextFunction) {
        try {
            // Chama o método get do serviço e desestrutura o resultado
            let { status, mensagem } = await this.servico.get();
            resp.status(status).json(mensagem); // Retorna a resposta com o status e a mensagem
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

    // Método para atualizar os dados de uma empresa
    async putMudarDadosEmpresas(req: Request, resp: Response, next: NextFunction) {
        try {
            let parametroURL = Number(req.params.id); // Obtém o parâmetro ID da URL e converte para número
            let { status, mensagem } = await this.servico.put(parametroURL, req.body); // Chama o método put do serviço
            resp.status(status).json(mensagem); // Retorna a resposta com o status e a mensagem
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

    // Método para mudar a senha de uma empresa
    async patchMudarSenha(req: Request, resp: Response, next: NextFunction) {
        try {
            let parametroURL = Number(req.params.id); // Obtém o parâmetro ID da URL e converte para número
            let { status, mensagem } = await this.servico.patch(parametroURL, req.body); // Chama o método patch do serviço
            resp.status(status).json(mensagem); // Retorna a resposta com o status e a mensagem
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

    // Método para deletar uma empresa
    async deletarEmpresa(req: Request, resp: Response, next: NextFunction) {
        try {
            let parametroURL = Number(req.params.id); // Obtém o parâmetro ID da URL e converte para número
            let { status, mensagem } = await this.servico.deletar(parametroURL); // Chama o método deletar do serviço
            resp.status(status).json(mensagem); // Retorna a resposta com o status e a mensagem
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

    // Método para cadastrar uma nova demanda para uma empresa
    async postCadastrarDemanda(req: Request, resp: Response, next: NextFunction) {
        try {
            let parametroURL = Number(req.params.id); // Obtém o parâmetro ID da URL e converte para número
            let { status, mensagem } = await this.servico.postCadastrarDemanda(parametroURL, req.body); // Chama o método para cadastrar demanda
            resp.status(status).json(mensagem); // Retorna a resposta com o status e a mensagem
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

    // Método para mostrar as demandas de uma empresa
    async getMostrarDemandasEmpresas(req: Request, resp: Response, next: NextFunction) {
        try {
            let parametroURL = Number(req.params.id); // Obtém o parâmetro ID da URL e converte para número
            let { status, mensagem } = await this.servico.getMostrarDemandasEmpresas(parametroURL); // Chama o método para mostrar demandas da empresa
            resp.status(status).json(mensagem); // Retorna a resposta com o status e a mensagem
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

    // Método para mostrar todas as demandas
    async getMostrarDemandas(req: Request, resp: Response, next: NextFunction) {
        try {
            let { status, mensagem } = await this.servico.getMostrarDemandas(); // Chama o método para mostrar todas as demandas
            resp.status(status).json(mensagem); // Retorna a resposta com o status e a mensagem
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

    // Método para atualizar uma demanda
    async putAtualizarDemanda(req: Request, resp: Response, next: NextFunction) {
        try {
            let parametroURL = Number(req.params.id); // Obtém o parâmetro ID da URL e converte para número
            let { status, mensagem } = await this.servico.putAtualizarDemanda(parametroURL, req.body); // Chama o método para atualizar a demanda
            resp.status(status).json(mensagem); // Retorna a resposta com o status e a mensagem
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

    // Método para mudar a data de uma demanda
    async patchMudarData(req: Request, resp: Response, next: NextFunction) {
        try {
            let parametroURL = Number(req.params.id); // Obtém o parâmetro ID da URL e converte para número
            let { status, mensagem } = await this.servico.patchMudarData(parametroURL, req.body); // Chama o método para mudar a data da demanda
            resp.status(status).json(mensagem); // Retorna a resposta com o status e a mensagem
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

    // Método para deletar uma demanda
    async deletarDemanda(req: Request, resp: Response, next: NextFunction) {
        try {
            let parametroURL = Number(req.params.id); // Obtém o parâmetro ID da URL e converte para número
            let { status, mensagem } = await this.servico.deletarDemandaServico(parametroURL); // Chama o método para deletar a demanda
            resp.status(status).json(mensagem); // Retorna a resposta com o status e a mensagem
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
}

export default EmpresaController; // Exporta a classe EmpresaController
