"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Define a classe CursoRequestDTO
class CursoRequestDTO {
    // Propriedades privadas da classe
    nome; // Nome do curso
    instituicaoId; // ID da instituição associada ao curso
    // Construtor da classe, que inicializa as propriedades
    constructor(nome, instituicao) {
        this.nome = nome; // Atribui o nome do curso
        this.instituicaoId = instituicao; // Atribui o ID da instituição
    }
    // Método público para obter o nome do curso
    getNome() {
        return this.nome; // Retorna o nome do curso
    }
    // Método público para obter o ID da instituição
    getInstituicaoId() {
        return this.instituicaoId; // Retorna o ID da instituição
    }
}
// Exporta a classe CursoRequestDTO para uso em outros módulos
exports.default = CursoRequestDTO;
//# sourceMappingURL=CursoRequestDTO.js.map