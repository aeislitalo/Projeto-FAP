import Validacao from "validator"; // Importa a biblioteca de validação
import Empresa from "../database/models/Empresa"; // Importa o modelo Empresa
import Demanda from "../database/models/Demanda"; // Importa o modelo Demanda
import { ModelStatic } from "sequelize"; // Importa ModelStatic do Sequelize
import EmpresaInstituicaoRequestDTO from "../dto/EmpresaDTO/EmpresaInstituicaoRequestDTO"; // Importa o DTO de requisição para Empresa
import EmpresaResponsetDTO from "../dto/EmpresaDTO/IEmpresaResponseDTO "; // Importa o DTO de resposta para Empresa
import EmpresaDemandaResponsetDTO from "../dto/EmpresaDTO/IEmpresaDemandaResponseDTO"; // Importa o DTO de resposta para Empresa
import InstituicaoResponsetDTO from "../dto/InstituicaoDTO/I_InstituicaoResponseDTO "; // Importa o DTO de resposta para Instituicao
import CursoResponseDTO from "../dto/CursoDTO/ICursoResponseDTO"; // Importa o DTO de resposta para Empresa
import CursoRequestDTO from "../dto/CursoDTO/CursoRequestDTO"; // Importa o DTO de resposta para Empresa
import Instituicao from "../database/models/Instituicao"; // Importa o modelo Instituicao
import EnderecoService from "./EnderecoService";
import Curso from "../database/models/Curso"; // Importa o modelo Empresa
import IDemandaResponseDTO from "../dto/EmpresaDTO/IDemandaResponseDTO";

// Classe abstrata que contém métodos auxiliares para o tratamento de dados relacionados a empresas e instituições
abstract class MetodosTratamentoAuxiliares {
    protected model: ModelStatic<Empresa> = Empresa;
    protected modelDemanda: ModelStatic<Demanda> = Demanda;
    protected modelInstituicao: ModelStatic<Instituicao> = Instituicao;
    protected enderecoService = new EnderecoService(); // Ajustei a instância para o padrão PascalCase
    protected modelCurso: ModelStatic<Curso> = Curso;

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

    protected async tratarEndereco(ReqBody: any, cep: string): Promise<EmpresaInstituicaoRequestDTO> {
        let endereco;
        if (cep?.trim()) {
            endereco = await this.enderecoService.buscarEnderecoPeloCep(cep);

            if (endereco) { // Verifica se o endereço não é null ou undefined
                return this.criarObjetoEmpresaInstituicaoDTO(ReqBody, endereco);
            }
        }
        throw new Error("Endereço não encontrado");
    }

    // Método para criar um objeto DTO a partir dos dados recebidos
    protected criarObjetoEmpresaInstituicaoDTO(reqBody: any, endereco: any): EmpresaInstituicaoRequestDTO {
        return new EmpresaInstituicaoRequestDTO(
            reqBody.nome,      // Nome da empresa
            reqBody.cnpj,      // CNPJ da empresa
            reqBody.pais,      // País da empresa
            endereco.state,    // Estado da empresa
            endereco.city,     // Cidade da empresa
            endereco.district, // Bairro da empresa
            endereco.address,  // Rua da empresa
            reqBody.numero,    // Número do endereço da empresa
            endereco.cep,      // CEP da empresa
            reqBody.email,     // Email da empresa
            reqBody.senha,     // Senha da empresa
            reqBody.contato    // Contato da empresa
        );
    }

    // Método auxiliar para formatar os dados da empresa para retorno ao cliente
    protected getEmpresasDto(empresa: Empresa): EmpresaResponsetDTO {
        // Cria e retorna um objeto que representa a resposta da empresa com os campos id, nome e email
        return {
            id: empresa.id,       // Acessa o ID da empresa fornecida como parâmetro
            nome: empresa.nome,   // Acessa o nome da empresa fornecida como parâmetro
            email: empresa.email   // Acessa o email da empresa fornecida como parâmetro
        };
    }

    // Método auxiliar para formatar os dados da empresa e suas demandas para retorno ao cliente
    protected getEmpresasDemandaDto(empresa: Empresa): EmpresaDemandaResponsetDTO {
        // Cria e retorna um objeto que representa a resposta da empresa com os campos id, nome, email e demandas
        return {
            id: empresa.id,       // Acessa o ID da empresa fornecida como parâmetro
            nome: empresa.nome,   // Acessa o nome da empresa fornecida como parâmetro
            email: empresa.email, // Acessa o email da empresa fornecida como parâmetro
            demandas: empresa.demandas ? empresa.demandas.map(demanda => this.getDemandaDTO(demanda)) : [] // Chama a função diretamente para mapear as demandas
        };
    }

    // Método auxiliar para formatar os dados da instituição para retorno ao cliente
    protected getInstituicoesDto(empresa: Instituicao): InstituicaoResponsetDTO {
        // Cria e retorna um objeto que representa a resposta da instituição com os campos id, nome e email
        return {
            id: empresa.id,       // Acessa o ID da instituição fornecida como parâmetro
            nome: empresa.nome,   // Acessa o nome da instituição fornecida como parâmetro
            email: empresa.email  // Acessa o email da instituição fornecida como parâmetro
        };
    }

    // Método auxiliar para formatar os dados de uma demanda para retorno ao cliente
    protected getDemandaDTO(demanda: Demanda): IDemandaResponseDTO {
        // Cria e retorna um objeto que representa a resposta da demanda com os campos id, titulo, descricao, dataEnvio e dataFinal
        return {
            id: demanda.id,        // Acessa o ID da demanda fornecida como parâmetro
            titulo: demanda.titulo, // Acessa o título da demanda fornecida como parâmetro
            descricao: demanda.descricao, // Acessa a descrição da demanda fornecida como parâmetro
            dataEnvio: demanda.dataEnvio, // Acessa a data de envio da demanda fornecida como parâmetro
            dataFinal: demanda.dataFinal // Acessa a data final da demanda fornecida como parâmetro
        };
    }

    // Método para preencher os dados antes de salvar no banco de dados
    protected preencherDados(Dados: EmpresaInstituicaoRequestDTO) {
        return {
            nome: Dados.getNome(),         // Recebe o nome da empresa
            cnpj: Dados.getCnpj(),         // Recebe o CNPJ da empresa
            pais: Dados.getPais(),         // Recebe o país da empresa
            estado: Dados.getEstado(),     // Recebe o estado da empresa
            cidade: Dados.getCidade(),     // Recebe a cidade da empresa
            bairro: Dados.getBairro(),     // Recebe o bairro da empresa
            rua: Dados.getRua(),           // Recebe a rua da empresa
            numero: Dados.getNumero(),     // Recebe o número da empresa
            cep: Dados.getCep(),           // Recebe o CEP da empresa
            email: Dados.getEmail(),       // Recebe o email da empresa
            senha: Dados.getSenha(),       // Recebe a senha da empresa
            contato: Dados.getContato()    // Recebe o contato da empresa
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
    protected async fazerLoginInstituicao(email: string, senha: string): Promise<InstituicaoResponsetDTO> {
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
        return this.getInstituicoesDto(instituicao);
    }

   // Método para criar um objeto CursoRequestDTO a partir do ID da instituição e do nome do curso.
protected criarObjetoCurso(idInstituicao: number, nomeCurso: string): CursoRequestDTO {
    return new CursoRequestDTO(nomeCurso, idInstituicao);
}

// Método para converter um objeto Curso em um objeto CursoResponseDTO.
protected cursoDTO(curso: Curso): CursoResponseDTO {
    return {
        id: curso.id,           // Acessa o ID do curso fornecida como parâmetro
        nome: curso.nome,       // Acessa o nome do curso fornecida como parâmetro
    };
}

// Método para preencher um objeto com os dados do CursoRequestDTO, retornando um objeto com nome e ID da instituição.
protected preencherCurso(curso: CursoRequestDTO) {
    return {
        nome: curso.getNome(),               // Obtém o nome do curso
        instituicaoId: curso.getInstituicaoId() // Obtém o ID da instituição associada
    };
}

// Método assíncrono para encontrar um curso pelo ID da instituição.
// Lança um erro se o curso não for encontrado.
protected async acharCursoPorId(idInstituicao: number) {
    let curso = await this.modelCurso.findByPk(idInstituicao); // Busca o curso no banco de dados pelo ID
    if (!curso) throw new Error('Curso não encontrado'); // Lança um erro se o curso não for encontrado
    return curso; // Retorna o curso encontrado
}
}

export default MetodosTratamentoAuxiliares; // Exporta a classe MetodosTratamentoAuxiliares para uso em outras partes da aplicação
