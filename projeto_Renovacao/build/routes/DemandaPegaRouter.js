"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express"); // Importa a função Router do Express
const DemandaPegaController_1 = __importDefault(require("../controller/DemandaPegaController")); // Importa o controlador da DemandaPega
// Cria uma nova instância do controlador da DemandaPega
let API = new DemandaPegaController_1.default();
// Cria uma nova instância do roteador
let rota = (0, express_1.Router)();
// Define as rotas e as funções correspondentes do controlador
rota.post('/:idProfessor/:idDemanda', API.postPegarDemanda.bind(API)); // Rota para criar uma nova demanda associada a um professor
rota.get('/', API.getMostrarTodasAsDemanda.bind(API)); // Rota para listar todas as demandas
rota.put('/:id', API.putAtualizarDemanda.bind(API)); // Rota para atualizar uma demanda específica
rota.patch('/:id', API.patchEntrega.bind(API)); // Rota para marcar uma demanda como entregue
rota.delete('/:id', API.deleteExcluirDemanda.bind(API)); // Rota para excluir uma demanda específica
rota.get('/professores', API.mostrarDemandasProfessores.bind(API)); // Rota para mostrar as demandas de todos os professores
rota.get('/demandas/:id', API.mostrarProfessoresPorDemanda.bind(API)); // Rota para mostrar professores associados a uma demanda específica
rota.get('/professores/:id', API.mostrarDemandasPorProfessor.bind(API)); // Rota para mostrar demandas de um professor específico
rota.get('/professores/demanda/:id', API.mostrarAndamentoDemanda.bind(API)); // Rota para mostrar o andamento de uma demanda específica
// Exporta o roteador para ser usado em outros módulos
exports.default = rota;
//# sourceMappingURL=DemandaPegaRouter.js.map