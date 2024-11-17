import { Router } from "express"; // Importa a função Router do Express
import Controller from "../controller/DemandaPegaController"; // Importa o controlador da DemandaPega

// Cria uma nova instância do controlador da DemandaPega
let API = new Controller();
// Cria uma nova instância do roteador
let rota = Router();

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
export default rota;
