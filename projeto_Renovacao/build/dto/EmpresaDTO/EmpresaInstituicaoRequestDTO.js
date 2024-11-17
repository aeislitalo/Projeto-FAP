"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EmpresaInstituicaoRequestDTO {
    nome; // Nome da empresa ou instituição
    cnpj; // CNPJ da empresa
    pais; // País onde a empresa está localizada
    estado; // Estado onde a empresa está localizada
    cidade; // Cidade onde a empresa está localizada
    bairro; // Bairro onde a empresa está localizada
    rua; // Rua onde a empresa está localizada
    numero; // Número do endereço
    cep; // CEP do endereço
    email; // E-mail da empresa
    senha; // Senha para acesso
    contato; // Informações de contato da empresa
    // Construtor da classe que inicializa os atributos
    constructor(nome, cnpj, pais, estado, cidade, bairro, rua, numero, cep, email, senha, contato) {
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
    }
    ;
    // Método para obter o nome
    getNome() {
        return this.nome; // Retorna o nome
    }
    // Método para obter o CNPJ
    getCnpj() {
        return this.cnpj; // Retorna o CNPJ
    }
    // Método para obter o país
    getPais() {
        return this.pais; // Retorna o país
    }
    // Método para obter o estado
    getEstado() {
        return this.estado; // Retorna o estado
    }
    // Método para obter a cidade
    getCidade() {
        return this.cidade; // Retorna a cidade
    }
    // Método para obter o bairro
    getBairro() {
        return this.bairro; // Retorna o bairro
    }
    // Método para obter a rua
    getRua() {
        return this.rua; // Retorna a rua
    }
    // Método para obter o número
    getNumero() {
        return this.numero; // Retorna o número
    }
    // Método para obter o CEP
    getCep() {
        return this.cep; // Retorna o CEP
    }
    // Método para obter o e-mail
    getEmail() {
        return this.email; // Retorna o e-mail
    }
    // Método para obter a senha
    getSenha() {
        return this.senha; // Retorna a senha
    }
    // Método para obter as informações de contato
    getContato() {
        return this.contato; // Retorna as informações de contato
    }
}
exports.default = EmpresaInstituicaoRequestDTO; // Exporta a classe
//# sourceMappingURL=EmpresaInstituicaoRequestDTO.js.map