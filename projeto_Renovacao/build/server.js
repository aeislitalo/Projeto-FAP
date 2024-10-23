"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importa a instância da aplicação Express do arquivo app.ts
const app_1 = __importDefault(require("./app"));
// Define a porta na qual o servidor irá escutar
let port = 3333;
// Inicia o servidor, escutando na porta especificada
app_1.default.listen(port, () => console.log("Servidor Rodando!!"));
