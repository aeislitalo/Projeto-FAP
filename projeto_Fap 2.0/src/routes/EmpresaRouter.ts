import { Router } from "express"; // Importa a função Router do Express
import EmpresaController from "../controller/EmpresaController"; // Importa a classe EmpresaController

// Cria uma nova instância do controlador de empresa
let cadastroEmpresa = new EmpresaController();
// Cria uma nova instância do roteador
let empresaRota = Router();

// Define as rotas para as operações de empresa
empresaRota.post('/empresa', cadastroEmpresa.postCadastrarEmpresa.bind(cadastroEmpresa)); // Rota para cadastrar uma nova empresa
empresaRota.get('/empresas', cadastroEmpresa.getMostrarEmpresas.bind(cadastroEmpresa)); // Rota para listar todas as empresas
empresaRota.put('/empresa/:id', cadastroEmpresa.putMudarDadosEmpresas.bind(cadastroEmpresa)); // Rota para atualizar dados de uma empresa pelo ID
empresaRota.patch('/empresa/:id', cadastroEmpresa.patchMudarSenha.bind(cadastroEmpresa)); // Rota para mudar a senha de uma empresa pelo ID
empresaRota.delete('/empresa/:id', cadastroEmpresa.deletarEmpresa.bind(cadastroEmpresa)); // Rota para deletar uma empresa pelo ID
empresaRota.post('/empresaDemanda/:id', cadastroEmpresa.postCadastrarDemanda.bind(cadastroEmpresa)); // Rota para cadastrar uma demanda associada a uma empresa
empresaRota.get('/empresaDemanda/:id', cadastroEmpresa.getMostrarDemandas.bind(cadastroEmpresa)); // Rota para mostrar as demandas de uma empresa pelo ID
empresaRota.get('/demandas', cadastroEmpresa.getMostrarDemandas.bind(cadastroEmpresa)); // Rota para listar todas as demandas
empresaRota.put('/Demanda/:id', cadastroEmpresa.putAtualizarDemanda.bind(cadastroEmpresa)); // Rota para atualizar uma demanda pelo ID
empresaRota.patch('/Demanda/:id', cadastroEmpresa.patchMudarData.bind(cadastroEmpresa)); // Rota para mudar a data de uma demanda pelo ID
empresaRota.delete('/Demanda/:id', cadastroEmpresa.deletarDemanda.bind(cadastroEmpresa)); // Rota para deletar uma demanda pelo ID

// Exporta as rotas de empresa
export default empresaRota;
