import { Router } from "express"; // Importa a função Router do Express
import InstituicaoController from "../controller/InstituicaoController"; // Importa a classe InstituicaoController

// Cria uma nova instância do controlador de Instituição
let API = new InstituicaoController();
// Cria uma nova instância do roteador
let instituicaoRota = Router();

// Define as rotas para as operações de instituicao
instituicaoRota.get('/instituicao', API.getMostrarInstituicoes.bind(API));

export default instituicaoRota;