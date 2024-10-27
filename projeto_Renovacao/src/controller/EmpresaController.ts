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

            let { status, mensagem } = await this.servico.put(Number(req.params.id), req.body); // Chama o método put do serviço
            resp.status(status).json(mensagem); // Retorna a resposta com o status e a mensagem
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

    // Método para mudar a senha de uma empresa
    async patchMudarSenha(req: Request, resp: Response, next: NextFunction) {
        try {

            let { status, mensagem } = await this.servico.patch(Number(req.params.id), req.body); // Chama o método patch do serviço
            resp.status(status).json(mensagem); // Retorna a resposta com o status e a mensagem
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

    // Método para deletar uma empresa
    async deletarEmpresa(req: Request, resp: Response, next: NextFunction) {
        try {
            let { status, mensagem } = await this.servico.deletar(Number(req.params.id)); // Chama o método deletar do serviço
            resp.status(status).json(mensagem); // Retorna a resposta com o status e a mensagem
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
   async postMostrarEmpresasComPrimeirasLetras(req: Request, resp: Response, next: NextFunction){
    try {
        let { status, mensagem } = await this.servico.MostrarEmpresasHaPartirDasPrimeirasLetras(req.body.busca.trim()); // Chama o método 
        resp.status(status).json(mensagem); // Retorna a resposta com o status e a mensagem
    } catch (error) {
        next(error); // Passa o erro para o middleware de tratamento de erros
    }
   }
    /////////////////////////////////// CHAMADA METODOS DE DEMANDAS //////////////////////////////////////////////////////////////
    // Método para cadastrar uma nova demanda para uma empresa
    async postCadastrarDemanda(req: Request, resp: Response, next: NextFunction) {
        try {

            let { status, mensagem } = await this.servico.postCadastrarDemanda(Number(req.params.id), req.body); // Chama o método para cadastrar demanda
            resp.status(status).json(mensagem); // Retorna a resposta com o status e a mensagem
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

    // Método para mostrar as demandas de uma empresa
    async getMostrarDemandasEmpresas(req: Request, resp: Response, next: NextFunction) {
        try {

            let { status, mensagem } = await this.servico.getMostrarDemandasEmpresas(Number(req.params.id)); // Chama o método para mostrar demandas da empresa
            resp.status(status).json(mensagem); // Retorna a resposta com o status e a mensagem
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
    async getMostraEmpresaPorDemanda(req: Request, resp: Response, next: NextFunction) {
        try {

            let { status, mensagem } = await this.servico.getMostrarEmpresasPertencenteHaDemanda(Number(req.params.id));// Chama o método para mostrar empresa da demanda
            resp.status(status).json(mensagem); // Retorna a resposta com o status e a mensagem
        } catch (error) {
            next(error);
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

            let { status, mensagem } = await this.servico.putAtualizarDemanda(Number(req.params.id), req.body); // Chama o método para atualizar a demanda
            resp.status(status).json(mensagem); // Retorna a resposta com o status e a mensagem
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

    // Método para mudar a data de uma demanda
    async patchMudarData(req: Request, resp: Response, next: NextFunction) {
        try {

            let { status, mensagem } = await this.servico.patchMudarData(Number(req.params.id), req.body); // Chama o método para mudar a data da demanda
            resp.status(status).json(mensagem); // Retorna a resposta com o status e a mensagem
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

    // Método para deletar uma demanda
    async deletarDemanda(req: Request, resp: Response, next: NextFunction) {
        try {

            let { status, mensagem } = await this.servico.deletarDemandaServico(Number(req.params.id)); // Chama o método para deletar a demanda
            resp.status(status).json(mensagem); // Retorna a resposta com o status e a mensagem
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
    async postMostrarDemandasComPrimeirasLetras(req: Request, resp: Response, next: NextFunction){
        try {
            let { status, mensagem } = await this.servico.MostrarDemandasHaPartirDasPrimeirasLetras(req.body.busca.trim()); // Chama o método 
            resp.status(status).json(mensagem); // Retorna a resposta com o status e a mensagem
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
    ////////////////////////////// LOGIN EMPRESA//////////////////////////////////////////////////////////////
    // Método para realizar o login da empresa
    async postLoginEmpresa(req: Request, resp: Response, next: NextFunction) {
        try {
            // Chama o serviço responsável por validar o login, passando o email e a senha como parâmetros
            // O serviço retorna um objeto com o status HTTP e uma mensagem de resposta
            let { status, mensagem } = await this.servico.postLoginEmpresa(req.body.email.trim(), req.body.senha.trim());

            // Envia a resposta ao cliente com o código de status apropriado e a mensagem em formato JSON
            resp.status(status).json(mensagem);
        } catch (error) {
            // Em caso de erro, o middleware de tratamento de erros é chamado, passando o erro adiante
            next(error);
        }
    }

    
}

export default EmpresaController; // Exporta a classe EmpresaController
