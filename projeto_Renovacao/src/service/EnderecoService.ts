// Importa a classe GetData para realizar requisições HTTP
import GetData from '../utils/GetData'; 
// Importa a interface Endereco para tipar o objeto de endereço
import Endereco from '../interface/IEndereco'; 

// Classe EnderecoService para gerenciar operações relacionadas a endereços
class EnderecoService {
    private getData: GetData; // Declaração da variável getData do tipo GetData

    // Construtor da classe, inicializa a instância de GetData com a URL base
    constructor() {
        this.getData = new GetData("https://cep.awesomeapi.com.br/json/");
    }

    // Método assíncrono para buscar um endereço com base no CEP fornecido
    async buscarEnderecoPeloCep(cep: string): Promise<Endereco | null> {
        try {
            // Envia uma requisição GET para buscar o endereço e retorna o resultado
            let endereco = await this.getData.sendRequest<Endereco>(cep, "GET", null);
            return endereco; // Retorna o endereço encontrado
        } catch (error) {
            // Em caso de erro, retorna null
            return null;
        }
    }
}

// Exporta a classe EnderecoService para ser utilizada em outras partes do aplicativo
export default EnderecoService;
