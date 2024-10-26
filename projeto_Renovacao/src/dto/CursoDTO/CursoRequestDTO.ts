// Define a classe CursoRequestDTO
class CursoRequestDTO {
    // Propriedades privadas da classe
    private nome: string; // Nome do curso
    private instituicaoId: number; // ID da instituição associada ao curso

    // Construtor da classe, que inicializa as propriedades
    constructor(nome: string, instituicao: number) {
        this.nome = nome; // Atribui o nome do curso
        this.instituicaoId = instituicao; // Atribui o ID da instituição
    }

    // Método público para obter o nome do curso
    public getNome(): string {
        return this.nome; // Retorna o nome do curso
    }

    // Método público para obter o ID da instituição
    public getInstituicaoId(): number {
        return this.instituicaoId; // Retorna o ID da instituição
    }
}

// Exporta a classe CursoRequestDTO para uso em outros módulos
export default CursoRequestDTO;
