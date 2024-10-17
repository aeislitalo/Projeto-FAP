import { ModelStatic } from "sequelize"; // Importa ModelStatic do Sequelize
import Empresa from "../database/models/Empresa"; // Importa o modelo Empresa
import resp from "../utils/resp"; // Importa uma função utilitária de resposta
import Demanda from "../database/models/Demanda"; // Importa o modelo Demanda

class EmpresaService {
    // Define modelos estáticos para as classes Empresa e Demanda
    private model: ModelStatic<Empresa> = Empresa;
    private modelDemanda: ModelStatic<Demanda> = Demanda;

    // Método para criar uma nova empresa
    async post(empresaDados: any) {
        let empresa = await this.model.create(Empresa.preencherDados(empresaDados)); // Cria a empresa no banco de dados
        return resp(201, empresa); // Retorna uma resposta com o status 201 (Criado)
    }

    // Método para obter todas as empresas
    async get() {
        let empresas = await this.model.findAll(); // Busca todas as empresas
        return resp(200, empresas); // Retorna uma resposta com o status 200 (OK)
    }

    // Método para atualizar os dados de uma empresa
    async put(idEmpresa: number, empresaDados: any) {
        let empresaDB = await this.model.findByPk(idEmpresa); // Busca a empresa pelo ID

        if (!empresaDB) {
            return resp(404, { message: 'Empresa não encontrada' }); // Retorna 404 se a empresa não for encontrada
        }

        await empresaDB.update(Empresa.preencherDados(empresaDados)); // Atualiza os dados da empresa
        return resp(200, empresaDB); // Retorna a empresa atualizada
    }

    // Método para mudar a senha de uma empresa
    async patch(idEmpresa: number, empresaNovaSenha: any) {
        let empresaDB = await this.model.findByPk(idEmpresa); // Busca a empresa pelo ID

        if (!empresaDB) {
            return resp(404, { message: 'Empresa não encontrada' }); // Retorna 404 se a empresa não for encontrada
        }

        await empresaDB.update({
            senha: empresaNovaSenha.nova_senha // Atualiza a senha da empresa
        });

        return resp(200, empresaDB); // Retorna a empresa com a senha atualizada
    }

    // Método para deletar uma empresa
    async deletar(idEmpresa: number) {
        let empresaDeletada = await this.model.findByPk(idEmpresa); // Busca a empresa pelo ID
        if (!empresaDeletada) {
            return resp(404, { message: 'Empresa não encontrada' }); // Retorna 404 se a empresa não for encontrada
        }

        await empresaDeletada.destroy(); // Deleta a empresa
        return resp(200, { message: 'Empresa deletada com sucesso' }); // Retorna sucesso
    }

    // Método para cadastrar uma nova demanda
    async postCadastrarDemanda(id: number, demanda: any) {
        let dataFinal = Demanda.formatarData(demanda.data_final); // Formata a data final
        let demandaCriacao = await this.modelDemanda.create(Demanda.preencherDemanda(dataFinal, id, demanda)); // Cria a nova demanda
        return resp(201, demandaCriacao); // Retorna a demanda criada
    }

    // Método para mostrar as demandas de uma empresa
    async getMostrarDemandasEmpresas(idEmpresa: number) {
        let empresa = await this.model.findByPk(idEmpresa, { // Busca a empresa pelo ID, incluindo suas demandas
            include: [
                {
                    model: this.modelDemanda, 
                    as: 'demandas' // Associa as demandas à empresa
                }
            ]
        });

        if (!empresa) {
            return resp(404, { message: 'Empresa não encontrada' }); // Retorna 404 se a empresa não for encontrada
        }

        return resp(200, empresa); // Retorna a empresa com suas demandas
    }

    // Método para mostrar todas as demandas
    async getMostrarDemandas() {
        let empresas = await this.modelDemanda.findAll(); // Busca todas as demandas
        return resp(200, empresas); // Retorna as demandas
    }

    // Método para atualizar uma demanda
    async putAtualizarDemanda(idDemanda: number, demandaDados: any) {
        let demandaDB = await this.modelDemanda.findByPk(idDemanda); // Busca a demanda pelo ID

        if (!demandaDB) {
            return resp(404, { message: 'Demanda não encontrada' }); // Retorna 404 se a demanda não for encontrada
        }

        let dataFinal = Demanda.formatarData(demandaDados.data_final); // Formata a data final
        await demandaDB.update(Demanda.preencherDemanda(dataFinal, demandaDB.empresaId, demandaDados)); // Atualiza a demanda

        return resp(200, demandaDB); // Retorna a demanda atualizada
    }

    // Método para mudar a data de uma demanda
    async patchMudarData(idDemanda: number, novaData: any) {
        let demandaDB = await this.modelDemanda.findByPk(idDemanda); // Busca a demanda pelo ID
        let dataFinalFormatada = Demanda.formatarData(novaData.data_final); // Formata a nova data

        if (!demandaDB) {
            return resp(404, { message: 'Demanda não encontrada' }); // Retorna 404 se a demanda não for encontrada
        }

        await demandaDB.update({
            dataFinal: dataFinalFormatada // Atualiza a data final da demanda
        });

        return resp(200, demandaDB); // Retorna a demanda atualizada
    }

    // Método para deletar uma demanda
    async deletarDemandaServico(idDemanda: number) {
        let empresaDeletada = await this.modelDemanda.findByPk(idDemanda); // Busca a demanda pelo ID
        if (!empresaDeletada) {
            return resp(404, { message: 'Demanda não encontrada' }); // Retorna 404 se a demanda não for encontrada
        }

        await empresaDeletada.destroy(); // Deleta a demanda
        return resp(200, { message: 'Demanda deletada com sucesso' }); // Retorna sucesso
    }
}

// Exporta a classe EmpresaService
export default EmpresaService;
