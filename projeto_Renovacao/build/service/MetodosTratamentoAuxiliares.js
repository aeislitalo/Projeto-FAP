"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator")); // Importa a biblioteca de validação
const Empresa_1 = __importDefault(require("../database/models/Empresa")); // Importa o modelo Empresa
const Demanda_1 = __importDefault(require("../database/models/Demanda")); // Importa o modelo Demanda
const EmpresaInstituicaoRequestDTO_1 = __importDefault(require("../dto/EmpresaInstituicaoRequestDTO")); // Importa o DTO de requisição para Empresa
const Instituicao_1 = __importDefault(require("../database/models/Instituicao")); // Importa o modelo Instituicao
const EnderecoService_1 = __importDefault(require("./EnderecoService"));
// Classe abstrata que contém métodos auxiliares para o tratamento de dados relacionados a empresas e instituições
class MetodosTratamentoAuxiliares {
    // Define modelos estáticos para as classes Empresa, Demanda e Instituicao
    model = Empresa_1.default;
    modelDemanda = Demanda_1.default;
    modelInstituicao = Instituicao_1.default;
    enderecoService = new EnderecoService_1.default();
    // Método para encontrar uma Empresa pelo ID
    async acharEmpresaPorId(idEmpresa) {
        let empresa = await this.model.findByPk(idEmpresa); // Busca a empresa pelo ID
        if (!empresa)
            throw new Error('Empresa não encontrada'); // Lança erro se não encontrar
        return empresa; // Retorna a empresa encontrada
    }
    // Método para encontrar uma Instituição pelo ID
    async acharInstituicaoPorId(idInstituicao) {
        let instituicao = await this.modelInstituicao.findByPk(idInstituicao); // Busca a instituição pelo ID
        if (!instituicao)
            throw new Error('Instituição não encontrada'); // Lança erro se não encontrar
        return instituicao; // Retorna a instituição encontrada
    }
    // Método para encontrar uma Demanda pelo ID
    async acharDemandaPorId(idDemanda) {
        let demanda = await this.modelDemanda.findByPk(idDemanda); // Busca a demanda pelo ID
        if (!demanda)
            throw new Error('Demanda não encontrada'); // Lança erro se não encontrar
        return demanda; // Retorna a demanda encontrada
    }
    // Método para tratar o email, validando seu formato
    tratarEmail(email) {
        // Verifica se o email está inválido
        if (!validator_1.default.isEmail(email)) {
            throw new Error('Email Invalido!!!'); // Lança erro se o email for inválido
        }
    }
    // Método para tratar a senha, verificando suas condições
    tratarSenha(senha) {
        // Expressão regular que verifica se a senha contém pelo menos uma letra e um número
        const expressaoRegularSenha = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]*$/;
        // Se a senha não for válida, lança uma exceção
        if (!senha || !expressaoRegularSenha.test(senha)) {
            throw new Error('A senha deve conter pelo menos uma letra e um número.'); // Lança erro se a senha não for válida
        }
    }
    tratarEndereco(ReqBody, cep) {
        let endereco;
        if (cep?.trim()) {
            endereco = this.enderecoService.buscarEnderecoPeloCep(cep.trim());
            console.log(endereco);
            if (endereco) { // Verifica se o endereço não é null ou undefined
                return this.criarObjetoEmpresaInstituicaoDTO(ReqBody, endereco);
            }
        }
        throw new Error("Endereço não encontrado");
    }
    // Método para criar um objeto DTO a partir dos dados recebidos
    criarObjetoEmpresaInstituicaoDTO(reqBody, endereco) {
        return new EmpresaInstituicaoRequestDTO_1.default(reqBody.nome, // Nome da empresa
        reqBody.cnpj, // CNPJ da empresa
        reqBody.pais, // País da empresa
        endereco.state, // Estado da empresa
        endereco.city, // Cidade da empresa
        endereco.district, // Bairro da empresa
        endereco.address, // Rua da empresa
        reqBody.numero, // Número do endereço da empresa
        endereco.cep, // CEP da empresa
        reqBody.email, // Email da empresa
        reqBody.senha, // Senha da empresa
        reqBody.contato // Contato da empresa
        );
    }
    // Método auxiliar para formatar os dados da empresa para retorno ao cliente
    getEmpresasDto(empresa) {
        // Cria e retorna um objeto que representa a resposta da empresa com os campos id, nome e email
        return {
            id: empresa.id, // Acessa o ID da empresa fornecida como parâmetro
            nome: empresa.nome, // Acessa o nome da empresa fornecida como parâmetro
            email: empresa.email // Acessa o email da empresa fornecida como parâmetro
        };
    }
    // Método para preencher os dados antes de salvar no banco de dados
    preencherDados(Dados) {
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
    async fazerLoginEmpresa(email, senha) {
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
    async fazerLoginInstituicao(email, senha) {
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
exports.default = MetodosTratamentoAuxiliares; // Exporta a classe MetodosTratamentoAuxiliares para uso em outras partes da aplicação
//# sourceMappingURL=MetodosTratamentoAuxiliares.js.map