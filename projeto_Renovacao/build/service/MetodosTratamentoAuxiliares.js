"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importa a biblioteca de validação
const validator_1 = __importDefault(require("validator"));
// Importa os modelos da base de dados
const Empresa_1 = __importDefault(require("../database/models/Empresa"));
const Demanda_1 = __importDefault(require("../database/models/Demanda"));
const Instituicao_1 = __importDefault(require("../database/models/Instituicao"));
const Curso_1 = __importDefault(require("../database/models/Curso"));
const Professor_1 = __importDefault(require("../database/models/Professor"));
const DemandaPega_1 = __importDefault(require("../database/models/DemandaPega"));
// Importa DTOs
const EmpresaInstituicaoRequestDTO_1 = __importDefault(require("../dto/EmpresaDTO/EmpresaInstituicaoRequestDTO"));
const CursoRequestDTO_1 = __importDefault(require("../dto/CursoDTO/CursoRequestDTO"));
const ProfessorRequestDTO_1 = __importDefault(require("../dto/ProfessorDTO/ProfessorRequestDTO"));
const DemandaPegaRequestDTO_1 = __importDefault(require("../dto/DemandaPegaDTO/DemandaPegaRequestDTO"));
// Importa o serviço de Endereço
const EnderecoService_1 = __importDefault(require("./EnderecoService"));
// Classe abstrata que contém métodos auxiliares para o tratamento de dados relacionados a empresas e instituições
class MetodosTratamentoAuxiliares {
    // Declaração de modelos estáticos para interagir com as entidades do banco de dados
    model = Empresa_1.default; // Modelo para Empresas
    modelDemanda = Demanda_1.default; // Modelo para Demandas
    modelInstituicao = Instituicao_1.default; // Modelo para Instituições
    enderecoService = new EnderecoService_1.default(); // Serviço de Endereço
    modelCurso = Curso_1.default; // Modelo para Cursos
    modelProfessor = Professor_1.default; // Modelo para Professores
    modelDemandaPega = DemandaPega_1.default; // Modelo para Demandas Pegas
    // Método para encontrar uma Empresa pelo ID
    async acharEmpresaPorId(idEmpresa) {
        const empresa = await this.model.findByPk(idEmpresa); // Busca a empresa pelo ID
        if (!empresa)
            throw new Error('Empresa não encontrada'); // Lança erro se não encontrar
        return empresa; // Retorna a empresa encontrada
    }
    // Método para encontrar uma Instituição pelo ID
    async acharInstituicaoPorId(idInstituicao) {
        const instituicao = await this.modelInstituicao.findByPk(idInstituicao); // Busca a instituição pelo ID
        if (!instituicao)
            throw new Error('Instituição não encontrada'); // Lança erro se não encontrar
        return instituicao; // Retorna a instituição encontrada
    }
    // Método para encontrar uma Demanda pelo ID
    async acharDemandaPorId(idDemanda) {
        const demanda = await this.modelDemanda.findByPk(idDemanda); // Busca a demanda pelo ID
        if (!demanda)
            throw new Error('Demanda não encontrada'); // Lança erro se não encontrar
        return demanda; // Retorna a demanda encontrada
    }
    // Método assíncrono para encontrar um curso pelo ID da instituição
    async acharCursoPorId(idCurso) {
        const curso = await this.modelCurso.findByPk(idCurso); // Busca o curso no banco de dados pelo ID
        if (!curso)
            throw new Error('Curso não encontrado'); // Lança um erro se o curso não for encontrado
        return curso; // Retorna o curso encontrado
    }
    // Método para encontrar um Professor pelo ID
    async acharProfessorPorId(idProfessor) {
        const professor = await this.modelProfessor.findByPk(idProfessor); // Busca o professor pelo ID
        if (!professor)
            throw new Error('Professor(a) não encontrado'); // Lança erro se não encontrar
        return professor; // Retorna o professor encontrado
    }
    // Método para encontrar uma Demanda Pega pelo ID
    async acharDemandaPegaPorId(idDemandaPega) {
        let demandaPega = await this.modelDemandaPega.findByPk(idDemandaPega); // Busca a demanda pega pelo ID
        if (!demandaPega)
            throw new Error("Demanda não encontrada!!!"); // Lança erro se não encontrar
        return demandaPega; // Retorna a demanda pega encontrada
    }
    // Método para tratar o email, validando seu formato
    tratarEmail(email) {
        if (!validator_1.default.isEmail(email)) {
            throw new Error('Email Inválido!!!'); // Lança erro se o email for inválido
        }
    }
    // Método para tratar a senha, verificando suas condições
    tratarSenha(senha) {
        const expressaoRegularSenha = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]*$/; // Expressão regular para validação da senha
        if (!senha || !expressaoRegularSenha.test(senha)) {
            throw new Error('A senha deve conter pelo menos uma letra e um número.'); // Lança erro se a senha não for válida
        }
    }
    // Método assíncrono para tratar o endereço baseado no CEP
    async tratarEndereco(reqBody, cep) {
        if (cep?.trim()) {
            const endereco = await this.enderecoService.buscarEnderecoPeloCep(cep); // Busca o endereço pelo CEP
            if (endereco) {
                return this.criarObjetoEmpresaInstituicaoDTO(reqBody, endereco); // Cria e retorna o objeto DTO
            }
        }
        throw new Error("Endereço não encontrado"); // Lança erro se o endereço não for encontrado
    }
    // Método para criar um objeto DTO a partir dos dados recebidos
    criarObjetoEmpresaInstituicaoDTO(reqBody, endereco) {
        return new EmpresaInstituicaoRequestDTO_1.default(reqBody.nome, reqBody.cnpj, reqBody.pais, endereco.state, endereco.city, endereco.district, endereco.address, reqBody.numero, endereco.cep, reqBody.email, reqBody.senha, reqBody.contato);
    }
    // Método para criar um objeto ProfessorRequestDTO a partir dos dados recebidos
    criarObjetoProfessorDTO(reqBody, idCurso, idInstituicao) {
        return new ProfessorRequestDTO_1.default(reqBody.nome, reqBody.cpf, reqBody.email, reqBody.senha, reqBody.contato, idCurso, idInstituicao);
    }
    // Método para criar um objeto DemandaPegaRequestDTO a partir dos dados recebidos
    async criarObjetoDemandaPegaDTO(idDemanda, idProfessor, reqBody) {
        // Certifique-se de que está retornando as datas corretamente
        let demandaDb = await this.acharDemandaPorId(idDemanda);
        if (demandaDb.dataLimiteParaFicarDisponivel <= new Date()) {
            throw new Error("Demanda Expirada!!!");
        }
        else {
            return new DemandaPegaRequestDTO_1.default(reqBody.descricao, "Pega", // Status fixo para a demanda
            new Date(), // dataDemandaPega
            new Date(), // dataUltimaAtualizacao
            idDemanda, idProfessor, await this.CalcularDataPrazo(demandaDb.prazo) // Obtém a data do prazo da demanda correspondente
            );
        }
    }
    async CalcularDataPrazo(prazo) {
        return new Date(new Date().getTime() + prazo * 86400000);
    }
    // Método para preencher os dados do Professor antes de salvar no banco de dados
    preencherDadosProfessor(dadosProfessor) {
        return {
            nome: dadosProfessor.getNome(),
            cpf: dadosProfessor.getCpf(),
            cursoId: dadosProfessor.getCursoId(),
            instituicaoId: dadosProfessor.getInstituicaoId(),
            email: dadosProfessor.getEmail(),
            senha: dadosProfessor.getSenha(),
            contato: dadosProfessor.getContato()
        };
    }
    // Método para preencher os dados antes de salvar no banco de dados
    preencherDados(dados) {
        return {
            nome: dados.getNome(),
            cnpj: dados.getCnpj(),
            pais: dados.getPais(),
            estado: dados.getEstado(),
            cidade: dados.getCidade(),
            bairro: dados.getBairro(),
            rua: dados.getRua(),
            numero: dados.getNumero(),
            cep: dados.getCep(),
            email: dados.getEmail(),
            senha: dados.getSenha(),
            contato: dados.getContato()
        };
    }
    // Método para preencher os dados da Demanda Pega antes de salvar no banco de dados
    preencherDemandaPega(demandaPegaDTO) {
        return {
            descricao: demandaPegaDTO.getDescricao(),
            status: demandaPegaDTO.getStatus(),
            dataDemandaPega: demandaPegaDTO.getDataDemandaPega(),
            dataUltimaAtualizacao: demandaPegaDTO.getDataUltimaAtualizacao(),
            dataPrazo: demandaPegaDTO.getDataPrazo(),
            demandaId: demandaPegaDTO.getDemandaId(),
            professorId: demandaPegaDTO.getProfessorId()
        };
    }
    // Método para realizar login da empresa
    async fazerLoginEmpresa(email, senha) {
        const empresa = await this.model.findOne({ where: { email } }); // Busca a empresa pelo email
        if (!empresa) {
            throw new Error("Email não existe"); // Lança um erro se o email não for encontrado
        }
        if (empresa.senha !== senha) {
            throw new Error("Senha incorreta"); // Lança um erro se a senha estiver incorreta
        }
        return empresa; // Retorna a empresa se o login for bem-sucedido
    }
    // Método para realizar login da instituição
    async fazerLoginInstituicao(email, senha) {
        const instituicao = await this.modelInstituicao.findOne({ where: { email } }); // Busca a instituição pelo email
        if (!instituicao) {
            throw new Error("Email não existe"); // Lança um erro se o email não for encontrado
        }
        if (instituicao.senha !== senha) {
            throw new Error("Senha incorreta"); // Lança um erro se a senha estiver incorreta
        }
        return instituicao; // Retorna a instituição se o login for bem-sucedido
    }
    // Método para criar um objeto CursoRequestDTO a partir do ID da instituição e do nome do curso
    criarObjetoCurso(idInstituicao, nomeCurso) {
        return new CursoRequestDTO_1.default(nomeCurso, idInstituicao);
    }
    // Método para converter um objeto Curso em um objeto CursoResponseDTO
    cursoDTO(curso) {
        return {
            id: curso.id, // Acessa o ID do curso
            nome: curso.nome // Acessa o nome do curso
        };
    }
    // Método para preencher um objeto com os dados do CursoRequestDTO
    preencherCurso(curso) {
        return {
            nome: curso.getNome(), // Obtém o nome do curso
            instituicaoId: curso.getInstituicaoId() // Obtém o ID da instituição associada
        };
    }
}
// Exporta a classe para uso em outras partes da aplicação
exports.default = MetodosTratamentoAuxiliares;
//# sourceMappingURL=MetodosTratamentoAuxiliares.js.map