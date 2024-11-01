// Importa a biblioteca de validação
import Validacao from "validator";
// Importa os modelos da base de dados
import Empresa from "../database/models/Empresa";
import Demanda from "../database/models/Demanda";
import Instituicao from "../database/models/Instituicao";
import Curso from "../database/models/Curso";
import Professor from "../database/models/Professor";
import DemandaPega from "../database/models/DemandaPega";
// Importa DTOs
import EmpresaInstituicaoRequestDTO from "../dto/EmpresaDTO/EmpresaInstituicaoRequestDTO";
import CursoResponseDTO from "../dto/CursoDTO/ICursoResponseDTO";
import CursoRequestDTO from "../dto/CursoDTO/CursoRequestDTO";
import ProfessorRequestDTO from "../dto/ProfessorDTO/ProfessorRequestDTO";
import DemandaPegaRequestDTO from "../dto/DemandaPegaDTO/DemandaPegaRequestDTO";
// Importa ModelStatic do Sequelize
import { ModelStatic } from "sequelize";
// Importa o serviço de Endereço
import EnderecoService from "./EnderecoService";

// Classe abstrata que contém métodos auxiliares para o tratamento de dados relacionados a empresas e instituições
abstract class MetodosTratamentoAuxiliares {
    // Declaração de modelos estáticos para interagir com as entidades do banco de dados
    protected model: ModelStatic<Empresa> = Empresa; // Modelo para Empresas
    protected modelDemanda: ModelStatic<Demanda> = Demanda; // Modelo para Demandas
    protected modelInstituicao: ModelStatic<Instituicao> = Instituicao; // Modelo para Instituições
    protected enderecoService = new EnderecoService(); // Serviço de Endereço
    protected modelCurso: ModelStatic<Curso> = Curso; // Modelo para Cursos
    protected modelProfessor: ModelStatic<Professor> = Professor; // Modelo para Professores
    protected modelDemandaPega: ModelStatic<DemandaPega> = DemandaPega; // Modelo para Demandas Pegas
    
    // Método para encontrar uma Empresa pelo ID
    protected async acharEmpresaPorId(idEmpresa: number): Promise<Empresa> {
        const empresa = await this.model.findByPk(idEmpresa); // Busca a empresa pelo ID
        if (!empresa) throw new Error('Empresa não encontrada'); // Lança erro se não encontrar
        return empresa; // Retorna a empresa encontrada
    }

    // Método para encontrar uma Instituição pelo ID
    protected async acharInstituicaoPorId(idInstituicao: number): Promise<Instituicao> {
        const instituicao = await this.modelInstituicao.findByPk(idInstituicao); // Busca a instituição pelo ID
        if (!instituicao) throw new Error('Instituição não encontrada'); // Lança erro se não encontrar
        return instituicao; // Retorna a instituição encontrada
    }

    // Método para encontrar uma Demanda pelo ID
    protected async acharDemandaPorId(idDemanda: number): Promise<Demanda> {
        const demanda = await this.modelDemanda.findByPk(idDemanda); // Busca a demanda pelo ID
        if (!demanda) throw new Error('Demanda não encontrada'); // Lança erro se não encontrar
        return demanda; // Retorna a demanda encontrada
    }

    // Método assíncrono para encontrar um curso pelo ID da instituição
    protected async acharCursoPorId(idCurso: number): Promise<Curso> {
        const curso = await this.modelCurso.findByPk(idCurso); // Busca o curso no banco de dados pelo ID
        if (!curso) throw new Error('Curso não encontrado'); // Lança um erro se o curso não for encontrado
        return curso; // Retorna o curso encontrado
    }

    // Método para encontrar um Professor pelo ID
    protected async acharProfessorPorId(idProfessor: number): Promise<Professor> {
        const professor = await this.modelProfessor.findByPk(idProfessor); // Busca o professor pelo ID
        if (!professor) throw new Error('Professor(a) não encontrado'); // Lança erro se não encontrar
        return professor; // Retorna o professor encontrado
    }

    // Método para encontrar uma Demanda Pega pelo ID
    protected async acharDemandaPegaPorId(idDemandaPega:number):Promise<DemandaPega> {
        let demandaPega = await this.modelDemandaPega.findByPk(idDemandaPega); // Busca a demanda pega pelo ID
        if(!demandaPega) throw new Error("Demanda não encontrada!!!"); // Lança erro se não encontrar
        return demandaPega; // Retorna a demanda pega encontrada
    }   

    // Método para tratar o email, validando seu formato
    protected tratarEmail(email: string): void {
        if (!Validacao.isEmail(email)) {
            throw new Error('Email Inválido!!!'); // Lança erro se o email for inválido
        }
    }

    // Método para tratar a senha, verificando suas condições
    protected tratarSenha(senha: string): void {
        const expressaoRegularSenha = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]*$/; // Expressão regular para validação da senha

        if (!senha || !expressaoRegularSenha.test(senha)) {
            throw new Error('A senha deve conter pelo menos uma letra e um número.'); // Lança erro se a senha não for válida
        }
    }

    // Método assíncrono para tratar o endereço baseado no CEP
    protected async tratarEndereco(reqBody: any, cep: string): Promise<EmpresaInstituicaoRequestDTO> {
        if (cep?.trim()) {
            const endereco = await this.enderecoService.buscarEnderecoPeloCep(cep); // Busca o endereço pelo CEP
            if (endereco) {
                return this.criarObjetoEmpresaInstituicaoDTO(reqBody, endereco); // Cria e retorna o objeto DTO
            }
        }
        throw new Error("Endereço não encontrado"); // Lança erro se o endereço não for encontrado
    }

    // Método para criar um objeto DTO a partir dos dados recebidos
    protected criarObjetoEmpresaInstituicaoDTO(reqBody: any, endereco: any): EmpresaInstituicaoRequestDTO {
        return new EmpresaInstituicaoRequestDTO(
            reqBody.nome,
            reqBody.cnpj,
            reqBody.pais,
            endereco.state,
            endereco.city,
            endereco.district,
            endereco.address,
            reqBody.numero,
            endereco.cep,
            reqBody.email,
            reqBody.senha,
            reqBody.contato
        );
    }

    // Método para criar um objeto ProfessorRequestDTO a partir dos dados recebidos
    protected criarObjetoProfessorDTO(reqBody: any, idCurso: number, idInstituicao: number): ProfessorRequestDTO {
        return new ProfessorRequestDTO(
            reqBody.nome,
            reqBody.cpf,
            reqBody.email,
            reqBody.senha,
            reqBody.contato,
            idCurso,
            idInstituicao
        );
    }

    // Método para criar um objeto DemandaPegaRequestDTO a partir dos dados recebidos
    protected async criarObjetoDemandaPegaDTO(idDemanda: number, idProfessor: number, reqBody: any): Promise<DemandaPegaRequestDTO> {
        // Certifique-se de que está retornando as datas corretamente
        let demandaDb = await this.acharDemandaPorId(idDemanda);

        if(demandaDb.dataLimiteParaFicarDisponivel <= new Date()){
            throw new Error("Demanda Expirada!!!");
        }else{
           
            return new DemandaPegaRequestDTO(
                reqBody.descricao,
                "Pega", // Status fixo para a demanda
                new Date(),  // dataDemandaPega
                new Date(),  // dataUltimaAtualizacao
                idDemanda,
                idProfessor,
               await this.CalcularDataPrazo(demandaDb.prazo) // Obtém a data do prazo da demanda correspondente
     
            );
        }
       
    }
    protected async CalcularDataPrazo(prazo:number):Promise<Date>{
        return new Date(new Date().getTime() + prazo * 86400000);
    }

    // Método para preencher os dados do Professor antes de salvar no banco de dados
    protected preencherDadosProfessor(dadosProfessor: ProfessorRequestDTO) {
        return {
            nome: dadosProfessor.getNome(),
            cpf: dadosProfessor.getCpf(),
            cursoId: dadosProfessor.getCursoId(),
            instituicaoId: dadosProfessor.getInstituicaoId(),
            email: dadosProfessor.getEmail(),
            senha: dadosProfessor.getSenha(),
            contato: dadosProfessor.getContato()
        };
    }

    // Método para preencher os dados antes de salvar no banco de dados
    protected preencherDados(dados: EmpresaInstituicaoRequestDTO) {
        return {
            nome: dados.getNome(),
            cnpj: dados.getCnpj(),
            pais: dados.getPais(),
            estado: dados.getEstado(),
            cidade: dados.getCidade(),
            bairro: dados.getBairro(),
            rua: dados.getRua(),
            numero: dados.getNumero(),
            cep: dados.getCep(),
            email: dados.getEmail(),
            senha: dados.getSenha(),
            contato: dados.getContato()
        };
    }

    // Método para preencher os dados da Demanda Pega antes de salvar no banco de dados
    protected preencherDemandaPega(demandaPegaDTO:DemandaPegaRequestDTO):any {
        
        return {
            descricao:demandaPegaDTO.getDescricao(),
            status:demandaPegaDTO.getStatus(),
            dataDemandaPega:demandaPegaDTO.getDataDemandaPega(),
            dataUltimaAtualizacao:demandaPegaDTO.getDataUltimaAtualizacao(),
            dataPrazo:demandaPegaDTO.getDataPrazo(),
            demandaId:demandaPegaDTO.getDemandaId(),
            professorId:demandaPegaDTO.getProfessorId()
        }
    }

    // Método para realizar login da empresa
    protected async fazerLoginEmpresa(email: string, senha: string): Promise<Empresa> {
        const empresa = await this.model.findOne({ where: { email } }); // Busca a empresa pelo email

        if (!empresa) {
            throw new Error("Email não existe"); // Lança um erro se o email não for encontrado
        }

        if (empresa.senha !== senha) {
            throw new Error("Senha incorreta"); // Lança um erro se a senha estiver incorreta
        }

        return empresa; // Retorna a empresa se o login for bem-sucedido
    }

    // Método para realizar login da instituição
    protected async fazerLoginInstituicao(email: string, senha: string): Promise<Instituicao> {
        const instituicao = await this.modelInstituicao.findOne({ where: { email } }); // Busca a instituição pelo email

        if (!instituicao) {
            throw new Error("Email não existe"); // Lança um erro se o email não for encontrado
        }

        if (instituicao.senha !== senha) {
            throw new Error("Senha incorreta"); // Lança um erro se a senha estiver incorreta
        }

        return instituicao; // Retorna a instituição se o login for bem-sucedido
    }

    // Método para criar um objeto CursoRequestDTO a partir do ID da instituição e do nome do curso
    protected criarObjetoCurso(idInstituicao: number, nomeCurso: string): CursoRequestDTO {
        return new CursoRequestDTO(nomeCurso, idInstituicao);
    }

    // Método para converter um objeto Curso em um objeto CursoResponseDTO
    protected cursoDTO(curso: Curso): CursoResponseDTO {
        return {
            id: curso.id, // Acessa o ID do curso
            nome: curso.nome // Acessa o nome do curso
        };
    }

    // Método para preencher um objeto com os dados do CursoRequestDTO
    protected preencherCurso(curso: CursoRequestDTO) {
        return {
            nome: curso.getNome(), // Obtém o nome do curso
            instituicaoId: curso.getInstituicaoId() // Obtém o ID da instituição associada
        };
    }
}

// Exporta a classe para uso em outras partes da aplicação
export default MetodosTratamentoAuxiliares; 
