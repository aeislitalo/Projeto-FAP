"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importa a função Router do Express para criar rotas
const express_1 = require("express");
// Importa a classe ProfessorController que contém a lógica de negócios para professores
const ProfessorController_1 = __importDefault(require("../controller/ProfessorController"));
// Cria uma nova instância do controlador de Professores
let API = new ProfessorController_1.default();
// Cria uma nova instância do roteador do Express
let rota = (0, express_1.Router)();
// Define as rotas para as operações relacionadas a professores
// Rota para obter todos os professores
rota.get('/', API.getMostrarProfessores.bind(API));
// Rota para cadastrar um novo professor, vinculando ao ID do curso e da instituição
rota.post('/:idCurso/:idInstituicao', API.postCadastroProfessores.bind(API));
// Rota para atualizar os dados de um professor existente
rota.put('/:id', API.putAtualizarProfessores.bind(API));
// Rota para atualizar a senha de um professor
rota.patch('/:id', API.patchMudarSenha.bind(API));
// Rota para deletar um professor
rota.delete('/:id', API.deleteExcluirProfessor.bind(API));
// Rota para buscar professores pelo nome
rota.post('/busca', API.buscarPorNome.bind(API));
// Rota para mostrar os cursos de um professor
rota.get('/cursos/:id', API.mostrarCursosProfessor.bind(API));
// Rota para mostrar a instituição de um professor
rota.get('/instituicoes/:id', API.mostrarInstituicaoProfessor.bind(API));
// Rota para mostrar a instituição e os cursos de um professor ao mesmo tempo
rota.get('/instituicoes/cursos/:id', API.mostrarInstituicaoECursosAoMesmoTempoProfessor.bind(API));
// Exporta as rotas para serem utilizadas em outras partes do aplicativo
exports.default = rota;
//# sourceMappingURL=ProfessorRouter.js.map