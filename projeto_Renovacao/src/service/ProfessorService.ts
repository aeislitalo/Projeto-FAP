import { Op } from "sequelize";
import Professor from "../database/models/Professor";
import DTOHelper from "../utils/DTOHelp";
import resp from "../utils/resp";
import MetodosTratamentoAuxiliares from "./MetodosTratamentoAuxiliares";

// Classe de serviço para gerenciar operações relacionadas a professores
class ProfessorService extends MetodosTratamentoAuxiliares {
    // Método para obter todos os professores
    async getObterProfessores() {
        let professores = await this.modelProfessor.findAll(); // Busca todos os professores
        let professoresDTO = professores.map((professor) => DTOHelper.getProfessorDTO(professor)); // Mapeia para DTO
        return resp(200, professoresDTO); // Retorna resposta com status 200
    }

    // Método para adicionar um novo professor
    async postAdicionarProfessor(reqBody: any, idCurso: number, idInstituicao: number) {
        if(reqBody.email == null || reqBody.senha == null){
            throw new Error("O Email ou a senha não podem nula")
        }
        this.tratarEmail(reqBody.email.trim()); // Valida o email
        this.tratarSenha(reqBody.senha.trim()); // Valida a senha

        let cadastraDTO = await this.criarObjetoProfessorDTO(reqBody, idCurso, idInstituicao); // Cria DTO do professor
        await this.modelProfessor.create(this.preencherDadosProfessor(cadastraDTO)); // Cadastra no banco de dados
        return resp(201, ""); // Retorna resposta com status 201
    }

    // Método para atualizar os dados de um professor
    async putAtualizarProfessor(reqBody: any, idProfessor: number) {
        if (reqBody.email) {
            this.tratarEmail(reqBody.email.trim()); // Valida o email se fornecido
        }
        if (reqBody.senha) {
            this.tratarSenha(reqBody.senha.trim()); // Valida a senha se fornecida
        }

        let professorDb = await this.acharProfessorPorId(idProfessor); // Busca o professor pelo ID
        let professorDTO = await this.criarObjetoProfessorDTO(reqBody, Number((await professorDb).cursoId), Number((await professorDb).instituicaoId)); // Cria DTO atualizado
        (await professorDb).update(this.preencherDadosProfessor(professorDTO)); // Atualiza os dados no banco
        return resp(204, ""); // Retorna resposta com status 200
    }

    // Método para mudar a senha de um professor
    async patchMudarSenhaProfessor(idProfessor: number, novaSenha: string) {
        this.tratarSenha(novaSenha); // Valida a nova senha
        let professorDb = await this.acharProfessorPorId(idProfessor); // Busca o professor pelo ID
        (await professorDb).update({ senha: novaSenha }); // Atualiza a senha
        return resp(204, ""); // Retorna resposta com status 204
    }

    // Método para apagar um professor
    async deleteApagarProfessor(idProfessor: number) {
        let professorDb = await this.acharProfessorPorId(idProfessor); // Busca o professor pelo ID
        await (professorDb).destroy(); // Remove o professor do banco de dados
        return resp(204, ""); // Retorna resposta com status 204
    }

    // Método para buscar professores pelo nome
    async buscaProfessorPorNome(resulBusca: string) {
        let professores = await this.modelProfessor.findAll({
            where: {
                nome: {
                    [Op.like]: `${resulBusca}%` // Utiliza o operador LIKE para encontrar nomes que começam com as letras especificadas
                }
            }
        });

        let professoresDTO = professores.map((professor) => DTOHelper.getProfessorDTO(professor)); // Mapeia resultados para DTO

        if (professoresDTO.length === 0) {
            return resp(200, { erro: "Professore(a)'s não existe!!!" }); // Retorna mensagem se não houver professores
        } else {
            return resp(200, professoresDTO); // Retorna professores encontrados
        }
    }

    // Método para mostrar os cursos de um professor
    async mostrarCursosDoProfessor(idProfessor: number) {
        return resp(200, await Professor.visualizarCursos(idProfessor)); // Retorna cursos do professor
    }

    // Método para mostrar a instituição de um professor
    async mostrarInstituicaoDoProfessor(idProfessor: number) {
        return resp(200, await Professor.visualizarInstituicao(idProfessor)); // Retorna instituição do professor
    }

    // Método para mostrar os cursos e instituições de um professor
    async mostrarCursosEInstituicoesDoProfessor(idProfessor: number) {
        return resp(200, await Professor.visualizarInstituicaoECurso(idProfessor)); // Retorna cursos e instituições do professor
    }
    
}

export default ProfessorService; // Exporta a classe para uso em outras partes da aplicação
