import Validacao from "validator"; // Importa a biblioteca de validação
import Empresa from "../database/models/Empresa"; // Importa o modelo Empresa
import Demanda from "../database/models/Demanda"; // Importa o modelo Demanda
import { ModelStatic } from "sequelize"; // Importa ModelStatic do Sequelize
import EmpresaRequestDTO from "../dto/EmpresaInstituicaoRequestDTO"; // Importa o DTO de requisição para Empresa
import EmpresaResponsetDTO from "../dto/EmpresaResponseDTO"; // Importa o DTO de resposta para Empresa
import Instituicao from "../database/models/Instituicao"; // Importa o modelo Instituicao

// Classe abstrata que contém métodos auxiliares para o tratamento de dados relacionados a empresas e instituições
abstract class MetodosTratamentoAuxiliares {
    // Define modelos estáticos para as classes Empresa, Demanda e Instituicao
    protected model: ModelStatic<Empresa> = Empresa;
    protected modelDemanda: ModelStatic<Demanda> = Demanda;
    protected modelInstituicao: ModelStatic<Instituicao> = Instituicao;

    

    // Método para encontrar uma Empresa pelo ID
    protected async acharEmpresaPorId(idEmpresa: number): Promise<Empresa> {
        let empresa = await this.model.findByPk(idEmpresa); // Busca a empresa pelo ID
        if (!empresa) throw new Error('Empresa não encontrada'); // Lança erro se não encontrar
        return empresa; // Retorna a empresa encontrada
    }

    // Método para encontrar uma Instituição pelo ID
    protected async acharInstituicaoPorId(idInstituicao: number): Promise<Empresa> {
        let instituicao = await this.modelInstituicao.findByPk(idInstituicao); // Busca a instituição pelo ID
        if (!instituicao) throw new Error('Instituição não encontrada'); // Lança erro se não encontrar
        return instituicao; // Retorna a instituição encontrada
    }

    // Método para encontrar uma Demanda pelo ID
    protected async acharDemandaPorId(idDemanda: number): Promise<Demanda> {
        let demanda = await this.modelDemanda.findByPk(idDemanda); // Busca a demanda pelo ID
        if (!demanda) throw new Error('Demanda não encontrada'); // Lança erro se não encontrar
        return demanda; // Retorna a demanda encontrada
    }

    // Método para tratar o email, validando seu formato
    protected tratarEmail(email: string): void {
        // Verifica se o email está inválido
        if (!Validacao.isEmail(email)) {
            throw new Error('Email Invalido!!!'); // Lança erro se o email for inválido
        }
    }

    // Método para tratar a senha, verificando suas condições
    protected tratarSenha(senha: string) {
        // Expressão regular que verifica se a senha contém pelo menos uma letra e um número
        const expressaoRegularSenha = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]*$/;

        // Se a senha não for válida, lança uma exceção
        if (!senha || !expressaoRegularSenha.test(senha)) {
            throw new Error('A senha deve conter pelo menos uma letra e um número.'); // Lança erro se a senha não for válida
        }
    }

    // Método para criar um objeto DTO a partir dos dados recebidos
    protected criarObjetoEmpresaInstituicaoDTO(reqBody: any): EmpresaRequestDTO {
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

    // Método auxiliar para formatar os dados da empresa para retorno ao cliente
    protected getEmpresasDto(empresa: Empresa): EmpresaResponsetDTO {
        // Cria e retorna um objeto que representa a resposta da empresa com os campos id, nome e email
        return {
            id: empresa.id!,           // Acessa o ID da empresa fornecida como parâmetro
            nome: empresa.nome!,       // Acessa o nome da empresa fornecida como parâmetro
            email: empresa.email!      // Acessa o email da empresa fornecida como parâmetro
        };
    }

    // Método para preencher os dados antes de salvar no banco de dados
    protected preencherDados(Dados: any) {
        return {
            nome: Dados.getNome(), // Recebe o nome da empresa
            cnpj: Dados.getCnpj(), // Recebe o CNPJ da empresa
            pais: Dados.getPais(), // Recebe o país da empresa
            estado: Dados.getEstado(), // Recebe o estado da empresa
            cidade: Dados.getCidade(), // Recebe a cidade da empresa
            bairro: Dados.getBairro(), // Recebe o bairro da empresa
            rua: Dados.getRua(), // Recebe a rua da empresa
            numero: Dados.getNumero(), // Recebe o número da empresa
            cep: Dados.getCep(), // Recebe o CEP da empresa
            email: Dados.getEmail(), // Recebe o email da empresa
            senha: Dados.getSenha(), // Recebe a senha da empresa
            contato: Dados.getContato(), // Recebe o contato da empresa
        };
    }

    // Método para realizar login da empresa
    protected async fazerLoginEmpresa(email: string, senha: string): Promise<EmpresaResponsetDTO> {
        // Busca a empresa pelo email fornecido
        let empresa = await this.model.findOne({ where: { email } });
        
        // Verifica se a empresa foi encontrada
        if (!empresa) {
            throw new Error("Email não existe"); // Lança um erro se o email não for encontrado
        }
        
        // Verifica se a senha está correta em relação à empresa encontrada
        if (empresa.senha !== senha) {
            throw new Error("Senha incorreta"); // Lança um erro se a senha estiver incorreta
        }
        
        // Retorna a empresa se o login for bem-sucedido, convertendo-a para o formato DTO
        return this.getEmpresasDto(empresa);
    }

    // Método para realizar login da instituição
    protected async fazerLoginInstituicao(email: string, senha: string): Promise<EmpresaResponsetDTO> {
        // Busca a instituição pelo email fornecido
        let instituicao = await this.modelInstituicao.findOne({ where: { email } });
        
        // Verifica se a instituição foi encontrada
        if (!instituicao) {
            throw new Error("Email não existe"); // Lança um erro se o email não for encontrado
        }
        
        // Verifica se a senha está correta em relação à instituição encontrada
        if (instituicao.senha !== senha) {
            throw new Error("Senha incorreta"); // Lança um erro se a senha estiver incorreta
        }
        
        // Retorna a instituição se o login for bem-sucedido, convertendo-a para o formato DTO
        return this.getEmpresasDto(instituicao);
    }
}

export default MetodosTratamentoAuxiliares; // Exporta a classe MetodosTratamentoAuxiliares para uso em outras partes da aplicação
