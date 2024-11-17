"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
const locale_1 = require("date-fns/locale");
class DTOHelper {
    // Método auxiliar para formatar os dados da empresa para retorno ao cliente
    static getEmpresasDto(empresa) {
        // Cria e retorna um objeto que representa a resposta da empresa com os campos id, nome e email
        return {
            id: empresa.id, // Acessa o ID da empresa fornecida como parâmetro
            nome: empresa.nome, // Acessa o nome da empresa fornecida como parâmetro
            email: empresa.email, // Acessa o email da empresa fornecida como parâmetro
            cidade: empresa.cidade,
            bairro: empresa.bairro,
            estado: empresa.estado,
            pais: empresa.pais,
            contato: empresa.contato
        };
    }
    ;
    // Método auxiliar para formatar os dados de instituicao para retorno ao cliente
    static getInstituicoesDto(instituicao) {
        // Cria e retorna um objeto que representa a resposta da empresa com os campos id, nome e email
        return {
            id: instituicao.id, // Acessa o ID da empresa fornecida como parâmetro
            nome: instituicao.nome, // Acessa o nome da empresa fornecida como parâmetro
            email: instituicao.email, // Acessa o email da empresa fornecida como parâmetro
            cidade: instituicao.cidade,
            bairro: instituicao.bairro,
            estado: instituicao.estado,
            pais: instituicao.pais,
            contato: instituicao.contato
        };
    }
    ;
    // Método auxiliar para formatar os dados da instituição para retorno ao cliente
    static getDemandaDTO(demanda) {
        // Cria e retorna um objeto que representa a resposta da demanda com os campos id, titulo, descricao, dataEnvio e dataFinal
        return {
            id: demanda.id, // Acessa o ID da demanda fornecida como parâmetro
            titulo: demanda.titulo, // Acessa o título da demanda fornecida como parâmetro
            descricao: demanda.descricao, // Acessa a descrição da demanda fornecida como parâmetro
            dataEnvio: this.formatarDatasDemandas(demanda.dataEnvio), // Acessa a data de envio da demanda fornecida como parâmetro
            dataLimiteParaFicarDisponivel: this.formatarDatasDemandas(demanda.dataLimiteParaFicarDisponivel), // Acessa a data final da demanda fornecida como parâmetro
            prazo: String(demanda.prazo) + " Dias"
        };
    }
    ;
    static getDemandaListaDTO(demandas) {
        // Cria e retorna um objeto que representa a resposta da demanda com os campos id, titulo, descricao, dataEnvio e dataFinal
        return demandas.map(demanda => ({
            id: demanda.id, // Acessa o ID da demanda fornecida como parâmetro
            titulo: demanda.titulo, // Acessa o título da demanda fornecida como parâmetro
            descricao: demanda.descricao, // Acessa a descrição da demanda fornecida como parâmetro
            dataEnvio: this.formatarDatasDemandas(demanda.dataEnvio), // Acessa a data de envio da demanda fornecida como parâmetro
            dataLimiteParaFicarDisponivel: this.formatarDatasDemandas(demanda.dataLimiteParaFicarDisponivel), // Acessa a data final da demanda fornecida como parâmetro
            prazo: String(demanda.prazo) + " Dias"
        }));
    }
    ;
    static getCursosListaDTO(cursos) {
        return cursos.map(curso => ({
            id: curso.id, // Identificador único do curso
            nome: curso.nome // Nome do curso
        }));
    }
    static getCursosDTO(curso) {
        return {
            id: curso.id, // Identificador único do curso
            nome: curso.nome // Nome do curso
        };
    }
    static getProfessorListaDTO(professores) {
        return professores.map(professor => ({
            id: professor.idProfessor,
            nome: professor.nome,
            email: professor.email
        }));
    }
    static getProfessorDTO(professor) {
        return {
            id: professor.idProfessor,
            nome: professor.nome,
            email: professor.email
        };
    }
    static getDemandaPegasDTO(demandasPegas) {
        if (this.formatarDatasDemandas(demandasPegas.dataEntrega) == "31/12/1969") {
            return {
                id: demandasPegas.id,
                status: demandasPegas.status,
                descricao: demandasPegas.descricao,
                data_ultima_atualizacao: this.formatarDatasDemandas(demandasPegas.dataUltimaAtualizacao),
                data_demanda_pega: this.formatarDatasDemandas(demandasPegas.dataDemandaPega),
                data_entrega: " ",
                prazo: this.formatarDatasDemandas(demandasPegas.dataPrazo)
            };
        }
        else {
            return {
                id: demandasPegas.id,
                status: demandasPegas.status,
                descricao: demandasPegas.descricao,
                data_ultima_atualizacao: this.formatarDatasDemandas(demandasPegas.dataUltimaAtualizacao),
                data_demanda_pega: this.formatarDatasDemandas(demandasPegas.dataDemandaPega),
                data_entrega: this.formatarDatasDemandas(demandasPegas.dataEntrega),
                prazo: this.formatarDatasDemandas(demandasPegas.dataPrazo)
            };
        }
    }
    static formatarDatasDemandas(data) {
        let dataConvertida = new Date(data);
        // Verifica se a data é válida antes de tentar formatá-la
        if ((0, date_fns_1.isValid)(dataConvertida)) {
            return (0, date_fns_1.format)(dataConvertida, 'dd/MM/yyyy', { locale: locale_1.ptBR });
        }
        return "Data inválida"; // Retorna um valor padrão caso a data seja inválida
    }
}
exports.default = DTOHelper;
//# sourceMappingURL=DTOHelp.js.map