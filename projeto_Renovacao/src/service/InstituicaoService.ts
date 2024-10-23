import { ModelStatic } from "sequelize";
import Instituicao from "../database/models/Instituicao";
import resp from "../utils/resp";

class InstituicaoService{

    private modelInstituicao:ModelStatic<Instituicao> = Instituicao;



    // Método para obter todas as instituições
    async get() {
        let instituicoes = await this.modelInstituicao.findAll(); // Busca todas as instituicoes
        
        
        return resp(200,instituicoes); // Retorna uma resposta com o status 200 (OK)
    }

    async postCadastrarIntituicao(reqBody:any){
        
    }
}

export default InstituicaoService;