import { Router } from "express"; // Importa a função Router do Express
import InstituicaoController from "../controller/InstituicaoController"; // Importa a classe InstituicaoController

// Cria uma nova instância do controlador de Instituição
let API = new InstituicaoController();
// Cria uma nova instância do roteador
let instituicaoRota = Router();

// Define as rotas para as operações de instituicao
instituicaoRota.get('/', API.getMostrarInstituicoes.bind(API));
instituicaoRota.post('/', API.postCadastrarInstituicao.bind(API));
instituicaoRota.put('/:id',API.putAtualizarInstituicao.bind(API));
instituicaoRota.patch('/:id',API.patchAtualizarSenhaInstituicao.bind(API));
instituicaoRota.delete('/:id',API.deletarInstituicao.bind(API));
instituicaoRota.get('/cursos/:id', API.getMostrarTodosOsCursosDeDeterminadaInstituicao.bind(API));
instituicaoRota.get('/busca', API.buscarInstituicoesPorCaracter.bind(API));

/////////////////////////////////LOGIN/////////////////////////////////////////
instituicaoRota.post('/login',API.loginControllerInstituicao.bind(API));
/////////////////////////////////LOGIN/////////////////////////////////////////




export default instituicaoRota;