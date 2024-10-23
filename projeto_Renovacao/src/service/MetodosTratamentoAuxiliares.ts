import Validacao from "validator";
import Empresa from "../database/models/Empresa"; // Importa o modelo Empresa
import Demanda from "../database/models/Demanda"; // Importa o modelo Demanda
import { ModelStatic } from "sequelize"; // Importa ModelStatic do Sequelize
import EmpresaRequestDTO from "../dto/EmpresaInstituicaoRequestDTO";
import EmpresaResponsetDTO from "../dto/EmpresaResponseDTO";
import Instituicao from "../database/models/Instituicao";
abstract class MetodosTratamentoAuxiliares{
 // Define modelos estáticos para as classes Empresa e Demanda
 protected model: ModelStatic<Empresa> = Empresa;
 protected modelDemanda: ModelStatic<Demanda> = Demanda;
 protected modelInstituicao:ModelStatic<Instituicao> = Instituicao;
    /////////////////////////////////////////////////// Métodos Auxiliares //////////////////////////////////////////////////////////////////
    // Métodos auxiliares para encontrar Empresa e Demanda
    protected async acharEmpresaPorId(idEmpresa: number): Promise<Empresa> {
        let empresa = await this.model.findByPk(idEmpresa);
        if (!empresa) throw new Error('Empresa não encontrada');
        return empresa;
    }
    protected async acharInstituicaoPorId(idInstituicao: number): Promise<Empresa> {
        let instituicao= await this.modelInstituicao.findByPk(idInstituicao);
        if (!instituicao) throw new Error('Empresa não encontrada');
        return instituicao;
    }

    protected async acharDemandaPorId(idDemanda: number): Promise<Demanda> {
        let demanda = await this.modelDemanda.findByPk(idDemanda);
        if (!demanda) throw new Error('Demanda não encontrada');
        return demanda;
    }
    //Métodos auxiliares para tratar email e senha
    protected tratarEmail(email: string): void {
       
        // Verifica se o email está Invalido
        if (!Validacao.isEmail(email)) {
            throw new Error('Email Invalido!!!');
        }
    }
    protected tratarSenha(senha: string) {
        // Verifica se a senha contém pelo menos uma letra e um número
        const expressaoRegularSenha = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]*$/;

        // Se a senha não for válida, lança uma exceção
        if (!senha ||!expressaoRegularSenha.test(senha)) {
            throw new Error('A senha deve conter pelo menos uma letra e um número.');
        }
    }
     
        // Os dados são trimados (removidos espaços em branco nas pontas) para garantir consistência
    protected criarObjetoEmpresaInstituicaoDTO(reqBody:any):EmpresaRequestDTO{
        return new EmpresaRequestDTO(
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
    }

     //Método auxiliar para obter apenas o necessario para mostrar ao cliente
     protected getEmpresasDto(empresa: Empresa): EmpresaResponsetDTO {
        // Cria e retorna um objeto que representa a resposta da empresa com os campos id, nome e email
        return {
            id: empresa.id!,           // Acessa o ID da empresa fornecida como parâmetro
            nome: empresa.nome!,       // Acessa o nome da empresa fornecida como parâmetro
            email: empresa.email!      // Acessa o email da empresa fornecida como parâmetro
        }
    }

    protected async FazerLogin(email: string, senha: string): Promise<EmpresaResponsetDTO> {
        // Busca a empresa pelo email fornecido
        let empresa = await this.model.findOne({ where: { email } }); 
        
        // Verifica se a empresa foi encontrada
        if (!empresa) {
            throw new Error("Email não existe."); // Lança um erro se o email não for encontrado
        }
        
        // Verifica se a senha está correta em relação à empresa encontrada
        if (empresa.senha !== senha) {
            throw new Error("Senha incorreta."); // Lança um erro se a senha estiver incorreta
        }
        
        // Retorna a empresa se o login for bem-sucedido, convertendo-a para o formato DTO
        return this.getEmpresasDto(empresa);
    }
}

export default MetodosTratamentoAuxiliares;