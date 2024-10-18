"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Empresa_1 = __importDefault(require("../database/models/Empresa")); // Importa o modelo Empresa
const resp_1 = __importDefault(require("../utils/resp")); // Importa uma função utilitária de resposta
const Demanda_1 = __importDefault(require("../database/models/Demanda")); // Importa o modelo Demanda
class EmpresaService {
    // Define modelos estáticos para as classes Empresa e Demanda
    model = Empresa_1.default;
    modelDemanda = Demanda_1.default;
    // Método para criar uma nova empresa
    async post(empresaDados) {
        this.tratarEmail(empresaDados.email.trim());
        this.tratarSenha(empresaDados.senha.trim());
        let empresa = await this.model.create(Empresa_1.default.preencherDados(empresaDados)); // Cria a empresa no banco de dados
        return (0, resp_1.default)(201, empresa); // Retorna uma resposta com o status 201 (Criado)
    }
    //Método para realizar o login
    async postLoginEmpresa(email, senha) {
        this.tratarEmail(email);
        this.tratarSenha(senha);
        let empresaEncontrada = await Empresa_1.default.FazerLogin(this.model, email, senha);
        return (0, resp_1.default)(200, empresaEncontrada);
    }
    // Método para obter todas as empresas
    async get() {
        let empresas = await this.model.findAll(); // Busca todas as empresas
        return (0, resp_1.default)(200, empresas); // Retorna uma resposta com o status 200 (OK)
    }
    // Método para atualizar os dados de uma empresa
    async put(idEmpresa, empresaDados) {
        this.tratarEmail(empresaDados.email.trim());
        this.tratarSenha(empresaDados.senha.trim());
        let empresaDB = await this.acharEmpresaPorId(idEmpresa); // Busca a empresa pelo ID
        await empresaDB.update(Empresa_1.default.preencherDados(empresaDados)); // Atualiza os dados da empresa
        return (0, resp_1.default)(200, empresaDB); // Retorna a empresa atualizada
    }
    // Método para mudar a senha de uma empresa
    async patch(idEmpresa, empresaNovaSenha) {
        this.tratarSenha(empresaNovaSenha.senha.trim());
        let empresaDB = await this.acharEmpresaPorId(idEmpresa); // Busca a empresa pelo ID
        await empresaDB.update({
            senha: empresaNovaSenha.nova_senha // Atualiza a senha da empresa
        });
        return (0, resp_1.default)(200, empresaDB); // Retorna a empresa com a senha atualizada
    }
    // Método para deletar uma empresa
    async deletar(idEmpresa) {
        let empresaDeletada = await this.acharEmpresaPorId(idEmpresa); // Busca a empresa pelo ID
        await empresaDeletada.destroy(); // Deleta a empresa
        return (0, resp_1.default)(200, { message: 'Empresa deletada com sucesso' }); // Retorna sucesso
    }
    //////////////////////////////////////////////// METODOS PARA DEMANDA //////////////////////////////////////////////////////////////////////////
    // Método para cadastrar uma nova demanda
    async postCadastrarDemanda(id, demanda) {
        let dataFinal = Demanda_1.default.formatarData(demanda.data_final); // Formata a data final
        let demandaCriacao = await this.modelDemanda.create(Demanda_1.default.preencherDemanda(dataFinal, id, demanda)); // Cria a nova demanda
        return (0, resp_1.default)(201, demandaCriacao); // Retorna a demanda criada
    }
    // Método para mostrar as demandas de uma empresa
    async getMostrarDemandasEmpresas(idEmpresa) {
        // Chama o método estático 'visualizarMeusProjetos' da classe Demanda,
        // que recebe o ID da empresa e busca suas demandas relacionadas.
        let empresa = await Demanda_1.default.visualizarMeusProjetos(idEmpresa);
        return (0, resp_1.default)(200, empresa); // Retorna a empresa com suas demandas
    }
    // Método para mostrar todas as demandas
    async getMostrarDemandas() {
        let empresas = await this.modelDemanda.findAll(); // Busca todas as demandas
        return (0, resp_1.default)(200, empresas); // Retorna as demandas
    }
    // Método para atualizar uma demanda
    async putAtualizarDemanda(idDemanda, demandaDados) {
        let demandaDB = await this.acharDemandaPorId(idDemanda); // Busca a demanda pelo ID
        let dataFinal = Demanda_1.default.formatarData(demandaDados.data_final); // Formata a data final
        await demandaDB.update(Demanda_1.default.preencherDemanda(dataFinal, demandaDB.empresaId, demandaDados)); // Atualiza a demanda
        return (0, resp_1.default)(200, demandaDB); // Retorna a demanda atualizada
    }
    // Método para mudar a data de uma demanda
    async patchMudarData(idDemanda, novaData) {
        let demandaDB = await this.acharDemandaPorId(idDemanda); // Busca a demanda pelo ID
        let dataFinalFormatada = Demanda_1.default.formatarData(novaData.data_final); // Formata a nova data
        await demandaDB.update({
            dataFinal: dataFinalFormatada // Atualiza a data final da demanda
        });
        return (0, resp_1.default)(200, demandaDB); // Retorna a demanda atualizada
    }
    // Método para deletar uma demanda
    async deletarDemandaServico(idDemanda) {
        let empresaDeletada = await this.acharDemandaPorId(idDemanda); // Busca a demanda pelo ID
        await empresaDeletada.destroy(); // Deleta a demanda
        return (0, resp_1.default)(200, { message: 'Demanda deletada com sucesso' }); // Retorna sucesso
    }
    // Métodos auxiliares para encontrar Empresa e Demanda
    async acharEmpresaPorId(idEmpresa) {
        let empresa = await this.model.findByPk(idEmpresa);
        if (!empresa)
            throw new Error('Empresa não encontrada');
        return empresa;
    }
    async acharDemandaPorId(idDemanda) {
        let demanda = await this.modelDemanda.findByPk(idDemanda);
        if (!demanda)
            throw new Error('Demanda não encontrada');
        return demanda;
    }
    //Métodos auxiliares para tratar email e senha
    tratarEmail(email) {
        // Expressão regular para validar o formato de um email
        let emailExpressaoRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailExpressaoRegular.test(email)) {
            throw new Error('Email inválido');
        }
    }
    tratarSenha(senha) {
        // Verifica se a senha contém pelo menos uma letra e um número
        const expressaoRegularSenha = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]*$/;
        // Se a senha não for válida, lança uma exceção
        if (!senha || !expressaoRegularSenha.test(senha)) {
            throw new Error('A senha deve conter pelo menos uma letra e um número.');
        }
    }
}
// Exporta a classe EmpresaService
exports.default = EmpresaService;
