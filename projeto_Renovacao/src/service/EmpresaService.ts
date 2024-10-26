import Empresa from "../database/models/Empresa"; // Importa o modelo Empresa
import resp from "../utils/resp"; // Importa uma função utilitária de resposta
import Demanda from "../database/models/Demanda"; // Importa o modelo Demanda
import MetodosTratamento from "./MetodosTratamentoAuxiliares"; // Importa métodos auxiliares para tratamento
import { Op } from "sequelize"; // Importa operadores do Sequelize

class EmpresaService extends MetodosTratamento {

    // Método para criar uma nova empresa
    async post(reqBody: any) {
        // Valida o formato do email utilizando o método 'tratarEmail', que verifica se o email é válido
        this.tratarEmail(reqBody.email.trim());

        // Valida a senha utilizando o método 'tratarSenha', que verifica se a senha atende aos critérios (letra e número)
        this.tratarSenha(reqBody.senha.trim());

        // Cria uma instância de 'EmpresaRequestDTO' usando os dados do corpo da requisição (reqBody)
        let empresaReqDTO = this.criarObjetoEmpresaInstituicaoDTO(reqBody);
        
        // Chama o método estático 'preencherDados' da classe 'Empresa' para preencher os dados da empresa
        // A partir do DTO, que encapsula as informações necessárias para a criação no banco
        await this.model.create(this.preencherDados(empresaReqDTO)); // Cria a empresa no banco de dados

        // Retorna uma resposta com status 201 (Criado) e uma mensagem de sucesso
        return resp(201, "Empresa cadastrada com sucesso!!!");
    }

    //////////////////////////////////////////////// LOGIN //////////////////////////////////////////////////////////
    // Método para realizar o login
    async postLoginEmpresa(email: string, senha: string) {
        try {
            // Verifica se o email e a senha são válidos
            this.tratarEmail(email);
            this.tratarSenha(senha);
            
            // Realiza o login e busca a empresa
            let empresaEncontrada = await this.fazerLoginEmpresa(email, senha);
    
            // Retorna uma resposta de sucesso com a empresa encontrada
            return resp(200, empresaEncontrada);
        } catch (error: any) {
            // Lança o erro capturado
            return resp(400, { mensagem: error.message || 'Erro desconhecido.' }); 
        }
    }
    //////////////////////////////////////////////// LOGIN //////////////////////////////////////////////////////////

    // Método para obter todas as empresas
    async get() {
        let empresas = await this.model.findAll(); // Busca todas as empresas
        
        // Mapeia os resultados para o formato do DTO
        let empresasDTO = empresas.map((empresa) => this.getEmpresasDto(empresa));
        
        return resp(200, empresasDTO); // Retorna uma resposta com o status 200 (OK)
    }

    // Método para atualizar os dados de uma empresa
    async put(idEmpresa: number, reqBody: any) {
        this.tratarEmail(reqBody.email.trim()); // Valida o email
        this.tratarSenha(reqBody.senha.trim()); // Valida a senha
        
        let empresaDB = await this.acharEmpresaPorId(idEmpresa); // Busca a empresa pelo ID

        // Cria uma instância de 'EmpresaRequestDTO' usando os dados do corpo da requisição (reqBody)
        let empresaReqDTO = this.criarObjetoEmpresaInstituicaoDTO(reqBody);

        await empresaDB.update(this.preencherDados(empresaReqDTO)); // Atualiza os dados da empresa
        return resp(200, empresaDB); // Retorna a empresa atualizada
    }

    // Método para mudar a senha de uma empresa
    async patch(idEmpresa: number, empresaNovaSenha: any) {
        this.tratarSenha(empresaNovaSenha.nova_senha.trim()); // Valida a nova senha
        let empresaDB = await this.acharEmpresaPorId(idEmpresa); // Busca a empresa pelo ID
        
        await empresaDB.update({
            senha: empresaNovaSenha.nova_senha // Atualiza a senha da empresa
        });

        return resp(200, empresaDB); // Retorna a empresa com a senha atualizada
    }

    // Método para deletar uma empresa
    async deletar(idEmpresa: number) {
        let empresaDeletada = await this.acharEmpresaPorId(idEmpresa); // Busca a empresa pelo ID
        await empresaDeletada.destroy(); // Deleta a empresa
        return resp(200, 'Empresa deletada com sucesso'); // Retorna sucesso
    }

    // Método para mostrar empresas a partir das primeiras letras do nome
    async MostrarEmpresasHaPartirDasPrimeirasLetras(letras: string) {
        // Faz uma busca no banco de dados procurando empresas cujo nome começa com as letras fornecidas
        let empresas = await this.model.findAll({
            where: {
                nome: {
                    [Op.like]: `${letras}%` // Utiliza o operador LIKE para encontrar nomes que começam com as letras especificadas
                }
            }
        });
        
        let empresasDTO = empresas.map((empresa) => this.getEmpresasDto(empresa)); // Mapeia resultados para DTO
        
        if (empresasDTO.length == 0) {
            return resp(200, "Empresa's não existe!!!"); // Retorna mensagem se não houver empresas
        } else {
            return resp(200, empresasDTO); // Retorna empresas encontradas
        }
    }
    
    //////////////////////////////////////////////// METODOS PARA DEMANDA //////////////////////////////////////////////////////////////////////////

    // Método para cadastrar uma nova demanda
    async postCadastrarDemanda(id: number, demanda: any) {
        let dataFinal = Demanda.formatarData(demanda.data_final); // Formata a data final
        let demandaCriacao = await this.modelDemanda.create(Demanda.preencherDemanda(dataFinal, id, demanda)); // Cria a nova demanda
        return resp(201, demandaCriacao); // Retorna a demanda criada
    }

    // Método para mostrar as demandas de uma empresa
    async getMostrarDemandasEmpresas(idEmpresa: number) {
        // Chama o método estático 'visualizarMeusProjetos' da classe Demanda,
        // que recebe o ID da empresa e busca suas demandas relacionadas.
        let empresa = await Demanda.visualizarMeusProjetos(idEmpresa);

        return resp(200, empresa); // Retorna a empresa com suas demandas
    }

    // Método para mostrar todas as demandas
    async getMostrarDemandas() {
        let empresas = await this.modelDemanda.findAll(); // Busca todas as demandas
        return resp(200, empresas); // Retorna as demandas
    }

    // Método para mostrar empresas pertencentes a uma demanda
    async getMostrarEmpresasPertencenteHaDemanda(idDemanda: number) {
        let empresaPorDemanda = await Demanda.visualizarEmpresasDemandas(idDemanda); // Busca empresas relacionadas à demanda
        return resp(200, empresaPorDemanda); // Retorna empresas encontradas
    }

    // Método para atualizar uma demanda
    async putAtualizarDemanda(idDemanda: number, demandaDados: any) {
        let demandaDB = await this.acharDemandaPorId(idDemanda); // Busca a demanda pelo ID

        let dataFinal = Demanda.formatarData(demandaDados.data_final); // Formata a data final
        await demandaDB.update(Demanda.preencherDemanda(dataFinal, demandaDB.empresaId, demandaDados)); // Atualiza a demanda

        return resp(200, demandaDB); // Retorna a demanda atualizada
    }

    // Método para mudar a data de uma demanda
    async patchMudarData(idDemanda: number, novaData: any) {
        let demandaDB = await this.acharDemandaPorId(idDemanda); // Busca a demanda pelo ID
        let dataFinalFormatada = Demanda.formatarData(novaData.data_final); // Formata a nova data

        await demandaDB.update({
            dataFinal: dataFinalFormatada // Atualiza a data final da demanda
        });

        return resp(200, demandaDB); // Retorna a demanda atualizada
    }

    // Método para deletar uma demanda
    async deletarDemandaServico(idDemanda: number) {
        let empresaDeletada = await this.acharDemandaPorId(idDemanda); // Busca a demanda pelo ID

        await empresaDeletada.destroy(); // Deleta a demanda
        return resp(200, 'Demanda deletada com sucesso'); // Retorna sucesso
    }

    // Método para mostrar demandas a partir das primeiras letras do título
    async MostrarDemandasHaPartirDasPrimeirasLetras(letras: string) {
        // Faz uma busca no banco de dados procurando demandas cujo nome começa com as letras fornecidas
        let demandas = await this.modelDemanda.findAll({
            where: {
                titulo: {
                    [Op.like]: `${letras}%` // Utiliza o operador LIKE para encontrar títulos que começam com as letras especificadas
                }
            }
        });
  
        if (demandas.length == 0) {
            return resp(200, "Demandas's não encontrada!!!"); // Retorna mensagem se não houver demandas
        } else {
            return resp(200, demandas); // Retorna demandas encontradas
        }
    }
}

// Exporta a classe EmpresaService
export default EmpresaService;
