import { ModelStatic } from "sequelize";
import Curso from "../database/models/Curso";
import resp from "../utils/resp";
import MetodosTratamentoAuxiliares from "./MetodosTratamentoAuxiliares";

class InstituicaoService extends MetodosTratamentoAuxiliares {
    private modelCurso: ModelStatic<Curso> = Curso;

    // Método para obter todas as instituições
    async get() {
        const instituicoes = await this.modelInstituicao.findAll();
        return resp(200, instituicoes);
    }

    // Método para cadastrar uma nova instituição
    async postCadastrarInstituicao(reqBody: any) {
        this.tratarEmail(reqBody.email.trim());
        this.tratarSenha(reqBody.senha.trim());

        const instituicaoReqDTO = this.criarObjetoEmpresaInstituicaoDTO(reqBody);
        await this.modelInstituicao.create(this.preencherDados(instituicaoReqDTO));
        return resp(201, instituicaoReqDTO);
    }

    // Método para atualizar uma instituição existente
    async putAtualizarInstituicao(idInstituicao: number, reqBody: any) {
        this.tratarEmail(reqBody.email.trim());
        this.tratarSenha(reqBody.senha.trim());

        const instituicaoDB = await this.acharInstituicaoPorId(idInstituicao);
        const instituicaoReqDTO = this.criarObjetoEmpresaInstituicaoDTO(reqBody);

        await instituicaoDB.update(this.preencherDados(instituicaoReqDTO));
        return resp(200, instituicaoDB);
    }

    // Método para alterar apenas a senha de uma instituição
    async patchMudarSenhaInstituicao(idInstituicao: number, instituicaoNovaSenha: any) {
        this.tratarSenha(instituicaoNovaSenha.nova_senha.trim());
        const instituicaoDB = await this.acharInstituicaoPorId(idInstituicao);

        await instituicaoDB.update({ senha: instituicaoNovaSenha.nova_senha });
        return resp(200, instituicaoDB);
    }

    // Método para deletar uma instituição
    async deletarInstituicao(idInstituicao: number) {
        const instituicaoDeletada = await this.acharInstituicaoPorId(idInstituicao);
        await instituicaoDeletada.destroy();
        return resp(200, 'Instituição deletada com sucesso');
    }
/////////////////////////////////LOGIN/////////////////////////////////////////

    // Método para login da instituição
    async loginInstituicao(email: string, senha: string) {
        try {
            this.tratarEmail(email);
            this.tratarSenha(senha);
            const instituicaoEncontrada = await this.fazerLoginInstituicao(email, senha);
            return resp(200, instituicaoEncontrada);
        } catch (error: any) {
            return resp(400, { mensagem: error.message || 'Erro desconhecido.' });
        }
    }
/////////////////////////////////LOGIN/////////////////////////////////////////


/////////////////////////////////METODOS CURSO/////////////////////////////////////////

    // Método para cadastrar curso na instituição
    async cadastrarCursoInstituicao(idInstituicao: number, nomeCurso: string) {
        const curso = await this.modelCurso.create({
            nome: nomeCurso,
            instituicaoId: idInstituicao
        });
        return resp(200, curso);
    }
}

export default InstituicaoService;
