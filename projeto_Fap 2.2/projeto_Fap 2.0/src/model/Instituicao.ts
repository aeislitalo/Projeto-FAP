class Instituicao {
    nome: string;
    cnpj: string;
    pais: string;
    estado: string;
    cidade: string;
    endereco: string;
    email: string;
    senha: string;
    contato: string;
    cep: string;

    constructor(nome: string, cnpj: string, pais: string, estado: string, cidade: string, endereco: string, email: string, senha: string, 
        contato: string,cep: string) {
        this.nome = nome;
        this.cnpj = cnpj;
        this.pais = pais;
        this.estado = estado;
        this.cidade = cidade;
        this.endereco = endereco;
        this.contato = contato;
        this.email = email;
        this.senha = senha;
        this.cep = cep;
    }

    verProjetosAceitos(): void {}

    verNovosProjetos(): void {}
}
