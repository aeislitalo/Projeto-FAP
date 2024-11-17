import resp from "../utils/resp"; // Importa uma função utilitária de resposta
import Demanda from "../database/models/Demanda"; // Importa o modelo Demanda
import MetodosTratamento from "./MetodosTratamentoAuxiliares"; // Importa métodos auxiliares para tratamento
import { Op, where } from "sequelize"; // Importa operadores do Sequelize
import DTOHelper from "../utils/DTOHelp";
import DemandaPega from "../database/models/DemandaPega";

class DemandaService extends MetodosTratamento {
    


    // Método para cadastrar uma nova demanda
    async postCadastrarDemanda(id: number, demanda: any) {
        let data_limite = Demanda.formatarData(demanda.data_limite); // Formata a data final
         await this.modelDemanda.create(Demanda.preencherDemanda(data_limite, id, demanda)); // Cria a nova demanda
        return resp(201, ""); // Retorna a demanda criada
    }
    // Método para mostrar todas as demandas
    async getMostrarDemandas() {
        let demandas = await this.modelDemanda.findAll(); // Busca todas as demandas
        let demandasDTO = demandas.map(demanda => DTOHelper.getDemandaDTO(demanda));
        return resp(200, demandasDTO); // Retorna as demandas
    }

    // Método para mostrar empresas pertencentes a uma demanda
    async getMostrarEmpresasPertencenteHaDemanda(idDemanda: number) {
        let empresaPorDemanda = await Demanda.visualizarEmpresasDemandas(idDemanda); // Busca empresas relacionadas à demanda
        return resp(200, empresaPorDemanda); // Retorna empresas encontradas
    }

    // Método para atualizar uma demanda
    async putAtualizarDemanda(idDemanda: number, demandaDados: any) {
        let demandaDB = await this.acharDemandaPorId(idDemanda); // Busca a demanda pelo ID
        let dataFinal;
     
        if(demandaDados.data_final && demandaDados.data_final.trim() !=""){
            dataFinal = Demanda.formatarData(demandaDados.data_final); // Formata a data final
        }else{
            dataFinal = demandaDB.dataLimiteParaFicarDisponivel;
        }
        
        if(demandaDados.prazo == undefined){
            demandaDados.prazo = demandaDB.prazo;
        }

        await demandaDB.update(Demanda.preencherDemanda(dataFinal, demandaDB.empresaId, demandaDados)); // Atualiza a demanda

        return resp(204, ""); // Retorna a demanda atualizada
    }

    // Método para mudar a data de uma demanda
    async patchMudarData(idDemanda: number, novaData: any) {
        let demandaDB = await this.acharDemandaPorId(idDemanda); // Busca a demanda pelo ID
        let dataFinalFormatada = Demanda.formatarData(novaData.data_final); // Formata a nova data

        await demandaDB.update({
            dataLimiteParaFicarDisponivel: dataFinalFormatada // Atualiza a data final da demanda
        });

        return resp(204, ""); // Retorna a demanda atualizada
    }
    async patchAtualizarPrazo(idDemanda:number,novoPrazo:number){
        let demandaDB = await this.acharDemandaPorId(idDemanda);
        await demandaDB.update({
            prazo:novoPrazo
        });
        await DemandaPega.update(
            
           { dataPrazo: await this.CalcularDataPrazo(novoPrazo)},
           {where:{demandaId:demandaDB.id}} 
        );
        
        return resp(204,"");
    }

    // Método para deletar uma demanda
    async deletarDemandaServico(idDemanda: number) {
        let empresaDeletada = await this.acharDemandaPorId(idDemanda); // Busca a demanda pelo ID

        await empresaDeletada.destroy(); // Deleta a demanda
        return resp(204,""); // Retorna sucesso
    }

    // Método para mostrar demandas a partir das primeiras letras do título
    async MostrarDemandasHaPartirDasPrimeirasLetras(busca: string) {
        // Faz uma busca no banco de dados procurando demandas cujo nome começa com as letras fornecidas
        let demandas = await this.modelDemanda.findAll({
            where: {
                titulo: {
                    [Op.like]: `${busca}%` // Utiliza o operador LIKE para encontrar títulos que começam com as letras especificadas
                }
            }
        });

        if (demandas.length == 0) {
            return resp(500, { erro: "Demandas's não encontrada!!!" }); // Retorna mensagem se não houver demandas
        } else {
            return resp(200, demandas); // Retorna demandas encontradas
        }
    }



}

export default DemandaService;