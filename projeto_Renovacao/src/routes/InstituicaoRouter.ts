import { Router } from "express"; // Importa a função Router do Express
import InstituicaoController from "../controller/InstituicaoController"; // Importa a classe InstituicaoController

// Cria uma nova instância do controlador de Instituição
let API = new InstituicaoController();
// Cria uma nova instância do roteador
let instituicaoRota = Router();

// Define as rotas para as operações de instituicao
instituicaoRota.get('/instituicoes', API.getMostrarInstituicoes.bind(API));
instituicaoRota.post('/instituicao', API.postCadastrarInstituicao.bind(API));
instituicaoRota.put('/instituicao/:id',API.putAtualizarInstituicao.bind(API));
instituicaoRota.patch('/instituicao/:id',API.patchAtualizarSenhaInstituicao.bind(API));
instituicaoRota.delete('/instituicao/:id',API.deletarInstittuicao.bind(API));
export default instituicaoRota;