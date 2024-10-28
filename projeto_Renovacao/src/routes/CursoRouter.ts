// Importa a função Router do Express para criar rotas
import { Router } from "express"; 
// Importa a classe CursoController que contém a lógica de negócios para cursos
import Controller from "../controller/CursoController"; 

// Cria uma nova instância do controlador de Cursos
let API = new Controller();
// Cria uma nova instância do roteador do Express
let rota = Router();

// Define a rota para cadastrar novos cursos, vinculando ao método postCadastrarCursos do controlador
rota.post('/instituicoes/:id', API.postCadastrarCursos.bind(API));

// Define a rota para atualizar o nome de um curso, vinculando ao método patchMudarNome do controlador
rota.patch('/:id', API.patchMudarNome.bind(API));

// Define a rota para deletar um curso, vinculando ao método deletarCurso do controlador
rota.delete('/:id', API.deletarCurso.bind(API));

// Define a rota para mostrar todos os cursos, vinculando ao método getMostrarCursos do controlador
rota.get('/', API.getMostrarCursos.bind(API));

// Define a rota para mostrar a instituição a que um curso pertence, vinculando ao método getMostrarInstituicaoPertencenteAoCurso do controlador
rota.get('/instituicoes/:id', API.getMostrarInstituicaoPertencenteAoCurso.bind(API));

// Define a rota para buscar cursos por nome, vinculando ao método getBuscarCursoPorNome do controlador
rota.get('/busca', API.getBuscarCursoPorNome.bind(API));

// Exporta as rotas para serem utilizadas em outras partes do aplicativo
export default rota;
