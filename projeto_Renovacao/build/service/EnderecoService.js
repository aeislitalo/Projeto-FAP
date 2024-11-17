"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importa a classe GetData para realizar requisições HTTP
const GetData_1 = __importDefault(require("../utils/GetData"));
// Classe EnderecoService para gerenciar operações relacionadas a endereços
class EnderecoService {
    getData; // Declaração da variável getData do tipo GetData
    // Construtor da classe, inicializa a instância de GetData com a URL base
    constructor() {
        this.getData = new GetData_1.default("https://cep.awesomeapi.com.br/json/");
    }
    // Método assíncrono para buscar um endereço com base no CEP fornecido
    async buscarEnderecoPeloCep(cep) {
        try {
            // Envia uma requisição GET para buscar o endereço e retorna o resultado
            let endereco = await this.getData.sendRequest(cep, "GET", null);
            return endereco; // Retorna o endereço encontrado
        }
        catch (error) {
            // Em caso de erro, retorna null
            return null;
        }
    }
}
// Exporta a classe EnderecoService para ser utilizada em outras partes do aplicativo
exports.default = EnderecoService;
//# sourceMappingURL=EnderecoService.js.map