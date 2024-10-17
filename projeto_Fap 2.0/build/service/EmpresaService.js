"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Empresa_1 = __importDefault(require("../database/models/Empresa")); // Importa o modelo Empresa
const resp_1 = __importDefault(require("../utils/resp")); // Importa uma função utilitária de resposta
const Demanda_1 = __importDefault(require("../database/models/Demanda")); // Importa o modelo Demanda
class EmpresaService {
    // Define modelos estáticos para as classes Empresa e Demanda
    model = Empresa_1.default;
    modelDemanda = Demanda_1.default;
    // Método para criar uma nova empresa
    async post(empresaDados) {
        let empresa = await this.model.create(Empresa_1.default.preencherDados(empresaDados)); // Cria a empresa no banco de dados
        return (0, resp_1.default)(201, empresa); // Retorna uma resposta com o status 201 (Criado)
    }
    // Método para obter todas as empresas
    async get() {
        let empresas = await this.model.findAll(); // Busca todas as empresas
        return (0, resp_1.default)(200, empresas); // Retorna uma resposta com o status 200 (OK)
    }
    // Método para atualizar os dados de uma empresa
    async put(idEmpresa, empresaDados) {
        let empresaDB = await this.model.findByPk(idEmpresa); // Busca a empresa pelo ID
        if (!empresaDB) {
            return (0, resp_1.default)(404, { message: 'Empresa não encontrada' }); // Retorna 404 se a empresa não for encontrada
        }
        await empresaDB.update(Empresa_1.default.preencherDados(empresaDados)); // Atualiza os dados da empresa
        return (0, resp_1.default)(200, empresaDB); // Retorna a empresa atualizada
    }
    // Método para mudar a senha de uma empresa
    async patch(idEmpresa, empresaNovaSenha) {
        let empresaDB = await this.model.findByPk(idEmpresa); // Busca a empresa pelo ID
        if (!empresaDB) {
            return (0, resp_1.default)(404, { message: 'Empresa não encontrada' }); // Retorna 404 se a empresa não for encontrada
        }
        await empresaDB.update({
            senha: empresaNovaSenha.nova_senha // Atualiza a senha da empresa
        });
        return (0, resp_1.default)(200, empresaDB); // Retorna a empresa com a senha atualizada
    }
    // Método para deletar uma empresa
    async deletar(idEmpresa) {
        let empresaDeletada = await this.model.findByPk(idEmpresa); // Busca a empresa pelo ID
        if (!empresaDeletada) {
            return (0, resp_1.default)(404, { message: 'Empresa não encontrada' }); // Retorna 404 se a empresa não for encontrada
        }
        await empresaDeletada.destroy(); // Deleta a empresa
        return (0, resp_1.default)(200, { message: 'Empresa deletada com sucesso' }); // Retorna sucesso
    }
    // Método para cadastrar uma nova demanda
    async postCadastrarDemanda(id, demanda) {
        let dataFinal = Demanda_1.default.formatarData(demanda.data_final); // Formata a data final
        let demandaCriacao = await this.modelDemanda.create(Demanda_1.default.preencherDemanda(dataFinal, id, demanda)); // Cria a nova demanda
        return (0, resp_1.default)(201, demandaCriacao); // Retorna a demanda criada
    }
    // Método para mostrar as demandas de uma empresa
    async getMostrarDemandasEmpresas(idEmpresa) {
        let empresa = await this.model.findByPk(idEmpresa, {
            include: [
                {
                    model: this.modelDemanda,
                    as: 'demandas' // Associa as demandas à empresa
                }
            ]
        });
        if (!empresa) {
            return (0, resp_1.default)(404, { message: 'Empresa não encontrada' }); // Retorna 404 se a empresa não for encontrada
        }
        return (0, resp_1.default)(200, empresa); // Retorna a empresa com suas demandas
    }
    // Método para mostrar todas as demandas
    async getMostrarDemandas() {
        let empresas = await this.modelDemanda.findAll(); // Busca todas as demandas
        return (0, resp_1.default)(200, empresas); // Retorna as demandas
    }
    // Método para atualizar uma demanda
    async putAtualizarDemanda(idDemanda, demandaDados) {
        let demandaDB = await this.modelDemanda.findByPk(idDemanda); // Busca a demanda pelo ID
        if (!demandaDB) {
            return (0, resp_1.default)(404, { message: 'Demanda não encontrada' }); // Retorna 404 se a demanda não for encontrada
        }
        let dataFinal = Demanda_1.default.formatarData(demandaDados.data_final); // Formata a data final
        await demandaDB.update(Demanda_1.default.preencherDemanda(dataFinal, demandaDB.empresaId, demandaDados)); // Atualiza a demanda
        return (0, resp_1.default)(200, demandaDB); // Retorna a demanda atualizada
    }
    // Método para mudar a data de uma demanda
    async patchMudarData(idDemanda, novaData) {
        let demandaDB = await this.modelDemanda.findByPk(idDemanda); // Busca a demanda pelo ID
        let dataFinalFormatada = Demanda_1.default.formatarData(novaData.data_final); // Formata a nova data
        if (!demandaDB) {
            return (0, resp_1.default)(404, { message: 'Demanda não encontrada' }); // Retorna 404 se a demanda não for encontrada
        }
        await demandaDB.update({
            dataFinal: dataFinalFormatada // Atualiza a data final da demanda
        });
        return (0, resp_1.default)(200, demandaDB); // Retorna a demanda atualizada
    }
    // Método para deletar uma demanda
    async deletarDemandaServico(idDemanda) {
        let empresaDeletada = await this.modelDemanda.findByPk(idDemanda); // Busca a demanda pelo ID
        if (!empresaDeletada) {
            return (0, resp_1.default)(404, { message: 'Demanda não encontrada' }); // Retorna 404 se a demanda não for encontrada
        }
        await empresaDeletada.destroy(); // Deleta a demanda
        return (0, resp_1.default)(200, { message: 'Demanda deletada com sucesso' }); // Retorna sucesso
    }
}
// Exporta a classe EmpresaService
exports.default = EmpresaService;
