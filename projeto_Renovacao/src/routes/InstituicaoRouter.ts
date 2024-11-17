// Importa a função Router do Express para criar rotas
import { Router } from "express"; 
// Importa a classe InstituicaoController que contém a lógica de negócios para instituições
import Controller from "../controller/InstituicaoController"; 

// Cria uma nova instância do controlador de Instituições
let API = new Controller();
// Cria uma nova instância do roteador do Express
let rota = Router();

// Define as rotas para as operações relacionadas a instituições

// Rota para obter todas as instituições
rota.get('/', API.getMostrarInstituicoes.bind(API));

// Rota para cadastrar uma nova instituição
rota.post('/', API.postCadastrarInstituicao.bind(API));

// Rota para atualizar uma instituição existente
rota.put('/:id', API.putAtualizarInstituicao.bind(API));

// Rota para atualizar a senha de uma instituição
rota.patch('/:id', API.patchAtualizarSenhaInstituicao.bind(API));

// Rota para deletar uma instituição
rota.delete('/:id', API.deletarInstituicao.bind(API));

// Rota para mostrar todos os cursos de uma determinada instituição
rota.get('/cursos/:id', API.getMostrarTodosOsCursosDeDeterminadaInstituicao.bind(API));

// Rota para buscar instituições a partir de caracteres iniciais
rota.post('/busca', API.buscarInstituicoesPorCaracter.bind(API));

// ///////////////////////////////////LOGIN/////////////////////////////////////////
// Rota para login de uma instituição
rota.post('/login', API.loginControllerInstituicao.bind(API));
// ///////////////////////////////////LOGIN/////////////////////////////////////////

// Exporta as rotas para serem utilizadas em outras partes do aplicativo
export default rota;
