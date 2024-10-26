// Importa a biblioteca axios e os tipos AxiosRequestConfig e Method para fazer requisições HTTP
import axios, { AxiosRequestConfig, Method } from 'axios';

// Classe GetData para gerenciar requisições HTTP
class GetData {
    private readonly baseUrl: string; // Declaração da variável baseUrl como string imutável

    // Construtor da classe, inicializa a baseUrl com o valor fornecido
    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    // Método assíncrono para enviar uma requisição HTTP
    async sendRequest<T>(cep: string, method: Method, requestBody: any): Promise<T> {
        // Configuração da requisição, incluindo URL, método e corpo da requisição
        let config: AxiosRequestConfig = {
            url: `${this.baseUrl}${cep}`, // Monta a URL final concatenando a baseUrl e o CEP
            method, // Método da requisição (GET, POST, etc.)
            data: requestBody, // Corpo da requisição, se houver
        };

        try {
            // Envia a requisição e aguarda a resposta
            let response = await axios.request<T>(config);
            return response.data; // Retorna os dados da resposta
        } catch (error) {
            throw error; // Re-lança o erro para ser tratado pelo chamador
        }
    }
}

// Exporta a classe GetData para ser utilizada em outras partes do aplicativo
export default GetData;
