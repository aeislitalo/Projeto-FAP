"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resp_1 = __importDefault(require("../utils/resp")); // Importa uma função utilitária de resposta
const Demanda_1 = __importDefault(require("../database/models/Demanda")); // Importa o modelo Demanda
const MetodosTratamentoAuxiliares_1 = __importDefault(require("./MetodosTratamentoAuxiliares")); // Importa métodos auxiliares para tratamento
const sequelize_1 = require("sequelize"); // Importa operadores do Sequelize
const DTOHelp_1 = __importDefault(require("../utils/DTOHelp"));
class EmpresaService extends MetodosTratamentoAuxiliares_1.default {
    // Método para criar uma nova empresa
    async postCadastrarEmpresa(reqBody) {
        // Valida o formato do email utilizando o método 'tratarEmail', que verifica se o email é válido
        this.tratarEmail(reqBody.email.trim());
        // Valida a senha utilizando o método 'tratarSenha', que verifica se a senha atende aos critérios (letra e número)
        this.tratarSenha(reqBody.senha.trim());
        // Cria uma instância de 'EmpresaRequestDTO' usando os dados do corpo da requisição (reqBody)
        let empresaReqDTO = await this.tratarEndereco(reqBody, reqBody.cep.trim());
        // Chama o método estático 'preencherDados' da classe 'Empresa' para preencher os dados da empresa
        // A partir do DTO, que encapsula as informações necessárias para a criação no banco
        await this.model.create(this.preencherDados(empresaReqDTO)); // Cria a empresa no banco de dados
        // Retorna uma resposta com status 201 (Criado) e uma mensagem de sucesso
        return (0, resp_1.default)(201, "");
    }
    //////////////////////////////////////////////// LOGIN //////////////////////////////////////////////////////////
    // Método para realizar o login
    async postLoginEmpresa(email, senha) {
        try {
            // Verifica se o email e a senha são válidos
            this.tratarEmail(email);
            this.tratarSenha(senha);
            // Retorna uma resposta de sucesso com a empresa encontrada
            return (0, resp_1.default)(200, DTOHelp_1.default.getEmpresasDto(await this.fazerLoginEmpresa(email, senha)));
        }
        catch (error) {
            // Lança o erro capturado
            return (0, resp_1.default)(400, { erro: error.message || 'Erro desconhecido.' });
        }
    }
    //////////////////////////////////////////////// LOGIN //////////////////////////////////////////////////////////
    // Método para obter todas as empresas
    async getMostrarTodasAsEmpresas() {
        let empresas = await this.model.findAll(); // Busca todas as empresas
        // Mapeia os resultados para o formato do DTO
        let empresasDTO = empresas.map((empresa) => DTOHelp_1.default.getEmpresasDto(empresa));
        return (0, resp_1.default)(200, empresasDTO); // Retorna uma resposta com o status 200 (OK)
    }
    // Método para atualizar os dados de uma empresa
    async putAtualizarEmpresa(idEmpresa, reqBody) {
        if (reqBody.email != null) {
            this.tratarEmail(reqBody.email.trim()); // Valida e trata o email, se fornecido
        }
        if (reqBody.senha != null) {
            this.tratarSenha(reqBody.senha.trim()); // Valida e trata a senha, se fornecida
        }
        let empresaDB = await this.acharEmpresaPorId(idEmpresa); // Busca a instituição pelo ID
        let empresaReqDTO;
        if (reqBody.cep && reqBody.cep.trim() !== "") {
            empresaReqDTO = this.tratarEndereco(reqBody, reqBody.cep.trim()); // Trata o endereço com base no CEP
        }
        else {
            empresaReqDTO = this.tratarEndereco(reqBody, empresaDB.cep);
        }
        await empresaDB.update(this.preencherDados(await empresaReqDTO)); // Atualiza os dados da instituição no banco de dados
        return (0, resp_1.default)(204, ""); // Retorna a empresa atualizada
    }
    // Método para mudar a senha de uma empresa
    async patchAtualizarApenasSenha(idEmpresa, empresaNovaSenha) {
        this.tratarSenha(empresaNovaSenha.nova_senha.trim()); // Valida a nova senha
        let empresaDB = await this.acharEmpresaPorId(idEmpresa); // Busca a empresa pelo ID
        await empresaDB.update({
            senha: empresaNovaSenha.nova_senha // Atualiza a senha da empresa
        });
        return (0, resp_1.default)(204, empresaDB); // Retorna a empresa com a senha atualizada
    }
    // Método para deletar uma empresa
    async deletar(idEmpresa) {
        let empresaDeletada = await this.acharEmpresaPorId(idEmpresa); // Busca a empresa pelo ID
        await empresaDeletada.destroy(); // Deleta a empresa
        return (0, resp_1.default)(204, ""); // Retorna sucesso
    }
    // Método para mostrar empresas a partir das primeiras letras do nome
    async MostrarEmpresasHaPartirDasPrimeirasLetras(busca) {
        // Faz uma busca no banco de dados procurando empresas cujo nome começa com as letras fornecidas
        let empresas = await this.model.findAll({
            where: {
                nome: {
                    [sequelize_1.Op.like]: `${busca}%` // Utiliza o operador LIKE para encontrar nomes que começam com as letras especificadas
                }
            }
        });
        let empresasDTO = empresas.map((empresa) => DTOHelp_1.default.getEmpresasDto(empresa)); // Mapeia resultados para DTO
        if (empresasDTO.length == 0) {
            return (0, resp_1.default)(500, { erro: "Empresa's não existe!!!" }); // Retorna mensagem se não houver empresas
        }
        else {
            return (0, resp_1.default)(200, empresasDTO); // Retorna empresas encontradas
        }
    }
    // Método para mostrar as demandas de uma empresa
    async getMostrarDemandasEmpresasPorId(idEmpresa) {
        // Chama o método estático 'visualizarMeusProjetos' da classe Demanda,
        // que recebe o ID da empresa e busca suas demandas relacionadas.
        return (0, resp_1.default)(200, await Demanda_1.default.visualizarMeusProjetos(idEmpresa)); // Retorna a empresa com suas demandas
    }
}
// Exporta a classe EmpresaService
exports.default = EmpresaService;
//# sourceMappingURL=EmpresaService.js.map