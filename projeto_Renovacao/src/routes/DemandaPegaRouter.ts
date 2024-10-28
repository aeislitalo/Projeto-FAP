import { Router } from "express"; // Importa a função Router do Express
import Controller from "../controller/DemandaPegaController"; // Import

// Cria uma nova instância do controlador da DemandaPega
let API = new Controller();
// Cria uma nova instância do roteador
let rota = Router();

rota.post('/:idProfessor/:idDemanda',API.postPegarDemanda.bind(API));
rota.get('/',API.getMostrarTodasAsDemanda.bind(API));
rota.put('/:id',API.putAtualizoDemanda.bind(API));
rota.patch('/:id',API.patchEntrega.bind(API));
rota.delete('/:id',API.deleteExcluirDemanda.bind(API));
rota.get('/professores', API.mostrarDemandasProfessores.bind(API));
rota.get('/demandas/:id',API.mostrarProfessoresPorDemanda.bind(API));
rota.get('/professores/:id',API.mostrarDemandasPorProfessor.bind(API));



export default rota;