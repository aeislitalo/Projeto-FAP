import { ModelStatic } from "sequelize"; // Importa ModelStatic do Sequelize
import Empresa from "../database/models/Empresa"; // Importa o modelo Empresa
import resp from "../utils/resp"; // Importa uma função utilitária de resposta
import Demanda from "../database/models/Demanda"; // Importa o modelo Demanda
import EmpresaResquestDTO from "../dto/EmpresaRequestDTO";
import EmpresaResponsetDTO from "../dto/EmpresaResponseDTO";
import Validacao from "validator";

class EmpresaService {
    // Define modelos estáticos para as classes Empresa e Demanda
    private model: ModelStatic<Empresa> = Empresa;
    private modelDemanda: ModelStatic<Demanda> = Demanda;


    // Método para criar uma nova empresa
    async post(reqBody: any) {
        // Valida o formato do email utilizando o método 'tratarEmail', que verifica se o email é válido
        this.tratarEmail(reqBody.email.trim());
        
        // Valida a senha utilizando o método 'tratarSenha', que verifica se a senha atende aos critérios (letra e número)
        this.tratarSenha(reqBody.senha.trim());
    
        // Cria uma instância de 'EmpresaRequestDTO' usando os dados do corpo da requisição (reqBody)
        // Os dados são trimados (removidos espaços em branco nas pontas) para garantir consistência
        let empresaReqDTO = new EmpresaResquestDTO(
            reqBody.nome.trim(),      // Nome da empresa
            reqBody.cnpj.trim(),      // CNPJ da empresa
            reqBody.pais.trim(),      // País da empresa
            reqBody.estado.trim(),    // Estado da empresa
            reqBody.cidade.trim(),    // Cidade da empresa
            reqBody.bairro.trim(),    // Bairro da empresa
            reqBody.rua.trim(),       // Rua da empresa
            reqBody.numero.trim(),    // Número do endereço da empresa
            reqBody.cep.trim(),       // CEP da empresa
            reqBody.email.trim(),     // Email da empresa
            reqBody.senha.trim(),     // Senha da empresa
            reqBody.contato.trim()    // Contato da empresa
        );
    
        // Chama o método estático 'preencherDados' da classe 'Empresa' para preencher os dados da empresa
        // A partir do DTO, que encapsula as informações necessárias para a criação no banco
        await this.model.create(Empresa.preencherDados(empresaReqDTO)); // Cria a empresa no banco de dados
    
        // Retorna uma resposta com status 201 (Criado) e uma mensagem de sucesso
        return resp(201, "Empresa cadastrada com sucesso!!!");
    }
    //////////////////////////////////////////////// LOGIN //////////////////////////////////////////////////////////
    //Método para realizar o login
    async postLoginEmpresa(email:string, senha:string){
        this.tratarEmail(email);
        this.tratarSenha(senha);
       let empresaEncontrada =  await Empresa.FazerLogin(this.model,email,senha);
       return resp(200, empresaEncontrada);
    }
     //////////////////////////////////////////////// LOGIN //////////////////////////////////////////////////////////
    // Método para obter todas as empresas
    async get() {
        let empresas = await this.model.findAll(); // Busca todas as empresas
        // Mapeia os resultados para o formato do DTO
        let empresasDTO = empresas.map((empresa) => this.getEmpresasDto(empresa));
        return resp(200, empresasDTO); // Retorna uma resposta com o status 200 (OK)
    }
    //Método auxiliar para obter apenas o necessario para mostrar ao cliente
    private getEmpresasDto(empresa: Empresa): EmpresaResponsetDTO {
        // Cria e retorna um objeto que representa a resposta da empresa com os campos id, nome e email
        return {
            id: empresa.id,           // Acessa o ID da empresa fornecida como parâmetro
            nome: empresa.nome,       // Acessa o nome da empresa fornecida como parâmetro
            email: empresa.email      // Acessa o email da empresa fornecida como parâmetro
        }
    }

    // Método para atualizar os dados de uma empresa
    async put(idEmpresa: number, reqBody: any) {
        this.tratarEmail(reqBody.email.trim());
        this.tratarSenha(reqBody.senha.trim());
        let empresaDB = await this.acharEmpresaPorId(idEmpresa); // Busca a empresa pelo ID

         // Cria uma instância de 'EmpresaRequestDTO' usando os dados do corpo da requisição (reqBody)
        // Os dados são trimados (removidos espaços em branco nas pontas) para garantir consistência
        let empresaReqDTO = new EmpresaResquestDTO(
            reqBody.nome.trim(),      // Nome da empresa
            reqBody.cnpj.trim(),      // CNPJ da empresa
            reqBody.pais.trim(),      // País da empresa
            reqBody.estado.trim(),    // Estado da empresa
            reqBody.cidade.trim(),    // Cidade da empresa
            reqBody.bairro.trim(),    // Bairro da empresa
            reqBody.rua.trim(),       // Rua da empresa
            reqBody.numero.trim(),    // Número do endereço da empresa
            reqBody.cep.trim(),       // CEP da empresa
            reqBody.email.trim(),     // Email da empresa
            reqBody.senha.trim(),     // Senha da empresa
            reqBody.contato.trim()    // Contato da empresa
        );

        await empresaDB.update(Empresa.preencherDados(empresaReqDTO)); // Atualiza os dados da empresa
        return resp(200, empresaDB); // Retorna a empresa atualizada
    }

    // Método para mudar a senha de uma empresa
    async patch(idEmpresa: number, empresaNovaSenha: any) {
        this.tratarSenha(empresaNovaSenha.senha.trim());
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
        return resp(200, { message: 'Empresa deletada com sucesso' }); // Retorna sucesso
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
      // Método para mostrar empresa pertence há demanda
    async getMostrarEmpresasPertencenteHaDemanda(idDemanda:number){
        let empresaPorDemanda = await Demanda.visualizarEmpresasDemandas(idDemanda);
        return resp(200, empresaPorDemanda);
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
        return resp(200, { message: 'Demanda deletada com sucesso' }); // Retorna sucesso
    }
    /////////////////////////////////////////////////// Métodos Auxiliares //////////////////////////////////////////////////////////////////
    // Métodos auxiliares para encontrar Empresa e Demanda
    private async acharEmpresaPorId(idEmpresa: number): Promise<Empresa> {
        let empresa = await this.model.findByPk(idEmpresa);
        if (!empresa) throw new Error('Empresa não encontrada');
        return empresa;
    }

    private async acharDemandaPorId(idDemanda: number): Promise<Demanda> {
        let demanda = await this.modelDemanda.findByPk(idDemanda);
        if (!demanda) throw new Error('Demanda não encontrada');
        return demanda;
    }
    //Métodos auxiliares para tratar email e senha
    private tratarEmail(email: string): void {
       
        // Verifica se o email está vazio ou consiste apenas em espaços em branco
        if (!email.trim()) {
            throw new Error('O email não pode estar em branco');
        // Verifica se o email não é válido utilizando a função isEmail da classe Validacao
        }else if(!Validacao.isEmail(email)){
            throw new Error('Email inválido ');
        }
    }
    private tratarSenha(senha: string) {
        // Verifica se a senha contém pelo menos uma letra e um número
        const expressaoRegularSenha = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]*$/;

        // Se a senha não for válida, lança uma exceção
        if (!senha ||!expressaoRegularSenha.test(senha)) {
            throw new Error('A senha deve conter pelo menos uma letra e um número.');
        }
    }

}

// Exporta a classe EmpresaService
export default EmpresaService;
