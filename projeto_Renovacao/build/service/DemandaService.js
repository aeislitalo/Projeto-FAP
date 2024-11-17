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
const DemandaPega_1 = __importDefault(require("../database/models/DemandaPega"));
class DemandaService extends MetodosTratamentoAuxiliares_1.default {
    // Método para cadastrar uma nova demanda
    async postCadastrarDemanda(id, demanda) {
        let data_limite = Demanda_1.default.formatarData(demanda.data_limite); // Formata a data final
        await this.modelDemanda.create(Demanda_1.default.preencherDemanda(data_limite, id, demanda)); // Cria a nova demanda
        return (0, resp_1.default)(201, ""); // Retorna a demanda criada
    }
    // Método para mostrar todas as demandas
    async getMostrarDemandas() {
        let demandas = await this.modelDemanda.findAll(); // Busca todas as demandas
        let demandasDTO = demandas.map(demanda => DTOHelp_1.default.getDemandaDTO(demanda));
        return (0, resp_1.default)(200, demandasDTO); // Retorna as demandas
    }
    // Método para mostrar empresas pertencentes a uma demanda
    async getMostrarEmpresasPertencenteHaDemanda(idDemanda) {
        let empresaPorDemanda = await Demanda_1.default.visualizarEmpresasDemandas(idDemanda); // Busca empresas relacionadas à demanda
        return (0, resp_1.default)(200, empresaPorDemanda); // Retorna empresas encontradas
    }
    // Método para atualizar uma demanda
    async putAtualizarDemanda(idDemanda, demandaDados) {
        let demandaDB = await this.acharDemandaPorId(idDemanda); // Busca a demanda pelo ID
        let dataFinal;
        if (demandaDados.data_final && demandaDados.data_final.trim() != "") {
            dataFinal = Demanda_1.default.formatarData(demandaDados.data_final); // Formata a data final
        }
        else {
            dataFinal = demandaDB.dataLimiteParaFicarDisponivel;
        }
        await demandaDB.update(Demanda_1.default.preencherDemanda(dataFinal, demandaDB.empresaId, demandaDados)); // Atualiza a demanda
        return (0, resp_1.default)(204, ""); // Retorna a demanda atualizada
    }
    // Método para mudar a data de uma demanda
    async patchMudarData(idDemanda, novaData) {
        let demandaDB = await this.acharDemandaPorId(idDemanda); // Busca a demanda pelo ID
        let dataFinalFormatada = Demanda_1.default.formatarData(novaData.data_final); // Formata a nova data
        await demandaDB.update({
            dataLimiteParaFicarDisponivel: dataFinalFormatada // Atualiza a data final da demanda
        });
        return (0, resp_1.default)(204, ""); // Retorna a demanda atualizada
    }
    async patchAtualizarPrazo(idDemanda, novoPrazo) {
        let demandaDB = await this.acharDemandaPorId(idDemanda);
        await demandaDB.update({
            prazo: novoPrazo
        });
        await DemandaPega_1.default.update({ dataPrazo: await this.CalcularDataPrazo(novoPrazo) }, { where: { demandaId: demandaDB.id } });
        return (0, resp_1.default)(204, "");
    }
    // Método para deletar uma demanda
    async deletarDemandaServico(idDemanda) {
        let empresaDeletada = await this.acharDemandaPorId(idDemanda); // Busca a demanda pelo ID
        await empresaDeletada.destroy(); // Deleta a demanda
        return (0, resp_1.default)(204, ""); // Retorna sucesso
    }
    // Método para mostrar demandas a partir das primeiras letras do título
    async MostrarDemandasHaPartirDasPrimeirasLetras(busca) {
        // Faz uma busca no banco de dados procurando demandas cujo nome começa com as letras fornecidas
        let demandas = await this.modelDemanda.findAll({
            where: {
                titulo: {
                    [sequelize_1.Op.like]: `${busca}%` // Utiliza o operador LIKE para encontrar títulos que começam com as letras especificadas
                }
            }
        });
        if (demandas.length == 0) {
            return (0, resp_1.default)(500, { erro: "Demandas's não encontrada!!!" }); // Retorna mensagem se não houver demandas
        }
        else {
            return (0, resp_1.default)(200, demandas); // Retorna demandas encontradas
        }
    }
}
exports.default = DemandaService;
//# sourceMappingURL=DemandaService.js.map