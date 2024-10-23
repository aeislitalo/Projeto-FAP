 class EmpresaInstituicaoRequestDTO{
    private nome: string;
    private cnpj: string; 
    private pais: string; 
    private estado: string; 
    private cidade: string; 
    private bairro: string; 
    private rua: string; 
    private numero: string;
    private cep: string; 
    private email: string; 
    private senha: string; 
    private contato: string; 

  
    constructor(nome:string, cnpj:string, pais:string, estado:string, cidade:string, bairro:string, rua:string, numero:string,cep:string, email:string, senha:string, contato:string){
        this.nome = nome;
        this.cnpj = cnpj;
        this.pais = pais;
        this.estado = estado;
        this.cidade = cidade;
        this.bairro = bairro;
        this.rua = rua;
        this.numero = numero;
        this.cep = cep;
        this.email = email;
        this.senha = senha;
        this.contato = contato;
    };

    public getNome(): string {
        return this.nome;
    }

    public getCnpj(): string {
        return this.cnpj;
    }

    public getPais(): string {
        return this.pais;
    }

    public getEstado(): string {
        return this.estado;
    }

    public getCidade(): string {
        return this.cidade;
    }

    public getBairro(): string {
        return this.bairro;
    }

    public getRua(): string {
        return this.rua;
    }
    public getNumero(): string {
        return this.numero;
    }

    public getCep(): string {
        return this.cep;
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

   

}

export default EmpresaInstituicaoRequestDTO;