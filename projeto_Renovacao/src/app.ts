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
// Configura o Swagger UI
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');  // Certifique-se de que esse arquivo exista

// Registra a rota para acessar o Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware de tratamento de erros
app.use((err: Error, req: Request, resp: Response, next: NextFunction) => {
    // Responde com um código de status 500 e a mensagem de erro
    resp.status(500).json({ message: err.message });
});



// Exporta a aplicação para que possa ser utilizada em outros arquivos
export default app;
