import { Router } from "express"; // Importa a função Router do Express
import Controller from "../controller/DemandaController"; // Importa a classe Demandaontroller

// Cria uma nova instância do controlador de empresa
let API = new Controller();
// Cria uma nova instância do roteador
let rota = Router();

rota.post('/busca',API.postBuscarDemandasComPrimeirasLetras.bind(API));
rota.post('/:id', API.postCadastrarDemanda.bind(API)); // Rota para cadastrar uma demanda associada a uma empresa

rota.get('/', API.getMostrarDemandas.bind(API)); // Rota para listar todas as demandas

rota.put('/:id', API.putAtualizarDemanda.bind(API)); // Rota para atualizar uma demanda pelo ID
rota.patch('/:id', API.patchMudarData.bind(API)); // Rota para mudar a data de uma demanda pelo ID
rota.delete('/:id', API.deletarDemanda.bind(API)); // Rota para deletar uma demanda pelo ID
rota.get('/empresa/:id', API.getMostraEmpresaPorDemanda.bind(API)); // Rota para mostrar empresa associada há demanda
rota.patch('/prazo/:id',API.patchAtualizarPrazo.bind(API));

export default rota;