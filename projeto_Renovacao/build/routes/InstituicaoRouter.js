"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importa a função Router do Express para criar rotas
const express_1 = require("express");
// Importa a classe InstituicaoController que contém a lógica de negócios para instituições
const InstituicaoController_1 = __importDefault(require("../controller/InstituicaoController"));
// Cria uma nova instância do controlador de Instituições
let API = new InstituicaoController_1.default();
// Cria uma nova instância do roteador do Express
let rota = (0, express_1.Router)();
// Define as rotas para as operações relacionadas a instituições
// Rota para obter todas as instituições
rota.get('/', API.getMostrarInstituicoes.bind(API));
// Rota para cadastrar uma nova instituição
rota.post('/', API.postCadastrarInstituicao.bind(API));
// Rota para atualizar uma instituição existente
rota.put('/:id', API.putAtualizarInstituicao.bind(API));
// Rota para atualizar a senha de uma instituição
rota.patch('/:id', API.patchAtualizarSenhaInstituicao.bind(API));
// Rota para deletar uma instituição
rota.delete('/:id', API.deletarInstituicao.bind(API));
// Rota para mostrar todos os cursos de uma determinada instituição
rota.get('/cursos/:id', API.getMostrarTodosOsCursosDeDeterminadaInstituicao.bind(API));
// Rota para buscar instituições a partir de caracteres iniciais
rota.post('/busca', API.buscarInstituicoesPorCaracter.bind(API));
// ///////////////////////////////////LOGIN/////////////////////////////////////////
// Rota para login de uma instituição
rota.post('/login', API.loginControllerInstituicao.bind(API));
// ///////////////////////////////////LOGIN/////////////////////////////////////////
// Exporta as rotas para serem utilizadas em outras partes do aplicativo
exports.default = rota;
//# sourceMappingURL=InstituicaoRouter.js.map