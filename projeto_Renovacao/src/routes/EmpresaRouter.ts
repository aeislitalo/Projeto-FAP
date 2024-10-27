import { Router } from "express"; // Importa a função Router do Express
import EmpresaController from "../controller/EmpresaController"; // Importa a classe EmpresaController

// Cria uma nova instância do controlador de empresa
let API = new EmpresaController();
// Cria uma nova instância do roteador
let empresaRota = Router();

// Define as rotas para as operações de empresa
empresaRota.post('/', API.postCadastrarEmpresa.bind(API)); // Rota para cadastrar uma nova empresa
empresaRota.get('/', API.getMostrarEmpresas.bind(API)); // Rota para listar todas as empresas
empresaRota.put('/:id', API.putMudarDadosEmpresas.bind(API)); // Rota para atualizar dados de uma empresa pelo ID
empresaRota.patch('/:id', API.patchMudarSenha.bind(API)); // Rota para mudar a senha de uma empresa pelo ID
empresaRota.delete('/:id', API.deletarEmpresa.bind(API)); // Rota para deletar uma empresa pelo ID
empresaRota.get('/busca',API.postMostrarEmpresasComPrimeirasLetras.bind(API));

empresaRota.get('/demandas/:id', API.getMostrarDemandasEmpresasPorId.bind(API)); // Rota para mostrar as demandas de uma empresa pelo ID

///////////////////////////////////////////////////////// ROTA LOGIN /////////////////////////////////////////////////////////////////////////////////////////////////////
empresaRota.post('/empresasLogin', API.postLoginEmpresa.bind(API));
// Exporta as rotas de empresa
export default empresaRota;
