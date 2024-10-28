import { Request, Response, NextFunction } from "express"; // Importa os tipos Request, Response e NextFunction do Express
import Service from "../service/DemandaPegaService"; // Importa a classe DemandaService que contém a lógica de negócios

// Define a classe DemandaPegaController
class DemandaPegaController {
    private servico = new Service(); // Cria uma instância do serviço DemandaPegaService

    // Método assíncrono para obter todas as demandas
    async getMostrarTodasAsDemanda(req: Request, resp: Response, next: NextFunction) {
        try {
            // Chama o serviço para obter demandas pegadas e desestrutura o status e a mensagem
            const { status, mensagem } = await this.servico.getObterDemandasPegas();
            // Retorna a resposta com o status e a mensagem
            resp.status(status).json(mensagem);
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

    // Método assíncrono para pegar uma demanda específica
    async postPegarDemanda(req: Request, resp: Response, next: NextFunction) {
        try {
            // Chama o serviço para pegar uma demanda com base nos parâmetros fornecidos e desestrutura o status e a mensagem
            const { status, mensagem } = await this.servico.postPegarDemanda(req.body, Number(req.params.idProfessor), Number(req.params.idDemanda));
            // Retorna a resposta com o status e a mensagem
            resp.status(status).json(mensagem);
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

    // Método assíncrono para atualizar a entrega de uma demanda
    async patchEntrega(req: Request, resp: Response, next: NextFunction) {
        try {
            // Chama o serviço para atualizar a entrega da demanda pegada
            const { status, mensagem } = await this.servico.patchAtualizarEntregaDemandaPega(Number(req.params.id));
            // Retorna a resposta com o status e a mensagem
            resp.status(status).json(mensagem);
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

    // Método assíncrono para atualizar uma demanda
    async putAtualizoDemanda(req: Request, resp: Response, next: NextFunction) {
        try {
            // Chama o serviço para atualizar a descrição da demanda pegada
            const { status, mensagem } = await this.servico.putAtualizarDemandaPega(req.body.descricao, Number(req.params.id));
            // Retorna a resposta com o status e a mensagem
            resp.status(status).json(mensagem);
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

    // Método assíncrono para excluir uma demanda
    async deleteExcluirDemanda(req: Request, resp: Response, next: NextFunction) {
        try {
            // Chama o serviço para deletar uma demanda pegada com base no id fornecido
            const { status, mensagem } = await this.servico.deletarDemandaPega(Number(req.params.id));
            // Retorna a resposta com o status e a mensagem
            resp.status(status).json(mensagem);
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

    // Método assíncrono para mostrar todas as demandas pegadas pelos professores
    async mostrarDemandasProfessores(req: Request, resp: Response, next: NextFunction) {
        try {
            // Chama o serviço para obter todas as demandas pegadas pelos professores
            const { status, mensagem } = await this.servico.mostrarTodasDemandasPegasPelosProfessores();
            // Retorna a resposta com o status e a mensagem
            resp.status(status).json(mensagem);
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

    // Método assíncrono para mostrar professores associados a uma demanda específica
    async mostrarProfessoresPorDemanda(req: Request, resp: Response, next: NextFunction) {
        try {
            // Chama o serviço para mostrar todos os professores de uma demanda específica
            const { status, mensagem } = await this.servico.mostrarTodosOspProfessoresDeUmaDemanda(Number(req.params.id));
            // Retorna a resposta com o status e a mensagem
            resp.status(status).json(mensagem);
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

    // Método assíncrono para mostrar todas as demandas de um professor específico
    async mostrarDemandasPorProfessor(req: Request, resp: Response, next: NextFunction) {
        try {
            // Chama o serviço para mostrar todas as demandas de um professor específico
            const { status, mensagem } = await this.servico.mostrarTodasAsDemandasDeUmProfessor(Number(req.params.id));
            // Retorna a resposta com o status e a mensagem
            resp.status(status).json(mensagem);
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
    // Método para exibir o andamento de uma demanda para um professor específico
    async mostrarAndamentoDemanda(req: Request, resp: Response, next: NextFunction) {
    try {
        // Chama o serviço para obter o andamento das demandas de um professor, convertendo o ID da URL para número
        const { status, mensagem } = await this.servico.mostrarAndamentoDemanda(Number(req.params.id));
        
        // Envia a resposta com o status e a mensagem retornados pelo serviço
        resp.status(status).json(mensagem);
    } catch (error) {
        // Encaminha qualquer erro ocorrido para o middleware de tratamento de erros
        next(error);
    }
}

  
}

// Exporta a classe DemandaPegaController
export default DemandaPegaController;
