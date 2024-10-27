import { Request, Response, NextFunction } from "express"; // Importa os tipos Request, Response e NextFunction do Express
import DemandaService from "../service/DemandaService"; // Importa a classe EmpresaService

class DemandaController {

    private servico = new DemandaService();
    
    // Método para cadastrar uma nova demanda para uma empresa
    async postCadastrarDemanda(req: Request, resp: Response, next: NextFunction) {
        try {

            let { status, mensagem } = await this.servico.postCadastrarDemanda(Number(req.params.id), req.body); // Chama o método para cadastrar demanda
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
    async postBuscarDemandasComPrimeirasLetras(req: Request, resp: Response, next: NextFunction){
        console.log(req.body);
        try {
          
            let { status, mensagem } = await this.servico.MostrarDemandasHaPartirDasPrimeirasLetras(req.body.busca.trim()); // Chama o método 
            resp.status(status).json(mensagem); // Retorna a resposta com o status e a mensagem
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
}

export default DemandaController;

