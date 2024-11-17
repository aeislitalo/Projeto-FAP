import { Router } from "express"; // Importa a função Router do Express
import EmpresaController from "../controller/EmpresaController"; // Importa a classe EmpresaController

// Cria uma nova instância do controlador de empresa
let API = new EmpresaController();
// Cria uma nova instância do roteador
let rota = Router();

// Define as rotas para as operações de empresa

rota.post('/', API.postCadastrarEmpresa.bind(API)); // Rota para cadastrar uma nova empresa

rota.get('/', API.getMostrarEmpresas.bind(API)); // Rota para listar todas as empresas

rota.put('/:id', API.putMudarDadosEmpresas.bind(API)); // Rota para atualizar dados de uma empresa pelo ID
rota.patch('/:id', API.patchMudarSenha.bind(API)); // Rota para mudar a senha de uma empresa pelo ID
rota.delete('/:id', API.deletarEmpresa.bind(API)); // Rota para deletar uma empresa pelo ID
rota.post('/busca',API.postMostrarEmpresasComPrimeirasLetras.bind(API));

rota.get('/demandas/:id', API.getMostrarDemandasEmpresasPorId.bind(API)); // Rota para mostrar as demandas de uma empresa pelo ID

///////////////////////////////////////////////////////// ROTA LOGIN /////////////////////////////////////////////////////////////////////////////////////////////////////
rota.post('/login', API.postLoginEmpresa.bind(API));
// Exporta as rotas de empresa
export default rota;
