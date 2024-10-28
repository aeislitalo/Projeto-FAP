class DemandaPegaRequestDTO{
    private descricao: string; // Atributo descricao como string
    private status: string; // Atributo status como booleano
    private dataDemandaPega: Date; // Atributo dataDemandaPega como data
    private dataUltimaAtualizacao: Date; // Atributo dataUltimaAtualizacao como data
     
    private demandaId: number; // Atributo demandaId como número, chave estrangeira
    private professorId: number; // Atributo professorId como número, chave estrangeira
    private dataEntrega: Date; // Atributo dataEntrega como data
    // Construtor da classe Demanda
    constructor(
        descricao: string,
        status: string,
        dataDemandaPega: Date,
        dataUltimaAtualizacao: Date,
        demandaId: number,
        professorId: number,
        dataEntrega:Date,
    ) {
        this.descricao = descricao;
        this.status = status;
        this.dataDemandaPega = dataDemandaPega;
        this.dataUltimaAtualizacao = dataUltimaAtualizacao;
        this.dataEntrega = dataEntrega;
        this.demandaId = demandaId;
        this.professorId = professorId;
    }

    // Métodos get para acessar os atributos privados
    public getDescricao(): string {
        return this.descricao;
    }

    public getStatus(): string {
        return this.status;
    }

    public getDataDemandaPega(): Date {
        return this.dataDemandaPega;
    }

    public getDataUltimaAtualizacao(): Date {
        return this.dataUltimaAtualizacao;
    }

    public getDataEntrega(): Date { // Retorna undefined se não estiver definido
        return this.dataEntrega;
    }
    public setDataEntrega(dataEntrega: Date):void{
        this.dataEntrega = dataEntrega;
    }
    public getDemandaId(): number {
        return this.demandaId;
    }

    public getProfessorId(): number {
        return this.professorId;
    }
}
export default DemandaPegaRequestDTO;