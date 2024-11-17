"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importa o modelo Curso da camada de banco de dados
const Curso_1 = __importDefault(require("../database/models/Curso"));
// Importa a função de resposta personalizada
const resp_1 = __importDefault(require("../utils/resp"));
// Importa métodos auxiliares para tratamento de dados
const MetodosTratamentoAuxiliares_1 = __importDefault(require("./MetodosTratamentoAuxiliares"));
// Importa um helper para transformar objetos em DTOs
const DTOHelp_1 = __importDefault(require("../utils/DTOHelp"));
// Importa operadores do Sequelize para consultas
const sequelize_1 = require("sequelize");
// Classe que representa o serviço de cursos, estendendo métodos auxiliares
class CursoService extends MetodosTratamentoAuxiliares_1.default {
    // Método assíncrono para cadastrar um curso na instituição
    async postcadastrarCursoInstituicao(idInstituicao, nomeCurso) {
        // Cria o objeto de dados de entrada do curso
        let cursoDTO = this.criarObjetoCurso(idInstituicao, nomeCurso); // Invoca o método para criar o objeto de curso
        await this.modelCurso.create(this.preencherCurso(cursoDTO)); // Cadastra o curso no banco de dados
        return (0, resp_1.default)(201, ""); // Retorna uma resposta de sucesso
    }
    // Método assíncrono para mostrar todos os cursos cadastrados
    async getMostrarTodosCursos() {
        let cursos = await this.modelCurso.findAll(); // Busca todos os cursos no banco de dados
        let cursosDTO = cursos.map((curso) => this.cursoDTO(curso)); // Converte cada curso para o formato DTO
        return (0, resp_1.default)(200, cursosDTO); // Retorna todos os cursos com status 200
    }
    // Método assíncrono para mostrar a instituição pertencente a um curso específico
    async getMostrarInstituicaoPertencenteAoCurso(idCurso) {
        return (0, resp_1.default)(200, await Curso_1.default.visualizarInstituicaoCurso(idCurso));
    }
    // Método assíncrono para mudar o nome de um curso existente
    async patchMudarNome(idCurso, novoNome) {
        let cursoDB = this.acharCursoPorId(idCurso); // Busca o curso pelo ID da instituição
        (await cursoDB).update({
            nome: novoNome // Atualiza o nome do curso
        });
        return (0, resp_1.default)(204, ""); // Retorna uma resposta de sucesso sem conteúdo
    }
    // Método assíncrono para deletar um curso existente
    async deletarCurso(idInstituicao) {
        let cursoDB = this.acharCursoPorId(idInstituicao); // Busca o curso pelo ID da instituição
        (await cursoDB).destroy(); // Deleta o curso do banco de dados
        return (0, resp_1.default)(204, ""); // Retorna uma resposta de sucesso sem conteúdo
    }
    // Método assíncrono para buscar cursos por nome
    async buscarCursoPorNome(busca) {
        let cursos = await this.modelCurso.findAll({
            where: {
                nome: {
                    [sequelize_1.Op.like]: `${busca}%` // Utiliza o operador LIKE para encontrar nomes que começam com as letras especificadas
                }
            }
        });
        let cursoDTO = cursos.map((curso) => DTOHelp_1.default.getCursosDTO(curso)); // Mapeia resultados para DTO
        if (cursoDTO.length == 0) {
            return (0, resp_1.default)(500, { erro: "Curso's não existe!!!" }); // Retorna mensagem se não houver cursos
        }
        else {
            return (0, resp_1.default)(200, cursoDTO); // Retorna cursos encontrados
        }
    }
}
// Exporta a classe CursoService para ser usada em outras partes do aplicativo
exports.default = CursoService;
//# sourceMappingURL=CursoService.js.map