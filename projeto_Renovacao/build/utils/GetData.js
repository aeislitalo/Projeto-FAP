"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importa a biblioteca axios e os tipos AxiosRequestConfig e Method para fazer requisições HTTP
const axios_1 = __importDefault(require("axios"));
// Classe GetData para gerenciar requisições HTTP
class GetData {
    baseUrl; // Declaração da variável baseUrl como string imutável
    // Construtor da classe, inicializa a baseUrl com o valor fornecido
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }
    // Método assíncrono para enviar uma requisição HTTP
    async sendRequest(cep, method, requestBody) {
        // Configuração da requisição, incluindo URL, método e corpo da requisição
        let config = {
            url: `${this.baseUrl}${cep}`, // Monta a URL final concatenando a baseUrl e o CEP
            method, // Método da requisição (GET, POST, etc.)
            data: requestBody, // Corpo da requisição, se houver
        };
        try {
            // Envia a requisição e aguarda a resposta
            let response = await axios_1.default.request(config);
            return response.data; // Retorna os dados da resposta
        }
        catch (error) {
            throw error; // Re-lança o erro para ser tratado pelo chamador
        }
    }
}
// Exporta a classe GetData para ser utilizada em outras partes do aplicativo
exports.default = GetData;
//# sourceMappingURL=GetData.js.map