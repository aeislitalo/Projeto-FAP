// Importa a função Router do Express para criar rotas
import { Router } from "express"; 
// Importa a classe ProfessorController que contém a lógica de negócios para professores
import Controller from "../controller/ProfessorController"; 

// Cria uma nova instância do controlador de Professores
let API = new Controller();
// Cria uma nova instância do roteador do Express
let rota = Router();

// Define as rotas para as operações relacionadas a professores

// Rota para obter todos os professores
rota.get('/', API.getMostrarProfessores.bind(API));

// Rota para cadastrar um novo professor, vinculando ao ID do curso e da instituição
rota.post('/:idCurso/:idInstituicao', API.postCadastroProfessores.bind(API));

// Rota para atualizar os dados de um professor existente
rota.put('/:id', API.putAtualizarProfessores.bind(API));

// Rota para atualizar a senha de um professor
rota.patch('/:id', API.patchMudarSenha.bind(API));

// Rota para deletar um professor
rota.delete('/:id', API.deleteExcluirProfessor.bind(API));

// Rota para buscar professores pelo nome
rota.get('/busca', API.buscarPorNome.bind(API));

// Rota para mostrar os cursos de um professor
rota.get('/cursos/:id', API.mostrarCursosProfessor.bind(API));

// Rota para mostrar a instituição de um professor
rota.get('/instituicoes/:id', API.mostrarInstituicaoProfessor.bind(API));

// Rota para mostrar a instituição e os cursos de um professor ao mesmo tempo
rota.get('/instituicoes/cursos/:id', API.mostrarInstituicaoECursosAoMesmoTempoProfessor.bind(API));

// Exporta as rotas para serem utilizadas em outras partes do aplicativo
export default rota;
