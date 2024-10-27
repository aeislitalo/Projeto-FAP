import IDemandaResponseDTO from "../EmpresaDTO/IDemandaResponseDTO";

// Define a interface IEmpresaInstituicaoResponseDTO
interface IEmpresaResponseDTO {
    id: number; // Identificador único da empresa ou Instituicao
    nome: string; // Nome da empresa ou Instituicao
    email: string; // E-mail da empresa  ou Instituicao
    
}
export default IEmpresaResponseDTO; // Exporta a interface
