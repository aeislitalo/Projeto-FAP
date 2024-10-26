"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GetData_1 = __importDefault(require("../utils/GetData"));
class EnderecoService {
    getData;
    constructor() {
        this.getData = new GetData_1.default("https://cep.awesomeapi.com.br/json/");
    }
    async buscarEnderecoPeloCep(cep) {
        try {
            let endereco = await this.getData.sendRequest(cep, "GET", null);
            return endereco;
        }
        catch (error) {
            console.error("Erro ao buscar endereço:", error);
            return null;
        }
    }
}
exports.default = EnderecoService;
//# sourceMappingURL=EnderecoService.js.map