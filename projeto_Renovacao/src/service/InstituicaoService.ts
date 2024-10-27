
import Curso from "../database/models/Curso";
import Instituicao from "../database/models/Instituicao";
import resp from "../utils/resp";
import MetodosTratamentoAuxiliares from "./MetodosTratamentoAuxiliares";
import DTOHelper from "../utils/DTOHelp";
import { Op } from "sequelize";
class InstituicaoService extends MetodosTratamentoAuxiliares {

    // Método assíncrono para obter todas as instituições cadastradas
    async get() {
        let instituicoes = await this.modelInstituicao.findAll(); // Busca todas as instituições no banco de dados
        return resp(200, instituicoes.map((instituicao) => DTOHelper.getInstituicoesDto(instituicao))); // Retorna as instituições formatadas com status 200
    }

    // Método assíncrono para cadastrar uma nova instituição
    async postCadastrarInstituicao(reqBody: any) {
        this.tratarEmail(reqBody.email.trim()); // Trata o email removendo espaços em branco
        this.tratarSenha(reqBody.senha.trim()); // Trata a senha removendo espaços em branco

        let instituicaoReqDTO = this.tratarEndereco(reqBody, reqBody.cep.trim()); // Trata o endereço com base no CEP
        await this.modelInstituicao.create(this.preencherDados(await instituicaoReqDTO)); // Cadastra a nova instituição no banco de dados
        return resp(201, "Instituição cadastrada com sucesso!!!"); // Retorna uma resposta de sucesso
    }

    // Método assíncrono para atualizar uma instituição existente
    async putAtualizarInstituicao(idInstituicao: number, reqBody: any) {
        if (reqBody.email) {
            this.tratarEmail(reqBody.email.trim()); // Valida e trata o email, se fornecido
        }
        if (reqBody.senha) {
            this.tratarSenha(reqBody.senha.trim()); // Valida e trata a senha, se fornecida
        }

        let instituicaoDB = await this.acharInstituicaoPorId(idInstituicao); // Busca a instituição pelo ID
        let instituicaoReqDTO = this.tratarEndereco(reqBody, reqBody.cep.trim()); // Trata o endereço com base no CEP

        await instituicaoDB.update(this.preencherDados(await instituicaoReqDTO)); // Atualiza os dados da instituição no banco de dados
        return resp(204, ""); // Retorna uma resposta de sucesso sem conteúdo
    }

    // Método assíncrono para alterar apenas a senha de uma instituição
    async patchMudarSenhaInstituicao(idInstituicao: number, instituicaoNovaSenha: any) {
        this.tratarSenha(instituicaoNovaSenha.nova_senha.trim()); // Trata a nova senha removendo espaços em branco
        let instituicaoDB = await this.acharInstituicaoPorId(idInstituicao); // Busca a instituição pelo ID

        await instituicaoDB.update({ senha: instituicaoNovaSenha.nova_senha }); // Atualiza a senha da instituição
        return resp(204, ""); // Retorna uma resposta de sucesso sem conteúdo
    }

    // Método assíncrono para deletar uma instituição
    async deletarInstituicao(idInstituicao: number) {
        let instituicaoDeletada = await this.acharInstituicaoPorId(idInstituicao); // Busca a instituição pelo ID
        await instituicaoDeletada.destroy(); // Deleta a instituição do banco de dados
        return resp(204, ""); // Retorna uma resposta de sucesso sem conteúdo
    }

    /////////////////////////////////LOGIN/////////////////////////////////////////

    // Método assíncrono para login da instituição
    async loginInstituicao(email: string, senha: string) {
        try {
            this.tratarEmail(email); // Trata o email removendo espaços em branco
            this.tratarSenha(senha); // Trata a senha removendo espaços em branco

            return resp(200, DTOHelper.getInstituicoesDto(await this.fazerLoginInstituicao(email, senha))); // Retorna a instituição encontrada com status 200
        } catch (error: any) {
            return resp(400, { mensagem: error.message || 'Erro desconhecido.' }); // Retorna um erro se houver falha no login
        }
    }
    /////////////////////////////////LOGIN/////////////////////////////////////////


    /////////////////////////////////METODOS CURSO/////////////////////////////////////////

    // Método assíncrono para cadastrar um curso na instituição
    async postcadastrarCursoInstituicao(idInstituicao: number, nomeCurso: string) {
        // Cria o objeto de dados de entrada do curso
        let cursoDTO = this.criarObjetoCurso(idInstituicao, nomeCurso); // Invoca o método para criar o objeto de curso
        await this.modelCurso.create(this.preencherCurso(cursoDTO)); // Cadastra o curso no banco de dados
        return resp(201, "Curso Cadastrado com sucesso!!!!"); // Retorna uma resposta de sucesso
    }

    // Método assíncrono para mostrar os cursos de uma instituição específica
    async getMostrarCursosInstituicao(idInstituicao: number) {

        return resp(200, await Curso.visualizarCursos(idInstituicao)); // Retorna os cursos encontrados com status 200
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

    //Método para buscar instituicao por caracteres
    async buscarInstituicoesHaPartirDasPrimeirasLetras(busca: string) {
        // Faz uma busca no banco de dados procurando Instituicoes cujo nome começa com as letras fornecidas
        let instituicoes = await this.modelInstituicao.findAll({
            where: {
                nome: {
                    [Op.like]: `${busca}%` // Utiliza o operador LIKE para encontrar nomes que começam com as letras especificadas
                }
            }
        });

        let instituicoesDTO = instituicoes.map((instituicao) => DTOHelper.getEmpresasDto(instituicao)); // Mapeia resultados para DTO

        if (instituicoesDTO.length == 0) {
            return resp(200, "Instituicao's não existe!!!"); // Retorna mensagem se não houver Instituicoes
        } else {
            return resp(200, instituicoesDTO); // Retorna Instituicoes encontradas
        }
    }


}

export default InstituicaoService;
