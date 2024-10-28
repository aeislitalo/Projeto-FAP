// Importa o modelo Curso da camada de banco de dados
import Curso from "../database/models/Curso";
// Importa a função de resposta personalizada
import resp from "../utils/resp";
// Importa métodos auxiliares para tratamento de dados
import MetodosTratamentoAuxiliares from "./MetodosTratamentoAuxiliares";
// Importa um helper para transformar objetos em DTOs
import DTOHelper from "../utils/DTOHelp";
// Importa operadores do Sequelize para consultas
import { Op } from "sequelize";

// Classe que representa o serviço de cursos, estendendo métodos auxiliares
class CursoService extends MetodosTratamentoAuxiliares {

    // Método assíncrono para cadastrar um curso na instituição
    async postcadastrarCursoInstituicao(idInstituicao: number, nomeCurso: string) {
        // Cria o objeto de dados de entrada do curso
        let cursoDTO = this.criarObjetoCurso(idInstituicao, nomeCurso); // Invoca o método para criar o objeto de curso
        await this.modelCurso.create(this.preencherCurso(cursoDTO)); // Cadastra o curso no banco de dados
        return resp(201, ""); // Retorna uma resposta de sucesso
    }

    // Método assíncrono para mostrar todos os cursos cadastrados
    async getMostrarTodosCursos() {
        let cursos = await this.modelCurso.findAll(); // Busca todos os cursos no banco de dados
        let cursosDTO = cursos.map((curso) => this.cursoDTO(curso)); // Converte cada curso para o formato DTO
        return resp(200, cursosDTO); // Retorna todos os cursos com status 200
    }

    // Método assíncrono para mostrar a instituição pertencente a um curso específico
    async getMostrarInstituicaoPertencenteAoCurso(idCurso: number) {
        return resp(200, await Curso.visualizarInstituicaoCurso(idCurso));
    }

    // Método assíncrono para mudar o nome de um curso existente
    async patchMudarNome(idInstituicao: number, novoNome: string) {
        let cursoDB = this.acharCursoPorId(idInstituicao); // Busca o curso pelo ID da instituição
        (await cursoDB).update({
            nome: novoNome // Atualiza o nome do curso
        });
        return resp(204, ""); // Retorna uma resposta de sucesso sem conteúdo
    }

    // Método assíncrono para deletar um curso existente
    async deletarCurso(idInstituicao: number) {
        let cursoDB = this.acharCursoPorId(idInstituicao); // Busca o curso pelo ID da instituição
        (await cursoDB).destroy(); // Deleta o curso do banco de dados
        return resp(204, ""); // Retorna uma resposta de sucesso sem conteúdo
    }

    // Método assíncrono para buscar cursos por nome
    async buscarCursoPorNome(busca: string) {
        let cursos = await this.modelCurso.findAll({
            where: {
                nome: {
                    [Op.like]: `${busca}%` // Utiliza o operador LIKE para encontrar nomes que começam com as letras especificadas
                }
            }
        });

        let cursoDTO = cursos.map((curso) => DTOHelper.getCursosDTO(curso)); // Mapeia resultados para DTO

        if (cursoDTO.length == 0) {
            return resp(200, { erro: "Curso's não existe!!!" }); // Retorna mensagem se não houver cursos
        } else {
            return resp(200, cursoDTO); // Retorna cursos encontrados
        }
    }

}

// Exporta a classe CursoService para ser usada em outras partes do aplicativo
export default CursoService;
