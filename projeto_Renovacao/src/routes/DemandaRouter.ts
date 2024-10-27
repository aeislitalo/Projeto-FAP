import { Router } from "express"; // Importa a função Router do Express
import DemandaController from "../controller/DemandaController"; // Importa a classe EmpresaController

// Cria uma nova instância do controlador de empresa
let API = new DemandaController();
// Cria uma nova instância do roteador
let demandaRota = Router();

demandaRota.post('/:id', API.postCadastrarDemanda.bind(API)); // Rota para cadastrar uma demanda associada a uma empresa

demandaRota.get('/', API.getMostrarDemandas.bind(API)); // Rota para listar todas as demandas
demandaRota.get('/busca',API.postBuscarDemandasComPrimeirasLetras.bind(API));
demandaRota.put('/:id', API.putAtualizarDemanda.bind(API)); // Rota para atualizar uma demanda pelo ID
demandaRota.patch('/:id', API.patchMudarData.bind(API)); // Rota para mudar a data de uma demanda pelo ID
demandaRota.delete('/:id', API.deletarDemanda.bind(API)); // Rota para deletar uma demanda pelo ID
demandaRota.get('/empresa/:id', API.getMostraEmpresaPorDemanda.bind(API)); // Rota para mostrar empresa associada há demanda

export default demandaRota;