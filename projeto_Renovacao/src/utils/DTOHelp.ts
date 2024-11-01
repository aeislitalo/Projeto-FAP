import Demanda from "../database/models/Demanda";
import Empresa from "../database/models/Empresa";
import EmpresaInstituicaoResponsetDTO from "../dto/EmpresaDTO/EmpresaInstituicaoResponsetDTO";
import IDemandaResponseDTO from "../dto/EmpresaDTO/IDemandaResponseDTO";
import Instituicao from "../database/models/Instituicao";
import ICursoResponseDTO from "../dto/CursoDTO/ICursoResponseDTO";
import Curso from "../database/models/Curso";
import { format, isValid } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Professor from "../database/models/Professor";
import IProfessorResponse from "../dto/ProfessorDTO/IProfessorResponse"
import DemandaPega from "../database/models/DemandaPega";
import IDemandaPegaResponseDTO from "../dto/DemandaPegaDTO/IDemandaPegaResponseDTO";
class DTOHelper {
    // Método auxiliar para formatar os dados da empresa para retorno ao cliente
    static getEmpresasDto(empresa: Empresa): EmpresaInstituicaoResponsetDTO {
        // Cria e retorna um objeto que representa a resposta da empresa com os campos id, nome e email
        return {
            id: empresa.id,       // Acessa o ID da empresa fornecida como parâmetro
            nome: empresa.nome,   // Acessa o nome da empresa fornecida como parâmetro
            email: empresa.email  // Acessa o email da empresa fornecida como parâmetro

        }
    };
    // Método auxiliar para formatar os dados de instituicao para retorno ao cliente
    static getInstituicoesDto(instituicao: Instituicao): EmpresaInstituicaoResponsetDTO {
        // Cria e retorna um objeto que representa a resposta da empresa com os campos id, nome e email
        return {
            id: instituicao.id,       // Acessa o ID da empresa fornecida como parâmetro
            nome: instituicao.nome,   // Acessa o nome da empresa fornecida como parâmetro
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
            dataEnvio: this.formatarDatasDemandasComHora(demanda.dataEnvio), // Acessa a data de envio da demanda fornecida como parâmetro
            dataLimiteParaFicarDisponivel: this.formatarDatasDemandasComHora(demanda.dataLimiteParaFicarDisponivel), // Acessa a data final da demanda fornecida como parâmetro
            prazo:demanda.prazo
        }
    }
    ;
    static getDemandaListaDTO(demandas: Demanda[]): IDemandaResponseDTO[] {
        // Cria e retorna um objeto que representa a resposta da demanda com os campos id, titulo, descricao, dataEnvio e dataFinal
        return demandas.map(demanda => ({
            id: demanda.id,        // Acessa o ID da demanda fornecida como parâmetro
            titulo: demanda.titulo, // Acessa o título da demanda fornecida como parâmetro
            descricao: demanda.descricao, // Acessa a descrição da demanda fornecida como parâmetro
            dataEnvio: this.formatarDatasDemandasComHora(demanda.dataEnvio), // Acessa a data de envio da demanda fornecida como parâmetro
            dataLimiteParaFicarDisponivel: this.formatarDatasDemandasComHora(demanda.dataLimiteParaFicarDisponivel), // Acessa a data final da demanda fornecida como parâmetro
            prazo:demanda.prazo
        }))
    };
    static getCursosListaDTO(cursos: Curso[]): ICursoResponseDTO[] {
        return cursos.map(curso => ({
            id: curso.id, // Identificador único do curso
            nome: curso.nome // Nome do curso
        }));
    }
    static getCursosDTO(curso: Curso): ICursoResponseDTO {
        return {
            id: curso.id, // Identificador único do curso
            nome: curso.nome // Nome do curso
        }
    }
    static getProfessorListaDTO(professores: Professor[]): IProfessorResponse[] {
        return professores.map(professor => ({
            id: professor.idProfessor,
            nome: professor.nome,
            email: professor.email
        }))
    }
    static getProfessorDTO(professor: Professor): IProfessorResponse {
        return  {
            id: professor.idProfessor,
            nome: professor.nome,
            email: professor.email
        }
    }

    static getDemandaPegasDTO(demandasPegas: DemandaPega): IDemandaPegaResponseDTO {
        return {
            id: demandasPegas.id,
            status: demandasPegas.status,
            descricao: demandasPegas.descricao,
            data_ultima_atualizacao: this.formatarDatasDemandasComHora(demandasPegas.dataUltimaAtualizacao),
            data_demanda_pega: this.formatarDatasDemandasComHora(demandasPegas.dataDemandaPega),
            data_entrega: this.formatarDatasDemandas(demandasPegas.dataDemandaPega)
        }
    }

    static getDemandaPegasListaDTO(demandasPegas: DemandaPega[]): IDemandaPegaResponseDTO[] {
        return demandasPegas.map(demandaPega => (  {
            id: demandaPega.id,
            status: demandaPega.status,
            descricao: demandaPega.descricao,
            data_ultima_atualizacao: this.formatarDatasDemandasComHora(demandaPega.dataUltimaAtualizacao),
            data_demanda_pega: this.formatarDatasDemandasComHora(demandaPega.dataDemandaPega),
            data_entrega: this.formatarDatasDemandas(demandaPega.dataDemandaPega)
        }))
    }
    private static formatarDatasDemandas(data: Date): string {
        let dataConvertida = new Date(data);
        // Verifica se a data é válida antes de tentar formatá-la
        if (isValid(dataConvertida)) {
            return format(dataConvertida, 'dd/MM/yyyy', { locale: ptBR });
        }
        return "Data inválida"; // Retorna um valor padrão caso a data seja inválida
    }

    private static formatarDatasDemandasComHora(data: Date): string {
        let dataConvertida = new Date(data);
        // Verifica se a data é válida antes de tentar formatá-la
        if (isValid(dataConvertida)) {
            return format(dataConvertida, 'dd/MM/yyyy HH:mm:ss', { locale: ptBR });
        }
        return "Data inválida"; // Retorna um valor padrão caso a data seja inválida
    }



}
export default DTOHelper;