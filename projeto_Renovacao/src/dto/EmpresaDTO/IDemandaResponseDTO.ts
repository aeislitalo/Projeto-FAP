interface IDemandaResponseDTO {
    id: number; // Identificador único da demanda
    titulo: string; // Título da demanda
    descricao: string; // Descrição da demanda
    dataEnvio: string; // Data de envio da demanda
    dataLimiteParaFicarDisponivel: string; // Data final da demanda
    prazo:string;

}
export default IDemandaResponseDTO;
