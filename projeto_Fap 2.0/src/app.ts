// Importa o módulo express e os tipos necessários para TypeScript
import express, { NextFunction, Request, Response } from "express";
// Importa as rotas definidas em outro arquivo
import router from './routes';

// Cria uma instância da aplicação Express
let app = express();

// Middleware para analisar o corpo das requisições em formato JSON
app.use(express.json());

// Utiliza as rotas importadas
app.use(router);

// Middleware de tratamento de erros
app.use((err: Error, req: Request, resp: Response, next: NextFunction) => {
    // Responde com um código de status 500 e a mensagem de erro
    resp.status(500).json({ message: err.message });
});

// Exporta a aplicação para que possa ser utilizada em outros arquivos
export default app;
