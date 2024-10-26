import { Router } from "express"; // Importa a função Router do Express
import EmpresaController from "../controller/EmpresaController"; // Importa a classe EmpresaController

// Cria uma nova instância do controlador de empresa
let API = new EmpresaController();
// Cria uma nova instância do roteador
let empresaRota = Router();

// Define as rotas para as operações de empresa
empresaRota.post('/empresas', API.postCadastrarEmpresa.bind(API)); // Rota para cadastrar uma nova empresa
empresaRota.get('/empresas', API.getMostrarEmpresas.bind(API)); // Rota para listar todas as empresas
empresaRota.put('/empresas/:id', API.putMudarDadosEmpresas.bind(API)); // Rota para atualizar dados de uma empresa pelo ID
empresaRota.patch('/empresas/:id', API.patchMudarSenha.bind(API)); // Rota para mudar a senha de uma empresa pelo ID
empresaRota.delete('/empresas/:id', API.deletarEmpresa.bind(API)); // Rota para deletar uma empresa pelo ID
empresaRota.post('/empresasLetras',API.postMostrarEmpresasComPrimeirasLetras.bind(API));
///////////////////////////////////////////////////////// ROTAS DEMANDA /////////////////////////////////////////////////////////////////////////////////////////////////////
empresaRota.post('/demandas/:id', API.postCadastrarDemanda.bind(API)); // Rota para cadastrar uma demanda associada a uma empresa
empresaRota.post('/demandasLetras',API.postMostrarDemandasComPrimeirasLetras.bind(API));
empresaRota.get('/demandasEmpresa/:id', API.getMostrarDemandasEmpresas.bind(API)); // Rota para mostrar as demandas de uma empresa pelo ID
empresaRota.get('/demandas', API.getMostrarDemandas.bind(API)); // Rota para listar todas as demandas
empresaRota.put('/demandas/:id', API.putAtualizarDemanda.bind(API)); // Rota para atualizar uma demanda pelo ID
empresaRota.patch('/demandas/:id', API.patchMudarData.bind(API)); // Rota para mudar a data de uma demanda pelo ID
empresaRota.delete('/demandas/:id', API.deletarDemanda.bind(API)); // Rota para deletar uma demanda pelo ID
empresaRota.get('/empresaDemanda/:id', API.getMostraEmpresaPorDemanda.bind(API)); // Rota para mostrar empresa associada há demanda
///////////////////////////////////////////////////////// ROTAS LOGIN /////////////////////////////////////////////////////////////////////////////////////////////////////
empresaRota.post('/empresasLogin', API.postLoginEmpresa.bind(API));
// Exporta as rotas de empresa
export default empresaRota;
