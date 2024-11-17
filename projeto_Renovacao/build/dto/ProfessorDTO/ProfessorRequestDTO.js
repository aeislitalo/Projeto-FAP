"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Classe ProfessorRequestDTO representa o objeto de transferência de dados para requisições relacionadas a professores
class ProfessorRequestDTO {
    nome; // Nome do professor
    cpf; // CPF do professor
    email; // Email do professor
    senha; // Senha do professor
    contato; // Contato do professor
    cursoId; // ID do curso associado ao professor
    instituicaoId; // ID da instituição associada ao professor
    // Construtor para inicializar os atributos
    constructor(nome, cpf, email, senha, contato, cursoId, instituicaoId) {
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;
        this.contato = contato;
        this.cursoId = cursoId;
        this.instituicaoId = instituicaoId;
    }
    // Métodos getters para acessar os atributos
    getNome() {
        return this.nome;
    }
    getCpf() {
        return this.cpf;
    }
    getEmail() {
        return this.email;
    }
    getSenha() {
        return this.senha;
    }
    getContato() {
        return this.contato;
    }
    getCursoId() {
        return this.cursoId;
    }
    getInstituicaoId() {
        return this.instituicaoId;
    }
}
// Exporta a classe ProfessorRequestDTO para ser utilizada em outras partes do aplicativo
exports.default = ProfessorRequestDTO;
//# sourceMappingURL=ProfessorRequestDTO.js.map