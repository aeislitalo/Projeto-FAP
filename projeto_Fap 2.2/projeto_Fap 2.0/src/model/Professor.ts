class Professor {
    nome: string;
    cpf: string;
    email: string;
    senha: string;
    contato: string;
    instituicao: string;
    curso: string;

    constructor(nome: string, cpf: string, email: string, senha: string, contato: string, instituicao: string, curso: string) {
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;
        this.contato = contato;
        this.instituicao = instituicao;
        this.curso = curso;
    }

    vizualizarMeusProjeto(): void {}

    atualizarStatusMeuProjeto(): void {}

    escolherNovosProjeto(): void {}
}
