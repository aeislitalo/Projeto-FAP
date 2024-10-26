"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resp_1 = __importDefault(require("../utils/resp")); // Importa uma função utilitária de resposta
const Demanda_1 = __importDefault(require("../database/models/Demanda")); // Importa o modelo Demanda
const MetodosTratamentoAuxiliares_1 = __importDefault(require("./MetodosTratamentoAuxiliares")); // Importa métodos auxiliares para tratamento
const sequelize_1 = require("sequelize"); // Importa operadores do Sequelize
class EmpresaService extends MetodosTratamentoAuxiliares_1.default {
    // Método para criar uma nova empresa
    async post(reqBody) {
        // Valida o formato do email utilizando o método 'tratarEmail', que verifica se o email é válido
        this.tratarEmail(reqBody.email.trim());
        // Valida a senha utilizando o método 'tratarSenha', que verifica se a senha atende aos critérios (letra e número)
        this.tratarSenha(reqBody.senha.trim());
        console.log(reqBody.cep.trim());
        // Cria uma instância de 'EmpresaRequestDTO' usando os dados do corpo da requisição (reqBody)
        let empresaReqDTO = await this.tratarEndereco(reqBody, reqBody.cep.trim());
        // Chama o método estático 'preencherDados' da classe 'Empresa' para preencher os dados da empresa
        // A partir do DTO, que encapsula as informações necessárias para a criação no banco
        await this.model.create(this.preencherDados(empresaReqDTO)); // Cria a empresa no banco de dados
        // Retorna uma resposta com status 201 (Criado) e uma mensagem de sucesso
        return (0, resp_1.default)(201, "Empresa cadastrada com sucesso!!!");
    }
    //////////////////////////////////////////////// LOGIN //////////////////////////////////////////////////////////
    // Método para realizar o login
    async postLoginEmpresa(email, senha) {
        try {
            // Verifica se o email e a senha são válidos
            this.tratarEmail(email);
            this.tratarSenha(senha);
            // Realiza o login e busca a empresa
            let empresaEncontrada = await this.fazerLoginEmpresa(email, senha);
            // Retorna uma resposta de sucesso com a empresa encontrada
            return (0, resp_1.default)(200, empresaEncontrada);
        }
        catch (error) {
            // Lança o erro capturado
            return (0, resp_1.default)(400, { mensagem: error.message || 'Erro desconhecido.' });
        }
    }
    //////////////////////////////////////////////// LOGIN //////////////////////////////////////////////////////////
    // Método para obter todas as empresas
    async get() {
        let empresas = await this.model.findAll(); // Busca todas as empresas
        // Mapeia os resultados para o formato do DTO
        let empresasDTO = empresas.map((empresa) => this.getEmpresasDto(empresa));
        return (0, resp_1.default)(200, empresas); // Retorna uma resposta com o status 200 (OK)
    }
    // Método para atualizar os dados de uma empresa
    async put(idEmpresa, reqBody) {
        this.tratarEmail(reqBody.email.trim()); // Valida o email
        this.tratarSenha(reqBody.senha.trim()); // Valida a senha
        let empresaDB = await this.acharEmpresaPorId(idEmpresa); // Busca a empresa pelo ID
        // Cria uma instância de 'EmpresaRequestDTO' usando os dados do corpo da requisição (reqBody)
        let empresaReqDTO = this.tratarEndereco(reqBody, reqBody.cep.trim());
        await empresaDB.update(this.preencherDados(empresaReqDTO)); // Atualiza os dados da empresa
        return (0, resp_1.default)(200, empresaDB); // Retorna a empresa atualizada
    }
    // Método para mudar a senha de uma empresa
    async patch(idEmpresa, empresaNovaSenha) {
        this.tratarSenha(empresaNovaSenha.nova_senha.trim()); // Valida a nova senha
        let empresaDB = await this.acharEmpresaPorId(idEmpresa); // Busca a empresa pelo ID
        await empresaDB.update({
            senha: empresaNovaSenha.nova_senha // Atualiza a senha da empresa
        });
        return (0, resp_1.default)(200, empresaDB); // Retorna a empresa com a senha atualizada
    }
    // Método para deletar uma empresa
    async deletar(idEmpresa) {
        let empresaDeletada = await this.acharEmpresaPorId(idEmpresa); // Busca a empresa pelo ID
        await empresaDeletada.destroy(); // Deleta a empresa
        return (0, resp_1.default)(200, 'Empresa deletada com sucesso'); // Retorna sucesso
    }
    // Método para mostrar empresas a partir das primeiras letras do nome
    async MostrarEmpresasHaPartirDasPrimeirasLetras(letras) {
        // Faz uma busca no banco de dados procurando empresas cujo nome começa com as letras fornecidas
        let empresas = await this.model.findAll({
            where: {
                nome: {
                    [sequelize_1.Op.like]: `${letras}%` // Utiliza o operador LIKE para encontrar nomes que começam com as letras especificadas
                }
            }
        });
        let empresasDTO = empresas.map((empresa) => this.getEmpresasDto(empresa)); // Mapeia resultados para DTO
        if (empresasDTO.length == 0) {
            return (0, resp_1.default)(200, "Empresa's não existe!!!"); // Retorna mensagem se não houver empresas
        }
        else {
            return (0, resp_1.default)(200, empresasDTO); // Retorna empresas encontradas
        }
    }
    //////////////////////////////////////////////// METODOS PARA DEMANDA //////////////////////////////////////////////////////////////////////////
    // Método para cadastrar uma nova demanda
    async postCadastrarDemanda(id, demanda) {
        let dataFinal = Demanda_1.default.formatarData(demanda.data_final); // Formata a data final
        let demandaCriacao = await this.modelDemanda.create(Demanda_1.default.preencherDemanda(dataFinal, id, demanda)); // Cria a nova demanda
        return (0, resp_1.default)(201, demandaCriacao); // Retorna a demanda criada
    }
    // Método para mostrar as demandas de uma empresa
    async getMostrarDemandasEmpresas(idEmpresa) {
        // Chama o método estático 'visualizarMeusProjetos' da classe Demanda,
        // que recebe o ID da empresa e busca suas demandas relacionadas.
        let empresa = await Demanda_1.default.visualizarMeusProjetos(idEmpresa);
        return (0, resp_1.default)(200, empresa); // Retorna a empresa com suas demandas
    }
    // Método para mostrar todas as demandas
    async getMostrarDemandas() {
        let empresas = await this.modelDemanda.findAll(); // Busca todas as demandas
        return (0, resp_1.default)(200, empresas); // Retorna as demandas
    }
    // Método para mostrar empresas pertencentes a uma demanda
    async getMostrarEmpresasPertencenteHaDemanda(idDemanda) {
        let empresaPorDemanda = await Demanda_1.default.visualizarEmpresasDemandas(idDemanda); // Busca empresas relacionadas à demanda
        return (0, resp_1.default)(200, empresaPorDemanda); // Retorna empresas encontradas
    }
    // Método para atualizar uma demanda
    async putAtualizarDemanda(idDemanda, demandaDados) {
        let demandaDB = await this.acharDemandaPorId(idDemanda); // Busca a demanda pelo ID
        let dataFinal = Demanda_1.default.formatarData(demandaDados.data_final); // Formata a data final
        await demandaDB.update(Demanda_1.default.preencherDemanda(dataFinal, demandaDB.empresaId, demandaDados)); // Atualiza a demanda
        return (0, resp_1.default)(200, demandaDB); // Retorna a demanda atualizada
    }
    // Método para mudar a data de uma demanda
    async patchMudarData(idDemanda, novaData) {
        let demandaDB = await this.acharDemandaPorId(idDemanda); // Busca a demanda pelo ID
        let dataFinalFormatada = Demanda_1.default.formatarData(novaData.data_final); // Formata a nova data
        await demandaDB.update({
            dataFinal: dataFinalFormatada // Atualiza a data final da demanda
        });
        return (0, resp_1.default)(200, demandaDB); // Retorna a demanda atualizada
    }
    // Método para deletar uma demanda
    async deletarDemandaServico(idDemanda) {
        let empresaDeletada = await this.acharDemandaPorId(idDemanda); // Busca a demanda pelo ID
        await empresaDeletada.destroy(); // Deleta a demanda
        return (0, resp_1.default)(200, 'Demanda deletada com sucesso'); // Retorna sucesso
    }
    // Método para mostrar demandas a partir das primeiras letras do título
    async MostrarDemandasHaPartirDasPrimeirasLetras(letras) {
        // Faz uma busca no banco de dados procurando demandas cujo nome começa com as letras fornecidas
        let demandas = await this.modelDemanda.findAll({
            where: {
                titulo: {
                    [sequelize_1.Op.like]: `${letras}%` // Utiliza o operador LIKE para encontrar títulos que começam com as letras especificadas
                }
            }
        });
        if (demandas.length == 0) {
            return (0, resp_1.default)(200, "Demandas's não encontrada!!!"); // Retorna mensagem se não houver demandas
        }
        else {
            return (0, resp_1.default)(200, demandas); // Retorna demandas encontradas
        }
    }
}
// Exporta a classe EmpresaService
exports.default = EmpresaService;
//# sourceMappingURL=EmpresaService.js.map