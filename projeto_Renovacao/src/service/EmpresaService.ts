
import resp from "../utils/resp"; // Importa uma função utilitária de resposta
import Demanda from "../database/models/Demanda"; // Importa o modelo Demanda
import MetodosTratamento from "./MetodosTratamentoAuxiliares"; // Importa métodos auxiliares para tratamento
import { Op } from "sequelize"; // Importa operadores do Sequelize
import DTOHelper from "../utils/DTOHelp";

class EmpresaService extends MetodosTratamento {

    
    // Método para criar uma nova empresa
    async postCadastrarEmpresa(reqBody: any) {
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
        return resp(201, "Empresa cadastrada com sucesso!!!");
    }

    //////////////////////////////////////////////// LOGIN //////////////////////////////////////////////////////////
    // Método para realizar o login
    async postLoginEmpresa(email: string, senha: string) {
        try {
            // Verifica se o email e a senha são válidos
            this.tratarEmail(email);
            this.tratarSenha(senha);

            // Retorna uma resposta de sucesso com a empresa encontrada
            
            return resp(200, DTOHelper.getEmpresasDto( await this.fazerLoginEmpresa(email, senha)));
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
        let empresasDTO = empresas.map((empresa) => DTOHelper.getEmpresasDto(empresa));

        return resp(200, empresasDTO); // Retorna uma resposta com o status 200 (OK)
    }

    // Método para atualizar os dados de uma empresa
    async put(idEmpresa: number, reqBody: any) {
        if (reqBody.email) {
            this.tratarEmail(reqBody.email.trim()); // Valida o email
        }
        if (reqBody.senha) {
            this.tratarSenha(reqBody.senha.trim()); // Valida a senha
        }

        let empresaDB = await this.acharEmpresaPorId(idEmpresa); // Busca a empresa pelo ID

        // Cria uma instância de 'EmpresaRequestDTO' usando os dados do corpo da requisição (reqBody)
        let empresaReqDTO = this.tratarEndereco(reqBody, reqBody.cep.trim());

        await empresaDB.update(this.preencherDados(await empresaReqDTO)); // Atualiza os dados da empresa
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
    async MostrarEmpresasHaPartirDasPrimeirasLetras(busca: string) {
        // Faz uma busca no banco de dados procurando empresas cujo nome começa com as letras fornecidas
        let empresas = await this.model.findAll({
            where: {
                nome: {
                    [Op.like]: `${busca}%` // Utiliza o operador LIKE para encontrar nomes que começam com as letras especificadas
                }
            }
        });

        let empresasDTO = empresas.map((empresa) => DTOHelper.getEmpresasDto(empresa)); // Mapeia resultados para DTO

        if (empresasDTO.length == 0) {
            return resp(200, {erro: "Empresa's não existe!!!"}); // Retorna mensagem se não houver empresas
        } else {
            return resp(200, empresasDTO); // Retorna empresas encontradas
        }
    }

    
   

    // Método para mostrar as demandas de uma empresa
    async getMostrarDemandasEmpresasPorId(idEmpresa: number) {
        // Chama o método estático 'visualizarMeusProjetos' da classe Demanda,
        // que recebe o ID da empresa e busca suas demandas relacionadas.
        return resp(200, await Demanda.visualizarMeusProjetos(idEmpresa)); // Retorna a empresa com suas demandas
    }

    
}

// Exporta a classe EmpresaService
export default EmpresaService;
