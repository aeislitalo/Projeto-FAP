"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Instituicao {
    nome;
    cnpj;
    pais;
    estado;
    cidade;
    endereco;
    email;
    senha;
    contato;
    cep;
    constructor(nome, cnpj, pais, estado, cidade, endereco, email, senha, contato, cep) {
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
    verProjetosAceitos() { }
    verNovosProjetos() { }
}
