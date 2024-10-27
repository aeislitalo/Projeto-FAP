import Demanda from "../database/models/Demanda";
import Empresa from "../database/models/Empresa";
import EmpresaInstituicaoResponsetDTO from "../dto/EmpresaDTO/EmpresaInstituicaoResponsetDTO";
import IDemandaResponseDTO from "../dto/EmpresaDTO/IDemandaResponseDTO";
import Instituicao from "../database/models/Instituicao";
import ICursoResponseDTO from "../dto/CursoDTO/ICursoResponseDTO";
import Curso from "../database/models/Curso";
class DTOHelper {
     // Método auxiliar para formatar os dados da empresa para retorno ao cliente
    static getEmpresasDto(empresa: Empresa): EmpresaInstituicaoResponsetDTO {
        // Cria e retorna um objeto que representa a resposta da empresa com os campos id, nome e email
        return {
            id: empresa.id,       // Acessa o ID da empresa fornecida como parâmetro
            nome: empresa.nome,   // Acessa o nome da empresa fornecida como parâmetro
            email: empresa.email   // Acessa o email da empresa fornecida como parâmetro
        }
    };
     // Método auxiliar para formatar os dados de instituicao para retorno ao cliente
     static getInstituicoesDto(instituicao: Instituicao): EmpresaInstituicaoResponsetDTO {
        // Cria e retorna um objeto que representa a resposta da empresa com os campos id, nome e email
        return {
            id: instituicao.id,       // Acessa o ID da empresa fornecida como parâmetro
            nome:instituicao.nome,   // Acessa o nome da empresa fornecida como parâmetro
            email: instituicao.email   // Acessa o email da empresa fornecida como parâmetro
        }
    };
    // Método auxiliar para formatar os dados da instituição para retorno ao cliente
    static getDemandaDTO(demanda: Demanda): IDemandaResponseDTO {
          // Cria e retorna um objeto que representa a resposta da demanda com os campos id, titulo, descricao, dataEnvio e dataFinal
          return {
            id: demanda.id,        // Acessa o ID da demanda fornecida como parâmetro
            titulo: demanda.titulo, // Acessa o título da demanda fornecida como parâmetro
            descricao: demanda.descricao, // Acessa a descrição da demanda fornecida como parâmetro
            dataEnvio: demanda.dataEnvio, // Acessa a data de envio da demanda fornecida como parâmetro
            dataFinal: demanda.dataFinal // Acessa a data final da demanda fornecida como parâmetro
        }
    };
    static getDemandaListaDTO(demandas: Demanda[]): IDemandaResponseDTO[] {
        // Cria e retorna um objeto que representa a resposta da demanda com os campos id, titulo, descricao, dataEnvio e dataFinal
        return demandas.map(demanda => ({
            id: demanda.id,        // Acessa o ID da demanda fornecida como parâmetro
            titulo: demanda.titulo, // Acessa o título da demanda fornecida como parâmetro
            descricao: demanda.descricao, // Acessa a descrição da demanda fornecida como parâmetro
            dataEnvio: demanda.dataEnvio, // Acessa a data de envio da demanda fornecida como parâmetro
            dataFinal: demanda.dataFinal // Acessa a data final da demanda fornecida como parâmetro
        }))
  };
    static getCursosListaDto(cursos: Curso[]): ICursoResponseDTO[] {
        return cursos.map(curso => ({
            id: curso.id, // Identificador único do curso
            nome: curso.nome // Nome do curso
        }));
    }
    static getCursosDto(curso: Curso): ICursoResponseDTO {
        return {
            id: curso.id, // Identificador único do curso
            nome: curso.nome // Nome do curso
        }
    }
    
}
export default DTOHelper;