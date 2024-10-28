// Classe ProfessorRequestDTO representa o objeto de transferência de dados para requisições relacionadas a professores
class ProfessorRequestDTO {
   
    private nome: string; // Nome do professor
    private cpf: string; // CPF do professor
    private email: string; // Email do professor
    private senha: string; // Senha do professor
    private contato: string; // Contato do professor
    private cursoId: number; // ID do curso associado ao professor
    private instituicaoId: number; // ID da instituição associada ao professor

    // Construtor para inicializar os atributos
    constructor(
        nome: string,
        cpf: string,
        email: string,
        senha: string,
        contato: string,
        cursoId: number,
        instituicaoId: number
    ) {
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;
        this.contato = contato;
        this.cursoId = cursoId;
        this.instituicaoId = instituicaoId;
    }

    // Métodos getters para acessar os atributos

    public getNome(): string {
        return this.nome;
    }

    public getCpf(): string {
        return this.cpf;
    }

    public getEmail(): string {
        return this.email;
    }

    public getSenha(): string {
        return this.senha;
    }

    public getContato(): string {
        return this.contato;
    }

    public getCursoId(): number {
        return this.cursoId;
    }

    public getInstituicaoId(): number {
        return this.instituicaoId;
    }
}

// Exporta a classe ProfessorRequestDTO para ser utilizada em outras partes do aplicativo
export default ProfessorRequestDTO;
