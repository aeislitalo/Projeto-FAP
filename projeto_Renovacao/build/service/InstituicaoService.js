"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Curso_1 = __importDefault(require("../database/models/Curso"));
const resp_1 = __importDefault(require("../utils/resp"));
const MetodosTratamentoAuxiliares_1 = __importDefault(require("./MetodosTratamentoAuxiliares"));
const DTOHelp_1 = __importDefault(require("../utils/DTOHelp"));
const sequelize_1 = require("sequelize");
// Classe de serviço para gerenciar operações relacionadas a instituições
class InstituicaoService extends MetodosTratamentoAuxiliares_1.default {
    // Método assíncrono para obter todas as instituições cadastradas
    async getMostrasTodasAsInstituicoes() {
        let instituicoes = await this.modelInstituicao.findAll(); // Busca todas as instituições no banco de dados
        return (0, resp_1.default)(200, instituicoes.map((instituicao) => DTOHelp_1.default.getInstituicoesDto(instituicao))); // Retorna as instituições formatadas com status 200
    }
    // Método assíncrono para cadastrar uma nova instituição
    async postCadastrarInstituicao(reqBody) {
        this.tratarEmail(reqBody.email.trim()); // Trata o email removendo espaços em branco
        this.tratarSenha(reqBody.senha.trim()); // Trata a senha removendo espaços em branco
        let instituicaoReqDTO = this.tratarEndereco(reqBody, reqBody.cep.trim()); // Trata o endereço com base no CEP
        await this.modelInstituicao.create(this.preencherDados(await instituicaoReqDTO)); // Cadastra a nova instituição no banco de dados
        return (0, resp_1.default)(201, ""); // Retorna uma resposta de sucesso
    }
    // Método assíncrono para atualizar uma instituição existente
    async putAtualizarInstituicao(idInstituicao, reqBody) {
        if (reqBody.email != null) {
            this.tratarEmail(reqBody.email.trim()); // Valida e trata o email, se fornecido
        }
        if (reqBody.senha != null) {
            this.tratarSenha(reqBody.senha.trim()); // Valida e trata a senha, se fornecida
        }
        let instituicaoDB = await this.acharInstituicaoPorId(idInstituicao); // Busca a instituição pelo ID
        let instituicaoReqDTO;
        if (reqBody.cep && reqBody.cep.trim() !== "") {
            instituicaoReqDTO = this.tratarEndereco(reqBody, reqBody.cep.trim()); // Trata o endereço com base no CEP
        }
        else {
            instituicaoReqDTO = this.tratarEndereco(reqBody, instituicaoDB.cep);
        }
        await instituicaoDB.update(this.preencherDados(await instituicaoReqDTO)); // Atualiza os dados da instituição no banco de dados
        return (0, resp_1.default)(204, ""); // Retorna uma resposta de sucesso sem conteúdo
    }
    // Método assíncrono para alterar apenas a senha de uma instituição
    async patchMudarSenhaInstituicao(idInstituicao, instituicaoNovaSenha) {
        this.tratarSenha(instituicaoNovaSenha.nova_senha.trim()); // Trata a nova senha removendo espaços em branco
        let instituicaoDB = await this.acharInstituicaoPorId(idInstituicao); // Busca a instituição pelo ID
        await instituicaoDB.update({ senha: instituicaoNovaSenha.nova_senha }); // Atualiza a senha da instituição
        return (0, resp_1.default)(204, ""); // Retorna uma resposta de sucesso sem conteúdo
    }
    // Método assíncrono para deletar uma instituição
    async deletarInstituicao(idInstituicao) {
        let instituicaoDeletada = await this.acharInstituicaoPorId(idInstituicao); // Busca a instituição pelo ID
        await instituicaoDeletada.destroy(); // Deleta a instituição do banco de dados
        return (0, resp_1.default)(204, ""); // Retorna uma resposta de sucesso sem conteúdo
    }
    // Método assíncrono para login da instituição
    async loginInstituicao(email, senha) {
        try {
            this.tratarEmail(email); // Trata o email removendo espaços em branco
            this.tratarSenha(senha); // Trata a senha removendo espaços em branco
            return (0, resp_1.default)(200, DTOHelp_1.default.getInstituicoesDto(await this.fazerLoginInstituicao(email, senha))); // Retorna a instituição encontrada com status 200
        }
        catch (error) {
            return (0, resp_1.default)(400, { mensagem: error.message || 'Erro desconhecido.' }); // Retorna um erro se houver falha no login
        }
    }
    // Método assíncrono para mostrar os cursos de uma instituição específica
    async getMostrarCursosInstituicao(idInstituicao) {
        return (0, resp_1.default)(200, await Curso_1.default.visualizarCursos(idInstituicao)); // Retorna os cursos encontrados com status 200
    }
    // Método para buscar instituições por caracteres iniciais
    async buscarInstituicoesHaPartirDasPrimeirasLetras(busca) {
        // Faz uma busca no banco de dados procurando instituições cujo nome começa com as letras fornecidas
        let instituicoes = await this.modelInstituicao.findAll({
            where: {
                nome: {
                    [sequelize_1.Op.like]: `${busca}%` // Utiliza o operador LIKE para encontrar nomes que começam com as letras especificadas
                }
            }
        });
        let instituicoesDTO = instituicoes.map((instituicao) => DTOHelp_1.default.getEmpresasDto(instituicao)); // Mapeia resultados para DTO
        if (instituicoesDTO.length === 0) {
            return (0, resp_1.default)(200, { erro: "Instituições não existem!!!" }); // Retorna mensagem se não houver instituições
        }
        else {
            return (0, resp_1.default)(200, instituicoesDTO); // Retorna instituições encontradas
        }
    }
}
exports.default = InstituicaoService; // Exporta a classe para uso em outras partes da aplicação
//# sourceMappingURL=InstituicaoService.js.map