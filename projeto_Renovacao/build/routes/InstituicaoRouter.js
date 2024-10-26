"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express"); // Importa a função Router do Express
const InstituicaoController_1 = __importDefault(require("../controller/InstituicaoController")); // Importa a classe InstituicaoController
// Cria uma nova instância do controlador de Instituição
let API = new InstituicaoController_1.default();
// Cria uma nova instância do roteador
let instituicaoRota = (0, express_1.Router)();
// Define as rotas para as operações de instituicao
instituicaoRota.get('/instituicoes', API.getMostrarInstituicoes.bind(API));
instituicaoRota.post('/instituicoes', API.postCadastrarInstituicao.bind(API));
instituicaoRota.put('/instituicoes/:id', API.putAtualizarInstituicao.bind(API));
instituicaoRota.patch('/instituicoes/:id', API.patchAtualizarSenhaInstituicao.bind(API));
instituicaoRota.delete('/instituicoes/:id', API.deletarInstituicao.bind(API));
/////////////////////////////////LOGIN/////////////////////////////////////////
instituicaoRota.post('/instituicoesLogin', API.loginControllerInstituicao.bind(API));
/////////////////////////////////LOGIN/////////////////////////////////////////
instituicaoRota.post('/instituicoes/:id/cursos', API.postCadastrarCursos.bind(API));
exports.default = instituicaoRota;
//# sourceMappingURL=InstituicaoRouter.js.map