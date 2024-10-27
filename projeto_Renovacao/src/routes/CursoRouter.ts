import { Router } from "express"; // Importa a função Router do Express
import CursoController from "../controller/CursoController"; // Importa a classe InstituicaoController

// Cria uma nova instância do controlador de Instituição
let API = new CursoController();
// Cria uma nova instância do roteador
let cursoRota = Router();

cursoRota.post('/instituicoes/:id',API.postCadastrarCursos.bind(API));

cursoRota.patch('/:id', API.patchMudarNome.bind(API));
cursoRota.delete('/:id', API.deletarCurso.bind(API));
cursoRota.get('/', API.getMostrarCursos.bind(API));
cursoRota.get('/instituicoes/:id', API.getMostrarInstituicaoPertencenteAoCurso.bind(API));

export default cursoRota;