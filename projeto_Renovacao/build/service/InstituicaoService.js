"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Curso_1 = __importDefault(require("../database/models/Curso"));
const resp_1 = __importDefault(require("../utils/resp"));
const MetodosTratamentoAuxiliares_1 = __importDefault(require("./MetodosTratamentoAuxiliares"));
class InstituicaoService extends MetodosTratamentoAuxiliares_1.default {
    modelCurso = Curso_1.default;
    // Método para obter todas as instituições
    async get() {
        let instituicoes = await this.modelInstituicao.findAll();
        return (0, resp_1.default)(200, instituicoes);
    }
    // Método para cadastrar uma nova instituição
    async postCadastrarInstituicao(reqBody) {
        this.tratarEmail(reqBody.email.trim());
        this.tratarSenha(reqBody.senha.trim());
        let instituicaoReqDTO = this.tratarEndereco(reqBody, reqBody.cep.trim());
        await this.modelInstituicao.create(this.preencherDados(instituicaoReqDTO));
        return (0, resp_1.default)(201, instituicaoReqDTO);
    }
    // Método para atualizar uma instituição existente
    async putAtualizarInstituicao(idInstituicao, reqBody) {
        this.tratarEmail(reqBody.email.trim());
        this.tratarSenha(reqBody.senha.trim());
        let instituicaoDB = await this.acharInstituicaoPorId(idInstituicao);
        let instituicaoReqDTO = this.tratarEndereco(reqBody, reqBody.cep.trim());
        await instituicaoDB.update(this.preencherDados(instituicaoReqDTO));
        return (0, resp_1.default)(200, instituicaoDB);
    }
    // Método para alterar apenas a senha de uma instituição
    async patchMudarSenhaInstituicao(idInstituicao, instituicaoNovaSenha) {
        this.tratarSenha(instituicaoNovaSenha.nova_senha.trim());
        let instituicaoDB = await this.acharInstituicaoPorId(idInstituicao);
        await instituicaoDB.update({ senha: instituicaoNovaSenha.nova_senha });
        return (0, resp_1.default)(200, instituicaoDB);
    }
    // Método para deletar uma instituição
    async deletarInstituicao(idInstituicao) {
        let instituicaoDeletada = await this.acharInstituicaoPorId(idInstituicao);
        await instituicaoDeletada.destroy();
        return (0, resp_1.default)(200, 'Instituição deletada com sucesso');
    }
    /////////////////////////////////LOGIN/////////////////////////////////////////
    // Método para login da instituição
    async loginInstituicao(email, senha) {
        try {
            this.tratarEmail(email);
            this.tratarSenha(senha);
            let instituicaoEncontrada = await this.fazerLoginInstituicao(email, senha);
            return (0, resp_1.default)(200, instituicaoEncontrada);
        }
        catch (error) {
            return (0, resp_1.default)(400, { mensagem: error.message || 'Erro desconhecido.' });
        }
    }
    /////////////////////////////////LOGIN/////////////////////////////////////////
    /////////////////////////////////METODOS CURSO/////////////////////////////////////////
    // Método para cadastrar curso na instituição
    async cadastrarCursoInstituicao(idInstituicao, nomeCurso) {
        let curso = await this.modelCurso.create({
            nome: nomeCurso,
            instituicaoId: idInstituicao
        });
        return (0, resp_1.default)(200, curso);
    }
}
exports.default = InstituicaoService;
//# sourceMappingURL=InstituicaoService.js.map