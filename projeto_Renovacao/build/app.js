"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importa o módulo express e os tipos necessários para TypeScript
const express_1 = __importDefault(require("express"));
// Importa as rotas definidas em outro arquivo
const routes_1 = __importDefault(require("./routes"));
// Cria uma instância da aplicação Express
let app = (0, express_1.default)();
// Middleware para analisar o corpo das requisições em formato JSON
app.use(express_1.default.json());
// Utiliza as rotas importadas
app.use(routes_1.default);
// Middleware de tratamento de erros
app.use((err, req, resp, next) => {
    // Responde com um código de status 500 e a mensagem de erro
    resp.status(500).json({ message: err.message });
});
// Exporta a aplicação para que possa ser utilizada em outros arquivos
exports.default = app;
//# sourceMappingURL=app.js.map