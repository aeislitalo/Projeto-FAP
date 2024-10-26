class EmpresaInstituicaoRequestDTO {
    private nome: string; // Nome da empresa ou instituição
    private cnpj: string; // CNPJ da empresa
    private pais: string; // País onde a empresa está localizada
    private estado: string; // Estado onde a empresa está localizada
    private cidade: string; // Cidade onde a empresa está localizada
    private bairro: string; // Bairro onde a empresa está localizada
    private rua: string; // Rua onde a empresa está localizada
    private numero: string; // Número do endereço
    private cep: string; // CEP do endereço
    private email: string; // E-mail da empresa
    private senha: string; // Senha para acesso
    private contato: string; // Informações de contato da empresa

    // Construtor da classe que inicializa os atributos
    constructor(nome: string, cnpj: string, pais: string, estado: string, cidade: string, bairro: string, rua: string, numero: string, cep: string, email: string, senha: string, contato: string) {
        this.nome = nome; // Atribui o nome
        this.cnpj = cnpj; // Atribui o CNPJ
        this.pais = pais; // Atribui o país
        this.estado = estado; // Atribui o estado
        this.cidade = cidade; // Atribui a cidade
        this.bairro = bairro; // Atribui o bairro
        this.rua = rua; // Atribui a rua
        this.numero = numero; // Atribui o número
        this.cep = cep; // Atribui o CEP
        this.email = email; // Atribui o e-mail
        this.senha = senha; // Atribui a senha
        this.contato = contato; // Atribui as informações de contato
    };

    // Método para obter o nome
    public getNome(): string {
        return this.nome; // Retorna o nome
    }

    // Método para obter o CNPJ
    public getCnpj(): string {
        return this.cnpj; // Retorna o CNPJ
    }

    // Método para obter o país
    public getPais(): string {
        return this.pais; // Retorna o país
    }

    // Método para obter o estado
    public getEstado(): string {
        return this.estado; // Retorna o estado
    }

    // Método para obter a cidade
    public getCidade(): string {
        return this.cidade; // Retorna a cidade
    }

    // Método para obter o bairro
    public getBairro(): string {
        return this.bairro; // Retorna o bairro
    }

    // Método para obter a rua
    public getRua(): string {
        return this.rua; // Retorna a rua
    }

    // Método para obter o número
    public getNumero(): string {
        return this.numero; // Retorna o número
    }

    // Método para obter o CEP
    public getCep(): string {
        return this.cep; // Retorna o CEP
    }

    // Método para obter o e-mail
    public getEmail(): string {
        return this.email; // Retorna o e-mail
    }

    // Método para obter a senha
    public getSenha(): string {
        return this.senha; // Retorna a senha
    }

    // Método para obter as informações de contato
    public getContato(): string {
        return this.contato; // Retorna as informações de contato
    }
}

export default EmpresaInstituicaoRequestDTO; // Exporta a classe
