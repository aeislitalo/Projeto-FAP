import { Router } from "express"; // Importa a função Router do Express
import InstituicaoController from "../controller/InstituicaoController"; // Importa a classe InstituicaoController

// Cria uma nova instância do controlador de Instituição
let API = new InstituicaoController();
// Cria uma nova instância do roteador
let instituicaoRota = Router();

// Define as rotas para as operações de instituicao
instituicaoRota.get('/instituicoes', API.getMostrarInstituicoes.bind(API));
instituicaoRota.post('/instituicoes', API.postCadastrarInstituicao.bind(API));
instituicaoRota.put('/instituicoes/:id',API.putAtualizarInstituicao.bind(API));
instituicaoRota.patch('/instituicoes/:id',API.patchAtualizarSenhaInstituicao.bind(API));
instituicaoRota.delete('/instituicoes/:id',API.deletarInstituicao.bind(API));

/////////////////////////////////LOGIN/////////////////////////////////////////
instituicaoRota.post('/instituicoesLogin',API.loginControllerInstituicao.bind(API));
/////////////////////////////////LOGIN/////////////////////////////////////////


/////////////////////////////////LOGIN/////////////////////////////////////////
instituicaoRota.post('/instituicoes/cursos/:id',API.postCadastrarCursos.bind(API));
instituicaoRota.get('/instituicoes/cursos/:id', API.getMostrarTodosOsCursosDeDeterminadaInstituicao.bind(API));
instituicaoRota.get('/instituicoes/cursos', API.getMostrarCursos.bind(API));
instituicaoRota.get('/instituicoesCursos/:id', API.getMostrarInstituicaoPertencenteAoCurso.bind(API));
instituicaoRota.patch('/instituicoes/cursos/:id', API.patchMudarNome.bind(API));
instituicaoRota.delete('/instituicoes/cursos/:id', API.deletarCurso.bind(API));

export default instituicaoRota;