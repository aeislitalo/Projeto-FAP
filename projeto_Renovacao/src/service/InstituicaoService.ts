import Instituicao from "../database/models/Instituicao"; // Importa o modelo de Instituição do banco de dados
import resp from "../utils/resp"; // Importa uma função utilitária para responder às requisições
import MetodosTratamentoAuxiliares from "./MetodosTratamentoAuxiliares"; // Importa uma classe com métodos auxiliares de tratamento

class InstituicaoService extends MetodosTratamentoAuxiliares { // A classe InstituicaoService herda métodos auxiliares de MetodosTratamentoAuxiliares

    // Método para obter todas as instituições
    async get() {
        let instituicoes = await this.modelInstituicao.findAll(); // Busca todas as instituições no banco de dados usando o modelo

        return resp(200, instituicoes); // Retorna uma resposta com o status 200 (OK) e as instituições encontradas
    }

    // Método para cadastrar uma nova instituição
    async postCadastrarIntituicao(reqBody: any) {
        this.tratarEmail(reqBody.email.trim()); // Faz o tratamento do campo de e-mail, removendo espaços em branco
        this.tratarSenha(reqBody.senha.trim()); // Faz o tratamento do campo de senha

        let instituicaoReqDTO = this.criarObjetoEmpresaInstituicaoDTO(reqBody); // Cria um objeto DTO com os dados da instituição a partir do corpo da requisição
        await this.modelInstituicao.create(Instituicao.preencherDados(instituicaoReqDTO)); // Insere a nova instituição no banco de dados
        return resp(201, instituicaoReqDTO); // Retorna uma resposta com o status 201 (Criado) e os dados da instituição cadastrada
    }

    // Método para atualizar uma instituição existente
    async putAtualizarIntituicao(idInstituicao: number, reqBody: any) {
        this.tratarEmail(reqBody.email.trim()); // Faz o tratamento do campo de e-mail, removendo espaços em branco
        this.tratarSenha(reqBody.senha.trim()); // Faz o tratamento do campo de senha

        let instituicaoDB = await this.acharInstituicaoPorId(idInstituicao); // Busca a instituição no banco de dados pelo ID
        let instituicaoReqDTO = this.criarObjetoEmpresaInstituicaoDTO(reqBody); // Cria um objeto DTO com os novos dados da instituição

        await instituicaoDB.update(Instituicao.preencherDados(instituicaoReqDTO)); // Atualiza a instituição no banco de dados com os novos dados
        return resp(200, instituicaoDB); // Retorna uma resposta com o status 200 (OK) e os dados da instituição atualizada
    }

    // Método para alterar apenas a senha de uma instituição
    async patchMudarSenhaInstituicao(idInstituicao: number, instituicaoNovaSenha: any) {

        this.tratarSenha(instituicaoNovaSenha.nova_senha.trim()); // Faz o tratamento da nova senha

        let instituicaoDB = await this.acharInstituicaoPorId(idInstituicao); // Busca a instituição no banco de dados pelo ID
        await instituicaoDB.update({
            senha: instituicaoNovaSenha.nova_senha // Atualiza a senha da instituição
        });
        return resp(200, instituicaoDB); // Retorna uma resposta com o status 200 (OK) e os dados da instituição com a senha alterada
    }

    // Método para deletar uma instituição
    async deletarInstituicao(idEmpresa: number) {
        let empresaDeletada = await this.acharInstituicaoPorId(idEmpresa); // Busca a instituição pelo ID no banco de dados
        await empresaDeletada.destroy(); // Deleta a instituição do banco de dados
        return resp(200, { mensagem: 'Instituição deletada com sucesso' }); // Retorna uma resposta com o status 200 (OK) e uma mensagem de sucesso
    }
}

export default InstituicaoService; // Exporta a classe InstituicaoService como módulo padrão
