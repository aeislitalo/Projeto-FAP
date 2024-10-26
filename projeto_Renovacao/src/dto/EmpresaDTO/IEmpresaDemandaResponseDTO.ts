import IDemandaResponseDTO from "./IDemandaResponseDTO"; // Importa a interface IDemandaResponseDTO

// Define a interface IEmpresaDemandaDTO
interface IEmpresaDemandaDTO {
    id: number; // Identificador único da empresa ou instituição
    nome: string; // Nome da empresa ou instituição
    email: string; // E-mail da empresa ou instituição
    demandas: IDemandaResponseDTO[]; // Lista de demandas associadas à empresa, usando a interface IDemandaResponseDTO
}

export default IEmpresaDemandaDTO; // Exporta a interface IEmpresaDemandaDTO
