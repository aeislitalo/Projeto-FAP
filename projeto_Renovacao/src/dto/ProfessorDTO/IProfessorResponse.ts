// Interface IProfessorResponse representa a estrutura de dados para a resposta de um professor
interface IProfessorResponse {
    id: number, // Identificador único do professor
    nome: string, // Nome do professor
    email: string // Email do professor
}

// Exporta a interface IProfessorResponse para ser utilizada em outras partes do aplicativo
export default IProfessorResponse;
