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
instituicaoRota.delete('/instituicoes/:id',API.deletarInstittuicao.bind(API));
instituicaoRota.post('/instituicoesLogin',API.loginControllerInstittuicao.bind(API));
instituicaoRota.post('/instituicoes/:id/cursos',API.postCadatrarCursos.bind(API));

export default instituicaoRota;