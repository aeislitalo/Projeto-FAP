"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express"); // Importa a função Router do Express
const EmpresaController_1 = __importDefault(require("../controller/EmpresaController")); // Importa a classe EmpresaController
// Cria uma nova instância do controlador de empresa
let empresaDemanda = new EmpresaController_1.default();
// Cria uma nova instância do roteador
let empresaRota = (0, express_1.Router)();
// Define as rotas para as operações de empresa
empresaRota.post('/empresa', empresaDemanda.postCadastrarEmpresa.bind(empresaDemanda)); // Rota para cadastrar uma nova empresa
empresaRota.get('/empresas', empresaDemanda.getMostrarEmpresas.bind(empresaDemanda)); // Rota para listar todas as empresas
empresaRota.put('/empresa/:id', empresaDemanda.putMudarDadosEmpresas.bind(empresaDemanda)); // Rota para atualizar dados de uma empresa pelo ID
empresaRota.patch('/empresa/:id', empresaDemanda.patchMudarSenha.bind(empresaDemanda)); // Rota para mudar a senha de uma empresa pelo ID
empresaRota.delete('/empresa/:id', empresaDemanda.deletarEmpresa.bind(empresaDemanda)); // Rota para deletar uma empresa pelo ID
///////////////////////////////////////////////////////// ROTAS DEMANDA /////////////////////////////////////////////////////////////////////////////////////////////////////
empresaRota.post('/empresaDemanda/:id', empresaDemanda.postCadastrarDemanda.bind(empresaDemanda)); // Rota para cadastrar uma demanda associada a uma empresa
empresaRota.get('/empresaDemanda/:id', empresaDemanda.getMostrarDemandasEmpresas.bind(empresaDemanda)); // Rota para mostrar as demandas de uma empresa pelo ID
empresaRota.get('/demandas', empresaDemanda.getMostrarDemandas.bind(empresaDemanda)); // Rota para listar todas as demandas
empresaRota.put('/demanda/:id', empresaDemanda.putAtualizarDemanda.bind(empresaDemanda)); // Rota para atualizar uma demanda pelo ID
empresaRota.patch('/demanda/:id', empresaDemanda.patchMudarData.bind(empresaDemanda)); // Rota para mudar a data de uma demanda pelo ID
empresaRota.delete('/demanda/:id', empresaDemanda.deletarDemanda.bind(empresaDemanda)); // Rota para deletar uma demanda pelo ID
///////////////////////////////////////////////////////// ROTAS LOGIN /////////////////////////////////////////////////////////////////////////////////////////////////////
empresaRota.post('/empresaLogin', empresaDemanda.postLoginEmpresa.bind(empresaDemanda));
// Exporta as rotas de empresa
exports.default = empresaRota;
