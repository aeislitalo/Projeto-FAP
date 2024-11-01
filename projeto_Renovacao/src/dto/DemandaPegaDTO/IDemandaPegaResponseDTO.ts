// Define uma interface para o Data Transfer Object (DTO) de resposta de uma demanda pega
interface IDemandaPegaResponseDTO {
    id: number; // Identificador único da demanda pega
    descricao: string; // Descrição da demanda pega
    status: string; // Status da demanda pega (por exemplo, 'Pega', 'Finalizada', etc.)
    data_ultima_atualizacao: string; // Data da última atualização da demanda pega (formato string)
    data_demanda_pega: string; // Data em que a demanda foi pega (formato string)
    data_entrega: string; // Data de entrega da demanda (formato string)
    prazo:string;
}

// Exporta a interface para que possa ser utilizada em outras partes do aplicativo
export default IDemandaPegaResponseDTO;
