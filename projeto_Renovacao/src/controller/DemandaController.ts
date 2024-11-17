import { Request, Response, NextFunction } from "express"; // Importa os tipos Request, Response e NextFunction do Express
import Service from "../service/DemandaService"; // Importa a classe DemandaService

class DemandaController {
    
    private servico = new Service(); // Instância do serviço de demandas para uso nos métodos do controlador

    // Método para cadastrar uma nova demanda para uma empresa
    async postCadastrarDemanda(req: Request, resp: Response, next: NextFunction) {
        try {
            // Chama o método do serviço para cadastrar uma nova demanda
            let { status, mensagem } = await this.servico.postCadastrarDemanda(Number(req.params.id), req.body);
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

    // Método para mostrar a empresa associada a uma demanda específica
    async getMostraEmpresaPorDemanda(req: Request, resp: Response, next: NextFunction) {
        try {
            // Chama o método do serviço para obter a empresa associada a uma demanda
            let { status, mensagem } = await this.servico.getMostrarEmpresasPertencenteHaDemanda(Number(req.params.id));
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

    // Método para mostrar todas as demandas
    async getMostrarDemandas(req: Request, resp: Response, next: NextFunction) {
        try {
            // Chama o método do serviço para obter todas as demandas
            let { status, mensagem } = await this.servico.getMostrarDemandas();
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

    // Método para atualizar uma demanda específica
    async putAtualizarDemanda(req: Request, resp: Response, next: NextFunction) {
        try {
            // Chama o método do serviço para atualizar uma demanda com base no id
            let { status, mensagem } = await this.servico.putAtualizarDemanda(Number(req.params.id), req.body);
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

    // Método para alterar a data de uma demanda específica
    async patchMudarData(req: Request, resp: Response, next: NextFunction) {
        try {
            // Chama o método do serviço para mudar a data da demanda
            let { status, mensagem } = await this.servico.patchMudarData(Number(req.params.id), req.body);
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
    async patchAtualizarPrazo(req: Request, resp: Response, next: NextFunction){
        try {
            // Chama o método do serviço para mudar a data da demanda
            let { status, mensagem } = await this.servico.patchAtualizarPrazo(Number(req.params.id), req.body.novo_prazo);
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

    // Método para deletar uma demanda específica
    async deletarDemanda(req: Request, resp: Response, next: NextFunction) {
        try {
            // Chama o método do serviço para deletar uma demanda com base no id
            let { status, mensagem } = await this.servico.deletarDemandaServico(Number(req.params.id));
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

    // Método para buscar demandas com base nas primeiras letras do título
    async postBuscarDemandasComPrimeirasLetras(req: Request, resp: Response, next: NextFunction) {
        console.log(req.body.busca); // Exibe o corpo da requisição no console para depuração
        try {
            // Chama o método do serviço para buscar demandas com base nas primeiras letras fornecidas
            let { status, mensagem } = await this.servico.MostrarDemandasHaPartirDasPrimeirasLetras(req.body.busca.trim());
            resp.status(status).json(mensagem); // Retorna a resposta com status e mensagem
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
}

export default DemandaController; // Exporta a classe DemandaController para uso em outras partes da aplicação
