"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DemandaPegaRequestDTO {
    descricao; // Atributo descricao como string
    status; // Atributo status como booleano
    dataDemandaPega; // Atributo dataDemandaPega como data
    dataUltimaAtualizacao; // Atributo dataUltimaAtualizacao como data
    demandaId; // Atributo demandaId como número, chave estrangeira
    professorId; // Atributo professorId como número, chave estrangeira
    dataPrazo;
    // Construtor da classe Demanda
    constructor(descricao, status, dataDemandaPega, dataUltimaAtualizacao, demandaId, professorId, dataPrazo) {
        this.descricao = descricao;
        this.status = status;
        this.dataDemandaPega = dataDemandaPega;
        this.dataUltimaAtualizacao = dataUltimaAtualizacao;
        this.dataPrazo = dataPrazo;
        this.demandaId = demandaId;
        this.professorId = professorId;
    }
    // Métodos get para acessar os atributos privados
    getDescricao() {
        return this.descricao;
    }
    getStatus() {
        return this.status;
    }
    getDataDemandaPega() {
        return this.dataDemandaPega;
    }
    getDataUltimaAtualizacao() {
        return this.dataUltimaAtualizacao;
    }
    getDemandaId() {
        return this.demandaId;
    }
    getProfessorId() {
        return this.professorId;
    }
    getDataPrazo() {
        return this.dataPrazo;
    }
}
exports.default = DemandaPegaRequestDTO;
//# sourceMappingURL=DemandaPegaRequestDTO.js.map