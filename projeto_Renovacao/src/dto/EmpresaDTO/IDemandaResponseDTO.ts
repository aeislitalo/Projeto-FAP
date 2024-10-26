interface IDemandaResponseDTO {
    id: number; // Identificador único da demanda
    titulo: string; // Título da demanda
    descricao: string; // Descrição da demanda
    dataEnvio: Date; // Data de envio da demanda
    dataFinal: Date; // Data final da demanda
}
export default IDemandaResponseDTO;
