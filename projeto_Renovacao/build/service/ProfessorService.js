"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Professor_1 = __importDefault(require("../database/models/Professor"));
const DTOHelp_1 = __importDefault(require("../utils/DTOHelp"));
const resp_1 = __importDefault(require("../utils/resp"));
const MetodosTratamentoAuxiliares_1 = __importDefault(require("./MetodosTratamentoAuxiliares"));
// Classe de serviço para gerenciar operações relacionadas a professores
class ProfessorService extends MetodosTratamentoAuxiliares_1.default {
    // Método para obter todos os professores
    async getObterProfessores() {
        let professores = await this.modelProfessor.findAll(); // Busca todos os professores
        let professoresDTO = professores.map((professor) => DTOHelp_1.default.getProfessorDTO(professor)); // Mapeia para DTO
        return (0, resp_1.default)(200, professoresDTO); // Retorna resposta com status 200
    }
    // Método para adicionar um novo professor
    async postAdicionarProfessor(reqBody, idCurso, idInstituicao) {
        if (reqBody.email == null || reqBody.senha == null) {
            throw new Error("O Email ou a senha não podem nula");
        }
        this.tratarEmail(reqBody.email.trim()); // Valida o email
        this.tratarSenha(reqBody.senha.trim()); // Valida a senha
        let cadastraDTO = await this.criarObjetoProfessorDTO(reqBody, idCurso, idInstituicao); // Cria DTO do professor
        await this.modelProfessor.create(this.preencherDadosProfessor(cadastraDTO)); // Cadastra no banco de dados
        return (0, resp_1.default)(201, ""); // Retorna resposta com status 201
    }
    // Método para atualizar os dados de um professor
    async putAtualizarProfessor(reqBody, idProfessor) {
        if (reqBody.email) {
            this.tratarEmail(reqBody.email.trim()); // Valida o email se fornecido
        }
        if (reqBody.senha) {
            this.tratarSenha(reqBody.senha.trim()); // Valida a senha se fornecida
        }
        let professorDb = await this.acharProfessorPorId(idProfessor); // Busca o professor pelo ID
        let professorDTO = await this.criarObjetoProfessorDTO(reqBody, Number((await professorDb).cursoId), Number((await professorDb).instituicaoId)); // Cria DTO atualizado
        (await professorDb).update(this.preencherDadosProfessor(professorDTO)); // Atualiza os dados no banco
        return (0, resp_1.default)(204, ""); // Retorna resposta com status 200
    }
    // Método para mudar a senha de um professor
    async patchMudarSenhaProfessor(idProfessor, novaSenha) {
        this.tratarSenha(novaSenha); // Valida a nova senha
        let professorDb = await this.acharProfessorPorId(idProfessor); // Busca o professor pelo ID
        (await professorDb).update({ senha: novaSenha }); // Atualiza a senha
        return (0, resp_1.default)(204, ""); // Retorna resposta com status 204
    }
    // Método para apagar um professor
    async deleteApagarProfessor(idProfessor) {
        let professorDb = await this.acharProfessorPorId(idProfessor); // Busca o professor pelo ID
        await (professorDb).destroy(); // Remove o professor do banco de dados
        return (0, resp_1.default)(204, ""); // Retorna resposta com status 204
    }
    // Método para buscar professores pelo nome
    async buscaProfessorPorNome(resulBusca) {
        let professores = await this.modelProfessor.findAll({
            where: {
                nome: {
                    [sequelize_1.Op.like]: `${resulBusca}%` // Utiliza o operador LIKE para encontrar nomes que começam com as letras especificadas
                }
            }
        });
        let professoresDTO = professores.map((professor) => DTOHelp_1.default.getProfessorDTO(professor)); // Mapeia resultados para DTO
        if (professoresDTO.length === 0) {
            return (0, resp_1.default)(500, { erro: "Professore(a)'s não existe!!!" }); // Retorna mensagem se não houver professores
        }
        else {
            return (0, resp_1.default)(200, professoresDTO); // Retorna professores encontrados
        }
    }
    // Método para mostrar os cursos de um professor
    async mostrarCursosDoProfessor(idProfessor) {
        return (0, resp_1.default)(200, await Professor_1.default.visualizarCursos(idProfessor)); // Retorna cursos do professor
    }
    // Método para mostrar a instituição de um professor
    async mostrarInstituicaoDoProfessor(idProfessor) {
        return (0, resp_1.default)(200, await Professor_1.default.visualizarInstituicao(idProfessor)); // Retorna instituição do professor
    }
    // Método para mostrar os cursos e instituições de um professor
    async mostrarCursosEInstituicoesDoProfessor(idProfessor) {
        return (0, resp_1.default)(200, await Professor_1.default.visualizarInstituicaoECurso(idProfessor)); // Retorna cursos e instituições do professor
    }
}
exports.default = ProfessorService; // Exporta a classe para uso em outras partes da aplicação
//# sourceMappingURL=ProfessorService.js.map