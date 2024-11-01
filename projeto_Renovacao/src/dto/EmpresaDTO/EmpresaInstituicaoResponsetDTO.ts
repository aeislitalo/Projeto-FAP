import IDemandaResponseDTO from "../EmpresaDTO/IDemandaResponseDTO";

// Define a interface IEmpresaInstituicaoResponseDTO
interface IEmpresaResponseDTO {
    id: number; // Identificador único da empresa ou Instituicao
    nome: string; // Nome da empresa ou Instituicao
    email: string; // E-mail da empresa  ou Instituicao
    cidade:string;
    bairro:string;
    estado:string;
    pais:string;
    contato:string
}
export default IEmpresaResponseDTO; // Exporta a interface
